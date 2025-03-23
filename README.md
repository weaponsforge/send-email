## send-email

Sends emails using Gmail SMTP with username/pw or Google OAuth2

## Requirements

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

## Installation

1. Clone the repository.<br>
`git clone https://github.com/weaponsforge/send-email.git`

2. Install dependencies.<br>
`npm install`

---

## References

- Gmail API <sup>[[1]](https://developers.google.com/gmail/api/guides)</sup>
- Gmail Quickstart <sup>[[2]](https://developers.google.com/gmail/api/quickstart/js)</sup>
- AMP for Gmail <sup>[[3]](https://developers.google.com/gmail/ampemail)</sup>
- Google Workspace Guide <sup>[[4]](https://developers.google.com/workspace/guides/get-started)</sup>

@weaponsforge<br>
20250323
