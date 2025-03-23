## send-email

Sends emails using Gmail SMTP with username/pw or Google OAuth2

### Table of Contents

- [Requirements](#requirements)
- [Installation](#-installation)
- [Usage](#-usage)
- [Alternate Usage](#-alternate-usage)
- [Available Scripts](#-available-scripts)
- [Docker Scripts](#-docker-scripts)

## 📋 Requirements

<details>
<summary>Click to expand the list of requirements</summary>

1. Windows 11/Linux OS
2. NodeJS LTS v22 or higher
   ```
   Recommended:
   node: 22.14.0
   npm: 10.9.2
   ```
3. Gmail Account
   - Gmail email/password
   - Optional:
      - Google Cloud Platform project configured with [OAuth2](https://developers.google.com/workspace/guides/configure-oauth-consent) settings and [credentials](https://developers.google.com/workspace/guides/manage-credentials)
      - Read on the Google [Gmail](https://developers.google.com/gmail/api/guides), [SMTP and OAuth2 Setup](https://github.com/weaponsforge/email-sender?tab=readme-ov-file#using-the-oauth-20-playground) sections for more information

### Core Libraries/Frameworks

1. typescript `v5.8.2` - Compile-time error checker
2. vite-node `v3.0.9`- Runs TS files in development mode
3. vitest `v3.0.9` - Runs tests

</details>

## 🛠️ Installation

1. Clone the repository.<br>
`git clone https://github.com/weaponsforge/send-email.git`

2. Install dependencies.<br>
`npm install`

## 🚀 Usage

**Using Node**

1. Run a non-test TypeScript file inside the **/app/src** directory from the project's _**"root directory"**_. For example:

   ```bash
   cd app
   npx vite-node src/utils/sample.ts
   ```

2. Run compiled JavaScript code from the TypeScript files. For example:

   ```bash
   cd app
   npm run transpile
   node dist/utils/sample.js
   ```

3. See the [Available Scripts](#-available-scripts) section for more information.

## ⚡Alternate Usage

**Using Docker**

- **Build the image**
   ```bash
   docker compose -f docker-compose.dev.yml build
   ```

- **Run the container**
   ```bash
   docker compose -f docker-compose.dev.yml up
   ```

- **Run an NPM script using Docker compose**<br>
   Ensure the Docker container is running (see **Run the container**)
   ```bash
   docker exec -it weaponsforge-sendemail-dev npm run <AVAILABLE_SCRIPT_OR_DOCKER_SCRIPT>
   ```

- **Run an NPM script using only Docker**<br>
   Ensure the Docker container is running (see **Run the container**)
   ```bash
   docker run -it -v ${pwd}/app:/opt/app -v /opt/app/node_modules --rm weaponsforge/sendemail:dev npm run <AVAILABLE_SCRIPT_OR_DOCKER_SCRIPT>
   ```

- See the [Available Scripts](#-available-scripts) and [Docker Scripts](#-docker-scripts) sections for more information.


## 📜 Available Scripts

These scripts, compatible with running in Node and Docker, run various TypeScript scripts and tests.

<details>
<summary>Click to expand the list of available scripts</summary>

### `npm run dev`

Runs `vitest` in watch mode, watching file changes and errors to files linked with `*.test.ts` files.

### `npm run watch`

Watches file changes in `.ts` files using the `tsc --watch` option.

### `npm run transpile`

Builds JavaScript, `.d.ts` declaration files, and map files from the TypeScript source files.

### `npm run transpile:noemit`

Runs type-checking without generating the JavaScript or declaration files from the TypeScript files.

### `npm run lint`
Lints TypeScript source codes.

### `npm run lint:fix`
Fixes lint errors in TypeScript files.

### `npm test`
Runs test scripts defined in *.test.ts files.

</details>

## 📦 Docker Scripts

These scripts allow optional Docker-related processes, such as enabling file watching in Docker containers running in Windows WSL2 and others.

<details>
<summary>Click to expand the list of available scripts</summary>

### Docker run command

Run the Docker containers first using options A or B.

**A. Using Docker compose**

```
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up
```

**B. Using Only Docker (PowerShell)**

`docker run -it -v ${pwd}/app:/opt/app -v /opt/app/node_modules --rm weaponsforge/sendemail:dev <AVAILABLE_SCRIPT>`

### Scripts

### `npm run docker:debug`

1. Runs the `"/src/utils/sample/sample.ts"` script in containers with debugging enabled in VSCode by default.
2. Replace the `"/src/utils/sample/sample.ts"` file path in the package.json file's `"docker:debug"` script with a target TypeScript file for debugging.
3. Map port **`9229`** to enable debugging VSCode while running in Docker (PowerShell).
   - (A. Using Docker compose):<br>
   `docker exec -it weaponsforge-sendemail-dev npm run docker:debug`
   - (B. Using Only Docker (PowerShell))<br>
   `docker run -it -v ${pwd}/app:/opt/app -v /opt/app/node_modules -p 9229:9229 --rm weaponsforge/sendemail:dev npm run docker:debug`
4. Launch the VSCode debugger using the following configuration:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "node",
         "request": "attach",
         "name": "Attach to Docker",
         "address": "localhost",
         "port": 9229,
         "restart": true,
         "skipFiles": ["<node_internals>/**"],
         "localRoot": "${workspaceFolder}/app",
         "remoteRoot": "/opt/app"
       }
     ]
   }
   ```

### `npm run docker:watch:win`

Watches file changes in `.ts` files using the `tsc --watch` option with `dynamicPriorityPolling` in Docker containers running in Windows WSL2.

### `npm run docker:dev:win`

- Sets and exports the environment variables: `CHOKIDAR_USEPOLLING=1` and `CHOKIDAR_INTERVAL=1000`
- Runs `vitest` in watch mode inside Docker containers running in Windows WSL2, watching file changes and errors to files linked with `*.test.ts` files.

</details>


## References

- Gmail API <sup>[[1]](https://developers.google.com/gmail/api/guides)</sup>
- Gmail Quickstart <sup>[[2]](https://developers.google.com/gmail/api/quickstart/js)</sup>
- AMP for Gmail <sup>[[3]](https://developers.google.com/gmail/ampemail)</sup>
- Google Workspace Guide <sup>[[4]](https://developers.google.com/workspace/guides/get-started)</sup>

@weaponsforge<br>
20250323
