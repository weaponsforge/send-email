## send-email

NPM scripts and CLI for sending text and HTML emails using Gmail SMTP with Google OAuth2.

### Table of Contents

- [Requirements](#-requirements)
- [Quickstart](#-quickstart)
- [Installation](#%EF%B8%8F-installation)
- [Usage](#-usage)
- [Alternate Usage](#alternate-usage)
- [Code Samples](#-code-samples)
- [Available Scripts](#-available-scripts)
- [Docker Scripts](#-docker-scripts)
- [Building the Windows Executable File](#️-building-the-windows-executable-file)

## 📋 Requirements

<details>
<summary>👉 Click to expand the list of requirements</summary>

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

(Installed via npm)

1. [googleapis](https://www.npmjs.com/package/googleapis) `v164.1.0`
2. [nodemailer](https://www.npmjs.com/package/nodemailer) `v7.0.10`
3. [typescript](https://www.npmjs.com/package/typescript) `v5.9.3` - Compile-time error checker
4. [vite-node](https://www.npmjs.com/package/vite-node) `v3.2.4`- Runs TS files in development mode
5. [vitest](https://www.npmjs.com/package/vitest) `v4.0.4` - Runs tests
6. [commander](https://www.npmjs.com/package/commander) `v14.0.2` - CLI library
7. [sanitize-html](https://www.npmjs.com/package/sanitize-html) `v2.17.0` - Sanitizes WYSIWYG HTML input

</details>
<br>

## 🆕 Quickstart

1. Create a `.env` file in the `/app` directory, replacing the contents of the `.env.example` file with actual values.
   - See **Installation # 4** for more information about these environment variables.
2. Install dependencies.
   ```bash
   npm install
   ```
3. Transpile to JavaScript.
   ```bash
   npm run transpile
   ```
4. Send a **text email** using the CLI, eg. using Bash:
   ```bash
   npm run send-email -- text \
     -s "You are Invited" \
     -c "Birthday party in December" \
     -r a@gmail.com,b@gmail.com,c@gmail.com
   ```

   > 💡 **TIP:** Use `send-email:dev` to work on development mode without needing to run `"npm run transpile"`

5. Send a **styled HTML email** using the CLI, eg. using Bash:
   ```bash
   npm run send-email -- html \
     -s "Reading Materials" \
     -c "Lorem ipsum dolor sit amet" "this is paragraph 1" "this is paragraph 2" \
     -r test@gmail.com,one@gmail.com,two@gmail.com
   ```

   > 💡 **TIP:** No transpilation needed with `"send-email:dev"`

6. Send **WYSIWYG** HTML content using the CLI, eg. using Bash:<br>
   _(Adjust `@/utils/config/sanitizeHtml.ts` to allow more styles.)_

   ```bash
   npm run send-email -- html \
     -s "WYSIWYG Email" \
     -w "<div style='width:100px; height:100px; border:5px solid blue; border-radius: 3px; padding: 8px; text-align: center; background-color: azure;'><h3>Hello, World</h3></div>" \
     -r "tester@gmail.com"
   ```

   > 💡 **TIP:** Development mode via `"send-email:dev"` skips transpilation

## 🛠️ Installation

1. Clone the repository.<br>
`git clone https://github.com/weaponsforge/send-email.git`

2. Install dependencies.<br>
`npm install`

3. Configure **OAuth2**. Get a refresh token from the Google [OAuth 2 Playground](https://developers.google.com/oauthplayground).
   - Read on [Using the OAuth 2.0 Playground](https://github.com/weaponsforge/email-sender?tab=readme-ov-file#using-the-oauth-20-playground) for more information about generating a refresh token using the Google OAuth Playground.
   - _**INFO:** This is an older note, some steps may vary in 2025)_

4. Set up the environment variables. Create a `.env` file inside the **/app** directory with reference to the `.env.example` file.

   | Variable Name | Description |
   | --- | --- |
   | GOOGLE_USER_EMAIL | Your google email that you've configured for Gmail SMTP and Google OAuth2 |
   | GOOGLE_CLIENT_ID | Google Developer Project ID associated with your email |
   | GOOGLE_CLIENT_SECRET | Client secret for the Google Developer Project CLIENT_ID|
   | GOOGLE_REDIRECT_URI | Allowed Google API redirect URI. Its value is `https://developers.google.com/oauthplayground` by default. |
   | GOOGLE_REFRESH_TOKEN | The initial (or any) refresh token obtained from [OAuthPlayground](https://developers.google.com/oauthplayground).<ul><li>Read on [Using the OAuth 2.0 Playground](https://github.com/weaponsforge/email-sender?tab=readme-ov-file#using-the-oauth-20-playground) for more information about generating a refresh token using the Google OAuth Playground.</li><li><blockquote>(_**INFO:** This is an older note, some steps may vary this 2025)_</blockquote></li></ul> |


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

- **Build the image** (Run only once)
   ```bash
   docker compose build --no-cache
   ```

- **Run the container** (Run only once)
   ```bash
   docker compose up
   ```

- **Run an NPM script using Docker compose**<br>
   Ensure the Docker container is running (see **Run the container**)
   ```bash
   docker exec -it weaponsforge-sendemail-dev <AVAILABLE_SCRIPT_OR_DOCKER_SCRIPT>
   ```

- **Run an NPM script using only Docker**<br>
   Ensure the Docker container is running (see **Run the container**)
   ```bash
   docker run -it -v ${pwd}/app:/opt/app -v /opt/app/node_modules --rm weaponsforge/sendemail:dev <AVAILABLE_SCRIPT_OR_DOCKER_SCRIPT>
   ```

- **Run a non-test TS file using Vite**<br>
   (requires **Run an NPM script using Docker compose**)
   ```bash
   docker exec -it weaponsforge-sendemail-dev npx vite-node /opt/app/src/<PATH_TO_TS_FILE>.ts
   ```

- See the [Available Scripts](#-available-scripts) and [Docker Scripts](#-docker-scripts) sections for more information.

## 🧾 Code Samples

### Send a Text-format Email

**app/src/demo/sendEmail.ts**
```typescript
import { send } from '@/lib/index.js'

const main = async () => {
   await send({
      recipient: 'tester@gmail.com',
      subject: 'Test Message',
      content: 'How are you?'
   })
}

main()
```

### Send an HTML-format Email

**app/src/demo/sendHtml.ts**
```typescript
import { send } from '@/lib/index.js'
import { buildHtml } from '@/lib/index.js'

const emails = ['tester@gmail.com', 'admin@gmail.com']

const main = async () => {
   // Build the HTML email content
   const emailContent = await buildHtml({
      content: ['Lorem ipsum dolor sit amet...', 'paragraph #2', 'paragraph #3'],
      recipients: emails,
      sender: process.env.GOOGLE_USER_EMAIL
   })

   // Send the email
   await send({
      subject: 'Welcome Aboard!',
      content: emailContent,
      recipients: emails,
      isHtml: true
   })
}

main()
```

<br>

## 📜 Available Scripts

These scripts, compatible with running in Node and Docker, run various TypeScript scripts and tests.

<details>
<summary>👉 Click to expand the list of available scripts</summary>

### A. Running the Codes ⚙️➡️

### `npm run dev`

Runs `vitest` in watch mode, watching file changes and errors to files linked with `*.test.ts` files.

### `npm run watch`

Watches file changes in `.ts` files using the `tsc --watch` option.

### `npm run transpile`

Builds JavaScript, `.d.ts` declaration files, and map files from the TypeScript source files in the `/src` directory.

### `npm run transpile:noemit`

Runs type-checking without generating the JavaScript or declaration files from the TypeScript files in the `/src` and `__tests__` directories.

### B. Testing 🚦✅

### `npm run lint`
Lints TypeScript source codes.

### `npm run lint:fix`
Fixes lint errors in TypeScript files.

### `npm test`
- Runs test scripts defined in `*.test.ts` files with coverage.
- Generates a vitest test report into the **/html** directory.
- Run `npm run report:view` to preview the generated report.

### `npm run test:ui`

- Runs test scripts defined in `*.test.ts` files with coverage.
- Spawns a local report-like website showing each test's real-time status and coverage using vitest-ui
- This script is similar to the vitest **`npm run dev`** script that watches for changes in the `*.test.ts` files but displays the result logs and coverage details in the local website rather than the command line.

### `npm run report:view`

> **NOTE:** This script requires running `npm test` first to generate a test report into the **/html** directory

- Spins up a local web server accessible at `http://localhost:4174/`
- Serves the website contents of a test report from the **/html** directory

### `npm run copy:files`

Copies the EJS email template into the `/dist/templates` directory.

This script runs automatically after `"npm run transpile"`, copying the `"/app/src/templates/email.ejs"` to the `"/dist/templates"` directory.

### C. CLI 💻

### `npm run send-email`

Sends text and HTML emails using the command line interface (CLI) with transpiled JavaScript.

> 💡 **IMPORTANT:**
> - This script requires running the `"npm run transpile"` script before usage.
> - If you want to run these without transpiling, append a `:dev` after the NPM script: `"npm run send-email:dev"`

#### CLI Usage

- To view the list of available commands: `npm run send-email help`
   ```text
   Usage: send-email [options] [command]

   CLI for sending an email using Gmail SMTP and Google OAuth2

   Options:
   -V, --version   output the version number
   -h, --help      display help for command

   Commands:
   text [options]  Send raw text email to one or multiple recipient/s
   html [options]  Send paragraphs of text or WYSIWYG content as styled
                     HTML email to one or multiple recipient/s.
   help [command]  display help for command
   ```
- Append a double dash `--` to pass arguments to the CLI commands eg., (using Bash)
   ```bash
   npm run send-email -- text \
     -s "You are Invited" \
     -c "Birthday party in December" \
     -r a@gmail.com,b@gmail.com,c@gmail.com
   ```
- View available options for the **send-email text [options]** command.
   ```bash
   # Usage options for the send "text" email command
   npm run send-email help text
   ```

   ```text
   Usage: send-email text [options]

   Send raw text email to one or multiple recipient/s

   Options:
   -s, --subject <title>      email subject or title enclosed in double-quotes
   -c, --content <text>       email text content enclosed in double-quotes
   -e, --env <path>           path to .env file (optional)
   -r, --recipients <emails>  comma-separated list of email addresses
   -h, --help                 display help for command
   ```

- View available options for the **send-email html [options]** command.
   ```bash
   # Usage options for the send "html" email command
   npm run send-email help html
   ```

   ```text
   Usage: send-email html [options]

   Send paragraphs of text or WYSIWYG content as styled
   HTML email to one or multiple recipient/s.

   Options:
   -s, --subject <title>      email subject or title enclosed in double-quotes
   -r, --recipients <emails>  comma-separated list of email addresses
   -c, --content <text...>    whitespace-delimited of text/paragraphs enclosed in double-quotes
   -w, --wysiwyg [html]       optional HTML tags that form a WYSIWYG content enclosed in double-quotes
   -e, --env <path>           path to .env file (optional)
   -h, --help                 display help for command
   ```

### `npm run send-email:dev`

- Sends an email using the command line interface (CLI) in development mode using TypeScript.
- Append a double dash `--` to pass arguments to the CLI commands.
- Usage: view the `"npm run send-email"` script for more information. They share similar usage.
  - > 💡 **NOTE:** Append `:dev` in the script eg., `npm run send-email:dev`

</details>
<br>

## 📦 Docker Scripts

These scripts allow optional Docker-related processes, such as enabling file watching in Docker containers running in Windows WSL2 and others.

> [!TIP]
> Scripts with a `":win"` suffix indicate compatibility for Windows Docker running in WSL2.

<details>
<summary>👉 Click to expand the list of available scripts</summary>

### Docker run command

Run the Docker containers first using options A or B.

**A. Using Docker compose**

```bash
docker compose build
docker compose up
```

Use the template:

```bash
docker exec -it weaponsforge-sendemail-dev <AVAILABLE_DOCKER_SCRIPT>
```

**B. Using Only Docker (PowerShell)**

`docker run -it -v ${pwd}/app:/opt/app -v /opt/app/node_modules --rm weaponsforge/sendemail:dev <AVAILABLE_DOCKER_SCRIPT>`

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

### `npm run docker:test:ui`

- Docker command counterpart of the `npm run test:ui` script,  compatible with containers running in **Linux** OS.
- Runs test scripts defined in `*.test.ts` files in watch mode with coverage from a container.
- Spawns a local report-like website showing each test's real-time status and coverage using vitest-ui accessible at `http://localhost:51204/__vitest__/`.

### `npm run docker:report:view`

> **NOTE:** This script requires running `npm test` first to generate a test report into the **/html** directory

- Docker command counterpart of the `npm run report:view` script.
- Spins up a local web server accessible at `http://localhost:4174/`
- Serves the website contents of a test report from the host's **/html** directory

### `npm run docker:watch:win`

Watches file changes in `.ts` files using the `tsc --watch` option with `dynamicPriorityPolling` in Docker containers running in Windows WSL2.

### `npm run docker:dev:win`

- Sets and exports the environment variables: `CHOKIDAR_USEPOLLING=1` and `CHOKIDAR_INTERVAL=1000`
- Runs `vitest` in watch mode inside Docker containers running in Windows WSL2, watching file changes and errors to files linked with `*.test.ts` files.

### `npm run docker:test:ui:win`

- Sets and exports the environment variables: `CHOKIDAR_USEPOLLING=1` and `CHOKIDAR_INTERVAL=1000`
- Runs test scripts defined in `*.test.ts` files in watch mode with coverage inside Docker containers running in **Windows WSL2**.
- Spawns a local report-like website showing each test's real-time status and coverage using vitest-ui accessible at `http://localhost:51204/__vitest__/`.

</details>
<br>

## 🏗️ Building the Windows Executable File

This project packages the CLI app into a **Windows (.exe)** Node Single Executable Application [(SEA)](https://nodejs.org/api/single-executable-applications.html) into the `"/app/build/sendemail.exe"` file using esbuild and postject.

**Using Node**

Run the Bash script using GitBash when working in a Windows OS.

```bash
chmod u+x ./app/scripts/build-sea-win.sh
./app/scripts/build-sea-win.sh
```

**Using Docker**

This steps needs to have the Docker container up and running first (`"docker compose up"`).

```bash
docker-compose exec -it weaponsforge.sendemail-dev sh ./scripts/build-sea-win.sh
```

#### Using the Executable File

- Refer to [Available Scripts - C. CLI](#-available-scripts) for usage information, and remove the `"--"` operator eg., <br>
   ~~`"~npm run send-email:dev -- text"`~~ -> `"npm run send-email -- text"`

## References

- Gmail API <sup>[[1]](https://developers.google.com/gmail/api/guides) [[2]](https://github.com/googleapis/google-api-nodejs-client)</sup>
- Gmail Quickstart <sup>[[3]](https://developers.google.com/gmail/api/quickstart/js)</sup>
- AMP for Gmail <sup>[[4]](https://developers.google.com/gmail/ampemail)</sup>
- Google Workspace Guide <sup>[[5]](https://developers.google.com/workspace/guides/get-started)</sup>

@weaponsforge<br>
20250323
