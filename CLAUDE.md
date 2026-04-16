# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@weaponsforge/sendemail` is a Node.js NPM library and CLI for sending text and HTML emails via Gmail SMTP using Google OAuth2. It is distributed as an NPM package, Docker image, and Windows SEA (Single Executable Application) binary.

## Development Setup

All source code lives in the `/app` directory. Run all npm commands from `/app`.

**Required environment variables** (copy `/app/.env.example` to `/app/.env`):
```
GOOGLE_USER_EMAIL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI    # https://developers.google.com/oauthplayground
GOOGLE_REFRESH_TOKEN
```

## Common Commands

All commands run from the `/app` directory:

```bash
# Linting
npm run lint          # Check for lint errors
npm run lint:fix      # Auto-fix lint errors

# Type checking / build
npm run transpile:noemit   # Type-check only (no output)
npm run transpile          # Compile TypeScript to dist/

# Testing
npm test              # Run all tests with coverage (outputs to html/coverage/)
npm run dev           # Vitest watch mode
npm run test:ui       # Vitest UI dashboard (port 51204)

# Run a single test file
npx vitest run src/__tests__/cli.test.ts

# CLI (development)
npm run sendemail:dev -- text --to recipient@email.com --subject "Test" --body "Hello"
npm run sendemail:dev -- html --to recipient@email.com --subject "Test" --htmlFile path/to/file.html

# Docker
npm run docker:debug         # Run dev container with debugger (port 9229)
npm run docker:test:ui       # Run Vitest UI in Docker (Linux/macOS)
npm run docker:test:ui:win   # Run Vitest UI in Docker (Windows WSL2)
```

## Architecture

### Class Hierarchy

```
EmailTransport (lib/email/transport.ts)
  └── EmailSender (lib/email/sender.ts)
```

- **`GmailOAuthClient`** (`lib/google/oauth2client.ts`) — Manages Google OAuth2 credentials; validates env vars via Zod schema on instantiation
- **`EmailTransport`** — Base class; initializes Nodemailer transporter with OAuth2 credentials
- **`EmailSender`** — Extends `EmailTransport`; exposes `send()` method; validates email params with Zod schema
- **`SchemaValidator`** (`lib/validator/schemavalidator.ts`) — Generic Zod validation wrapper used by both classes

### Key Data Flow

1. **Library usage**: `send()` (lib/email/send.ts) → creates `EmailSender` → validates params → sends via Nodemailer
2. **CLI usage**: Commander.js (`scripts/cli/send.ts`) → `handleText` / `handleHtml` handlers → calls `send()`
3. **HTML emails**: EJS template (`utils/templates/email.ejs`) rendered via `build.ts`, then sanitized with `sanitize-html` before sending

### Public API (src/index.ts)

Exports: `send`, `EmailSender`, `GmailOAuthClient`, `SchemaValidator`, plus all types from `src/types/`.

### Validation

All input validation uses Zod schemas in `src/types/`:
- `email.schema.ts` — email send params (to, subject, body, etc.)
- `oauth2client.schema.ts` — Google OAuth2 env vars

### File Naming Conventions

| Pattern | Purpose |
|---|---|
| `*.schema.ts` | Zod validation schemas |
| `*.interface.ts` | TypeScript interfaces |
| `*.types.ts` | TypeScript types and enums |
| `*.enum.ts` | Enums |

### Path Aliases

`@/` maps to `src/` (configured in tsconfig.json and resolved by `tsc-alias` post-build).

## Code Style

- No semicolons, single quotes, 2-space indentation, LF line endings
- Arrow functions preferred; early returns preferred
- Max ~250 lines per file
- TypeScript strict mode enabled
- No unused variables (prefix with `_` to suppress)
- Tests in `src/__tests__/` with `.test.ts` suffix

## Build Outputs

| Directory | Contents |
|---|---|
| `dist/` | Compiled JS + type declarations (npm package output) |
| `build/` | Windows SEA binary (`sendemail.exe`) |
| `html/coverage/` | Vitest coverage reports |

## CI/CD

- **`test.yml`**: Runs on push to non-main branches — lint + type-check + tests (Node v24.11.0, ubuntu-latest)
- **`release.yml`**: Runs on GitHub release — lint + test + build SEA + publish to npm and Docker Hub
- Branch strategy: `dev` for development, `main` for releases
