# Contribution Guidelines

Welcome to the **send-email** repository! We're excited to have you contribute to sending text and HTML-format emails more accessible via command line interface (CLI). To ensure a smooth contribution process for everyone, please follow these guidelines.

> [!NOTE]
> **Before Submitting**
>
> Check if there are other similar [PRs](https://github.com/weaponsforge/send-email/pulls).
>
> **New Feature**
>
> Before submitting a new feature, please open a **Feature Request issue** that clearly explains the proposed functionality and the reasons behind it. Once the request has been reviewed and approved, you may proceed with submitting a pull request.
>
> **Bug Fixes**
>
> Provide a detailed description of the bug (with live demo if possible). OR open a bug report and link it in your PR.

## Getting Started

1. **Fork the Repository:** Start by forking the repository's `"dev"` branch to your GitHub account. This creates your own copy of the project where you can make changes.

2. **Clone Your Fork:** Clone your forked repository to your local machine using Git. This allows you to work on the files locally.
   ```sh
   git clone https://github.com/yourusername/send-email.git
   ```

3. **Set Upstream Remote:** Add the original repository as an upstream remote to your local clone. This helps you to keep your fork up to date.
   ```sh
   git remote add upstream https://github.com/weaponsforge/send-email.git
   ```

## Making Changes

1. **Create a New Branch:** Always work on a new branch for your changes. This keeps your contributions organized and separate from the main branch.
   ```sh
   git checkout -b feat/your-new-feature-name
   ```

2. **Add Your Content:** Make your changes or additions to the project. If you're adding new content, ensure it's placed in the correct directory and follows intuitive naming conventions and TypeScript coding best practices and patterns described in the [CODING STYLE](/docs/CODING_STYLE.md).

   > Before commiting your changes, format your code with `"npm run lint:fix"`, and ensure all updates pass the `"npm run lint"`, `"npm run transpile:noemit"` and `"npm test"` scripts.

3. **Commit Your Changes:** After making your changes, commit them to your branch. Use clear and concise commit messages to describe your updates.
   ```sh
   git add .
   git commit -m "Add a brief description of your changes"
   ```

4. **Keep Your Fork Updated:** Regularly sync your fork's `"dev"` branch with the upstream repository to keep it up to date. This reduces potential merge conflicts.
   ```sh
   git fetch upstream
   git checkout dev
   git merge upstream/dev
   git push origin dev
   ```

## Submitting Contributions

1. **Push Your Changes:** Push your changes to your fork on GitHub.
   ```sh
   git push origin feat/your-new-feature-name
   ```

2. **Create a Pull Request (PR):** Go to the original **send-email** repository on GitHub and create a new pull request. Base your PR on your feature branch and target the `"dev"` branch of the upstream repository.

3. **Describe Your Contribution:** Provide a clear and detailed description of your pull request. Include the purpose of your changes and any other relevant information.

4. **Review and Collaboration:** Once your PR is submitted, the project maintainers will review your contributions. Be open to feedback and be ready to make additional changes if requested.

## Guidelines

1. **Quality:** Ensure your contributions are high quality, with no spelling or grammatical errors.

2. **Relevance:** Content should be relevant to mostly Node.js and TypeScript - coding structure, patterns, naming conventions, optimizations, directory/folder colocation structures and conventions, and/or usage of notable Node libraries for Node.js CLI development closely following and improving this repository's [CODING STYLE](/docs/CODING_STYLE.md).

3. **Working functionality:** For pull requests involving new features or major updates, ensure the changes are fully functional and optimized. Aim to keep PRs within **`~700` lines of code changes**, breaking them into smaller, self-contained parts when possible. PRs exceeding **`~1000+` lines** may be accepted when justified (e.g., major refactors or foundational features).

4. **Respect:** Respect the structure and formatting of the existing project. Follow the standard ESLint rules defined in its `app/eslint.config.mjs` file.

Thank you for contributing to the **send-email** repository. Your efforts help in making sending emails more accessible for everyone.
