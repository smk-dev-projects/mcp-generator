# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Add HTTP/SSE server template option
- Add more tool templates (database, API integrations)
- Add custom template support
- Add plugin architecture for community templates

## [1.0.0] - 2026-03-28

### Added
- **Interactive CLI Wizard** - Guided setup with beautiful prompts using @clack/prompts
- **Multiple Templates**
  - Basic Server template - Minimal MCP server with stdio transport
  - Server with Tools template - Pre-configured with example tools
- **Customizable Features**
  - Structured logging support
  - Input validation with Zod schemas
  - TypeScript configuration
- **CLI Commands**
  - `create [project-name]` - Create new MCP server with interactive wizard
  - `list-templates` - Display available templates
  - `--version` - Show version information
  - `--help` - Show help documentation
- **Non-Interactive Mode** - Support for CI/CD with CLI flags
- **Development Tools**
  - ESLint configuration for code quality
  - Prettier for code formatting
  - Jest for unit testing
  - TypeScript for type safety
- **GitHub Actions CI** - Automated testing on Node.js 18.x, 20.x, 22.x
- **Comprehensive Documentation**
  - Professional README with badges
  - CONTRIBUTING.md with development guidelines
  - CODE_OF_CONDUCT.md (Contributor Covenant 2.1)
  - SECURITY.md with vulnerability reporting
  - Issue and PR templates

### Technical Details
- Built with Commander.js for CLI framework
- Handlebars for template rendering
- Ora for spinner animations
- Chalk for terminal colors
- Full TypeScript support
- 100% test coverage on core generator logic

### Fixed
- Removed unused `isNonInteractive` function to resolve lint errors

### Changed
- Renamed development branch from `mcp-server-generator-tool-development-aaded` to `develop`
- Merged complete CLI implementation into main branch

## [0.1.0] - 2026-03-27

### Added
- Initial project structure
- MIT License
- Basic README

---

## Version History

- **1.0.0** - Initial production release with complete CLI tool
- **0.1.0** - Project initialization

---

For more information about releases, see the [GitHub Releases](https://github.com/smk-dev-projects/mcp-generator/releases) page.
