## Coding Style

This document outlines the general TypeScript and CLI/library coding styles and guidelines for this repository.

### Table of Contents

- [Project Folder Structure](#-project-folder-structure)
- [Coding Practices and Guidelines](#-coding-practices-and-guidelines)
   - [General Coding Guidelines](#-general-coding-guidelines)
   - [Library Code](#-library-code)
   - [Code Documentation](#-code-documentation)
   - [Linting and Formatting](#-linting-and-formatting)
   - [Use of External Libraries](#-use-of-external-libraries)
   - [Testing](#-testing)

## 📚 Project Folder Structure

It follows the directory structure within the `/app` directory:

> [!NOTE]
> 📂 build<br>
> 📂 dist<br>
> 📂 html<br>
> 📂 scripts<br>
> 📂 src<br>
> └─ 📂 \_\_tests\_\_<br>
> └─ 📂 demo<br>
> └─ 📂 scripts<br>
> └─ 📂 types<br>
> └─ 📂 utils<br>
> └─ 📄 index.ts<br>
> └─ 📄 .env.example<br>
> └─ 📄 .gitignore<br>
> └─ 📄 .dockerignore<br>
> └─ 📄 Dockerfile<br>
> └─ 📄 package.json<br>
> └─ 📄 package-lock.json<br>
> └─ 📄 sea-config.json<br>
> └─ 📄 eslint.config.mjs<br>
> └─ 📄 vite.config.ts<br>
> └─ 📄 tsconfig.json<br>
> └─ 📄 ...<br>
> 📄 README.md

### Main Folders and Content

**What you should (and shouldn't) edit**

✅ **Edit:**
- `src/**` (main TypeScript source)
- Top-level build scripts in `scripts/**` (bash / automation)

🏗️🚫 **Auto-generated (do not edit):**
- `dist/**` (TS build output; local, published to NPM)
- `build/**` (SEA build output; local, published to GitHub Releasees)
- `html/**` (test coverage output; local)

#### 📂 build

Generated SEA artifacts (Windows EXE + blob output with `build-sea-win.sh`). Local build output only. This is what gets published to thee GitHub Releases page.<br>
Do not edit manually.

#### 📂 dist

Generated output from TypeScript build (JS + .d.ts + sourcemaps). This is what gets published to the npm registry.<br>
Do not edit manually.

#### 📂 html

Generated Vitest coverage website output.<br>
Do not edit manually.

#### 📂 scripts

Contains Build automation scripts (bash)

#### 📂 src

Contains the main source, configurations, and utilities used throughout the app.

- `/__tests__` — Vitest test files used for testing critical library and CLI features.
- `/demo` — Sample codes demonstrating library usage.
- `/scripts` — CLI source code (TypeScript).
- `/types` — Main TypeScript interfaces, types and constructs used within the app.
- `/utils` — General-purpose utility functions, such as string formatters, directory path conventions and constant configurations.

#### 📂 src/lib

Contains the main application source codes, classes and logic.

- `/email` — Classes and scripts for handling email transport and content formatting and transformation.
- `/google` — Class that manages and validates input for the Google OAuth2.
- `/validator` — A wrapper around the `zod` Schemas containing generic log output formatters and utilities.

#### 📂 src/lib/utils/templates

This folder contains the [EJS](https://github.com/mde/ejs) HTML template used in sending emails, and other template formats for various use cases.

## 📌 Coding Practices and Guidelines

### 📐 General Coding Guidelines

- Use **`LF` (Line Feed)** as the line ending format for all code and other files to ensure consistency across environments and platforms.
- Use **arrow functions** instead of traditional function declarations when defining functions and methods. Only use `function()` definitions for specific cases.
- Follow **camelCase** for naming variables, files, functions/methods and non-component folders.
- Follow **PascalCase** for naming **Zod** schemas, TypeScript `types`, `interfaces`, `enums` and other TypeScript constructs.
- Follow consistent file naming conventions based on content:
   - Use `*.schema.ts` for files containing Zod schemas.
   - Use `*.enum.ts` for files containing only enums.
   - Use `*.interface.ts` for files containing only interfaces.
   - Use `*.types.ts` for files that include a mix of types, interfaces, enums, or other related constructs.
- Always define the **types** of function parameters and return values. Use TypeScript **interfaces** or **types** for generic parameters when applicable.
   - Avoid `any` unless absolutely necessary (prefer `unknown`, `Record`, etc.)
- Aim to keep each source file—**under approximately 250 lines of code**. If a file exceeds this size, **consider refactoring** it into smaller, more focused files to improve clarity and maintainability.
- Use **early `return` statements** to exit a hooks or functions as soon as possible when conditions aren't met, to avoid unnecessary processing and to keep the logic clean and efficient.
- Store constant values (e.g., strings or numbers) in **well-named variables** to improve readability and maintainability.
   ```typescript
   ✅ const PROGRAM_NAME = 'my-app'
       program.name(PROGRAM_NAME)
   ❌ program.name('my-app')
   ```

### 💻 Library Code

- Implement CLI features within the `📂 src/scripts` directory.
- Think in OOP and use `classes` to define app-wide logic in the `📂 src/lib` directory whenever possible.
- Export new library scripts or classes in the `/src/index.ts` file.

### 📄 Code Documentation

- Use **JSDoc-style comments** to describe function parameters, return types, and TypeScript type or interface definitions.
- Add **minimal but meaningful inline comments** where necessary to clarify intent, especially for complex or non-obvious logic.
- Use **descriptive and self-explanatory variable names** to reduce the need for excessive comments and improve overall code readability.

### 🧹 Linting and Formatting

- Linting is handled by **ESLint**, configured via `eslint.config.mjs`.
- All code should pass `"npm run lint"` and `"npm run transpile:noemit"` before commit.

### 📦 Use of External Libraries

- Strive to **minimize external dependencies**, especially for simple or easily implementable functionality (e.g., a function that sums two numbers).
- Only use third-party Node libraries when **truly necessary**—for example, when a library:
   - Provides functionality that would be complex or time-consuming to build from scratch
   - Is used frequently across the app
   - Helps avoid "reinventing the wheel" for heavy processing tasks
- Before adding a library, consider the following 🟢 green flags:
   - It comes from a **credible author or organization**, with an active and trustworthy GitHub repository
   - It has **high usage** and community trust (e.g., ~100K+ downloads on the NPM registry)
   - It has **small and lightweight footprint** (eg., about ~300KB-2MB unpacked) or if it supports **tree-shaking**.
   - The source code is **open, transparent, and actively maintained** (eg., few open GitHub Issues or PRs)
   - Even if not actively maintained, the library still **aligns with your needs** and is simple enough to extend or adapt for custom use (e.g., a JavaScript `class` that can be easily refactored or subclassed (`extend`) for custom use)

### 🧪 Testing

> [!NOTE]
> _This app uses **Vitest** for testing feature-level processes._

- Create and run tests for critical feature-level components, classes, or scripts.
- Place test files in the `/src/__tests__` directory.
- Name test files to match the target module, using the suffix: `*.test.ts`.
   > **Example:** `send.ts` → `send.test.ts`
- **Selectively write tests** for critical or global, features, or business logic as needed.
- All code should pass `"npm test"` before commit.

@weaponsforge<br>
20260226
