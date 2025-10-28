#!/bin/bash

# This script builds a Node Single Executable Application (SEA) for Windows OS
# https://nodejs.org/api/single-executable-applications.
# NOTE: Requires running `npm run transpile` first

# Exit on error
set -e

export IS_BUILD_SEA=true

# Constants
BUILD_DIR="build"
SEA_CONFIG="sea-config.json"
APP_NAME="sendemail"
ENTRY_FILE="./src/scripts/cli/send.ts"
BUNDLE_FILE="$BUILD_DIR/${APP_NAME}.cjs"
SEA_BLOB="$BUILD_DIR/sea-prep.blob"
SENTINEL="NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2"

# Node download URLs
NODE_VERSION="v22.9.0"
NODE_WIN_URL="https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-win-x64.zip"

# Change to app directory to ensure relative paths work correctly
cd "$(dirname "$0")/.."

# Create build directory if it doesn't exist
mkdir -p build

echo "Building Single Executable Application in $(pwd)..."

# Step 1: Bundle with esbuild
echo "Step 1: Bundling with esbuild..."
npx esbuild "$ENTRY_FILE" \
  --bundle \
  --platform=node \
  --format=cjs \
  --target=node22 \
  --loader:.ejs=text \
  --define:process.env.IS_BUILD_SEA='"true"' \
  --metafile="build/sendfile.meta.json" \
  --outfile="$BUNDLE_FILE"

# Step 2: Clean the bundle file - remove NODE_SEA_FUSE bundled by esbuild
echo "Step 2: Cleaning bundle file..."
sed -i.bak "/$SENTINEL/d" "$BUNDLE_FILE" && rm -f "${BUNDLE_FILE}.bak"

# Step 3: Generate SEA blob
echo "Step 3: Generating SEA blob..."
node --experimental-sea-config "$SEA_CONFIG"

# Step 4: Prepare the Windows Node binary
echo "Step 4: Preparing Windows binary..."
# Copies the installed Node binary into build/sendemail.exe
# node -e "require('fs').copyFileSync(process.execPath, 'build/sendemail.exe')"

WIN_NODE_DIR="$BUILD_DIR/node-win-x64"
WIN_NODE_EXE="$WIN_NODE_DIR/node.exe"

if [ ! -f "$WIN_NODE_EXE" ]; then
  echo "⬇️ Downloading Windows Node binary..."
  curl -sSL "$NODE_WIN_URL" -o "$BUILD_DIR/node-win-x64.zip"
  unzip -q "$BUILD_DIR/node-win-x64.zip" -d "$BUILD_DIR"
  # move into known path
  mv "$BUILD_DIR/node-${NODE_VERSION}-win-x64" "$WIN_NODE_DIR"
fi

# Step 5: Inject SEA blob into executable
echo "Step 5: Injecting SEA blob..."

if [ -f "$WIN_NODE_EXE" ]; then
  echo "Injecting SEA blob into Windows node.exe..."
  cp "$WIN_NODE_EXE" "$BUILD_DIR/${APP_NAME}.exe"
  npx postject "$BUILD_DIR/${APP_NAME}.exe" NODE_SEA_BLOB "$SEA_BLOB" --sentinel-fuse "$SENTINEL"
  echo "✅ Windows executable ready at: $BUILD_DIR/${APP_NAME}.exe"
else
  echo "⚠️ Skipping Windows build — node.exe not found!"
  exit 1
fi

echo "Build complete! Executable: $BUILD_DIR/$APP_NAME.exe"
