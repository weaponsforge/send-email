## send-email

Sends emails using Gmail SMTP with username/pw or Google OAuth2

### Table of Contents

- [Requirements](#requirements)
- [Installation](#-installation)
- [Available Scripts](#-available-scripts)

## 📋 Requirements

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

## 🛠️ Installation

1. Clone the repository.<br>
`git clone https://github.com/weaponsforge/send-email.git`

2. Install dependencies.<br>
`npm install`

## 📜 Available Scripts

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

---

## References

- Gmail API <sup>[[1]](https://developers.google.com/gmail/api/guides)</sup>
- Gmail Quickstart <sup>[[2]](https://developers.google.com/gmail/api/quickstart/js)</sup>
- AMP for Gmail <sup>[[3]](https://developers.google.com/gmail/ampemail)</sup>
- Google Workspace Guide <sup>[[4]](https://developers.google.com/workspace/guides/get-started)</sup>

@weaponsforge<br>
20250323
