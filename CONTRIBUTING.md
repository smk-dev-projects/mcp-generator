# Contributing to MCP Generator

First off, thank you for considering contributing to MCP Generator! It's people like you that make the MCP community such a great community.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed and what behavior you expected**
* **Include error messages and stack traces if applicable**
* **Include your environment details** (Node.js version, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List some examples of how this enhancement would be used**

### Pull Requests

* Fill in the required template
* Follow the project's coding conventions
* Include tests when adding new features
* Update documentation when necessary
* Keep pull requests focused on a single feature or fix
* Reference relevant issues in the pull request description

## Development Setup

### Prerequisites

* Node.js >= 18.0.0
* npm or yarn

### Installation

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mcp-generator.git
   ```
3. Navigate to the project directory:
   ```bash
   cd mcp-generator
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Link the package locally:
   ```bash
   npm link
   ```

### Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/issue-number-description
   ```

2. Make your changes and test thoroughly

3. Run linting and tests:
   ```bash
   npm run lint
   npm test
   ```

4. Commit your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Open a Pull Request

## Coding Guidelines

### Code Style

* Use TypeScript for all new code
* Follow the existing code style in the project
* Use meaningful variable and function names
* Keep functions small and focused
* Add comments for complex logic (but prefer self-documenting code)

### Project Structure

```
mcp-generator/
├── src/
│   ├── commands/      # CLI command implementations
│   ├── templates/     # MCP server templates
│   ├── utils/         # Utility functions
│   ├── index.ts       # Main entry point
│   └── types.ts       # TypeScript type definitions
├── tests/             # Test files
└── docs/              # Documentation
```

### Testing

* Write tests for all new features
* Ensure all tests pass before submitting PR
* Aim for good test coverage on critical paths
* Use Jest for testing

### Linting & Formatting

This project uses:
* **ESLint** for code linting
* **Prettier** for code formatting

Run before committing:
```bash
npm run lint
npm run format
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

* `feat`: A new feature
* `fix`: A bug fix
* `docs`: Documentation only changes
* `style`: Changes that do not affect the meaning (formatting, etc.)
* `refactor`: A code change that neither fixes a bug nor adds a feature
* `perf`: A code change that improves performance
* `test`: Adding missing tests or correcting existing tests
* `chore`: Changes to the build process or auxiliary tools

### Examples

```
feat: add HTTP server template
fix: resolve issue with file generation
docs: update README with installation instructions
refactor: simplify template rendering logic
test: add tests for generator utility functions
```

## Release Process

Releases are managed by the maintainers. When your contribution is included in a release, you'll be credited in the release notes.

## Questions?

Feel free to open an issue with the "question" label if you have any questions about contributing.

## Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute.
