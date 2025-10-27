#!/bin/bash

# This script builds a Node Single Executable Application (SEA) for Windows OS
# https://nodejs.org/api/single-executable-applications.html

# Exit on error
set -e

export IS_BUILD_SEA=true

# Change to app directory to ensure relative paths work correctly
cd "$(dirname "$0")/.."

# Create build directory if it doesn't exist
mkdir -p build

echo "Building Single Executable Application in $(pwd)..."

# Step 1: Initialze the build directory
echo "Step 1: Removing existing build directory..."
rm -rf build
mkdir -p build

# Step 2: Bundle with esbuild
echo "Step 2: Bundling with esbuild..."
npx esbuild ./src/scripts/cli/send.ts --bundle --platform=node --format=cjs --target=node22 --outfile=build/sendemail.cjs

# Step 3: Clean the bundle file - remove NODE_SEA_FUSE bundled by esbuild
echo "Step 3: Cleaning bundle file..."
sed -i '/NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2/d' build/sendemail.cjs

# Step 4: Generate SEA blob
echo "Step 4: Generating SEA blob..."
node --experimental-sea-config sea-config.json

# Step 5: Copy Node.js executable
echo "Step 5: Copying Node.js executable..."
node -e "require('fs').copyFileSync(process.execPath, 'build/sendemail.exe')"

# Step 6: Inject SEA blob into executable
echo "Step 5: Injecting SEA blob..."
npx postject build/sendemail.exe NODE_SEA_BLOB build/sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2

echo "Build complete! Executable: build/sendemail.exe"
