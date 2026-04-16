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

# Testing (coverage always enabled, outputs to html/coverage/ and html/junit.xml)
npm test              # Run all tests once
npm run dev           # Vitest watch mode
npm run test:ui       # Vitest UI dashboard (port 51204)

# Run a single test file
npx vitest run src/__tests__/cli.test.ts

# CLI (development)
npm run sendemail:dev -- text --recipients recipient@email.com --subject "Test" --content "Hello"
npm run sendemail:dev -- html --recipients recipient@email.com --subject "Test" --content "Paragraph 1" "Paragraph 2"
npm run sendemail:dev -- html --recipients recipient@email.com --subject "Test" --wysiwyg "<p style='color:red'>Hello</p>"

# Optional --env flag to load a custom .env file
npm run sendemail:dev -- text --recipients r@email.com --subject "Test" --content "Hi" --env ./custom.env

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

- **`EmailTransport`** — Base class; initializes Nodemailer transporter via `createTransport3LO(options?)`. Reads Google OAuth2 credentials from `options` fields, falling back to `GOOGLE_*` env vars. Nodemailer handles token refresh internally via the `refreshToken` field.
- **`EmailSender`** — Extends `EmailTransport`; exposes `sendEmail()` method; validates email params with Zod schema. Supports a single `recipient` string or a `recipients[]` array (max 20 total).
- **`SchemaValidator`** (`lib/validator/schemavalidator.ts`) — Generic Zod validation wrapper; handles both `ZodObject` and `ZodEffects` (`.refine()`) schemas; supports partial validation via `pick`.

### Key Data Flow

1. **Library usage**: `send(params, oauth2?)` (`lib/email/send.ts`) → creates `EmailSender` → `createTransport3LO(oauth2?)` → `sendEmail()`
2. **CLI text**: Commander.js (`scripts/cli/send.ts`) → `handleSendTextEmail` → `send()`
3. **CLI HTML**: Commander.js → `handleSendHtmlEmail` → `buildHtml()` (renders EJS template, sanitizes HTML) → `send()` with `isHtml: true`
4. **SEA builds**: `build.ts` checks `IS_BUILD_SEA=true` to import the EJS template via `import()` (baked into the binary) rather than reading it from disk.

### Public API (`src/index.ts`)

Exports: `send`, `buildHtml`, `EmailSender`, `EmailTransport`, `SchemaValidator`, plus all types from `src/types/`.

### Validation

All input validation uses Zod schemas in `src/types/`:
- `email.schema.ts` — `EmailSchema` for `send()` params; `HtmlBuildSchema` for `buildHtml()` params; `EmailTextOptions` / `EmailHtmlOptions` interfaces for CLI handlers
- `transport.schema.ts` — `TransportOath2Schema` / `TransportOath2SchemaType` for optional OAuth2 credentials passed to `send()` and `createTransport3LO()`

### ESM Compatibility

`globalThis.__dirname` is set in the CLI entry point (`scripts/cli/send.ts`) to handle `__dirname` in ESM. It resolves to `process.cwd()` in SEA mode or the module's directory otherwise. Other files that need `__dirname` use the `directory(import.meta.url)` helper from `utils/helpers.ts`.

### Post-Build Step

After `tsc` compiles to `dist/`, `npm run copy:files` (`scripts/build/copyTemplate.ts`) copies the EJS email template into `dist/` so it's available at runtime for non-SEA usage.

### File Naming Conventions

| Pattern | Purpose |
|---|---|
| `*.schema.ts` | Zod validation schemas |
| `*.interface.ts` | TypeScript interfaces |
| `*.types.ts` | TypeScript types and enums |
| `*.enum.ts` | Enums |

### Path Aliases

`@/` maps to `src/` (configured in `tsconfig.json`; resolved at runtime by `tsx`, and rewritten post-build by `tsc-alias`).

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
| `html/junit.xml` | JUnit test results (used by CI) |

## CI/CD

- **`test.yml`**: Runs on push to non-main branches — lint + type-check + tests (Node v24.11.0, ubuntu-latest)
- **`release.yml`**: Runs on GitHub release — lint + test + build SEA + publish to npm and Docker Hub
- Branch strategy: `dev` for development, `main` for releases
