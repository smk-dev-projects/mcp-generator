# MCP Generator

<div align="center">

![npm version](https://img.shields.io/npm/v/mcp-generator?style=for-the-badge&logo=npm)
![license](https://img.shields.io/github/license/smk-dev-projects/mcp-generator?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/smk-dev-projects/mcp-generator/ci.yml?style=for-the-badge&logo=github)

**Generate production-ready Model Context Protocol (MCP) servers in seconds**

[Installation](#-installation) • [Usage](#-usage) • [Templates](#-templates) • [Contributing](#-contributing)

</div>

---

## 🚀 Overview

`mcp-generator` is a CLI tool that helps developers quickly scaffold [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server boilerplate. Whether you're building AI integrations, custom tools, or resource providers, this generator gets you started with best practices and clean code structure.

### Why MCP?

The Model Context Protocol is an open standard that enables AI applications to interact with external tools, resources, and data sources. By creating an MCP server, you can:

- **Extend AI capabilities** with custom tools
- **Connect to external APIs** and databases
- **Provide structured data** to AI models
- **Build reusable integrations** for multiple AI clients

### Why MCP Generator?

- ⚡ **Save Time** - Go from idea to working MCP server in under 60 seconds
- 🎯 **Best Practices** - Built-in patterns for error handling, logging, and structure
- 🔧 **Customizable** - Choose features and templates that fit your needs
- 📚 **Well Documented** - Generated code includes helpful comments and examples

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Interactive CLI** | Beautiful guided setup with intuitive prompts |
| 📦 **Multiple Templates** | Choose from Basic Server or Server with Tools |
| 🔧 **Customizable** | Add logging, validation, TypeScript support |
| 🚀 **Production Ready** | Proper error handling and project structure |
| 📝 **Well Documented** | Generated code includes helpful comments |
| ✅ **Tested** | Unit tests included for generator logic |

---

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**

---

## 🛠️ Installation

### Global Installation (Recommended)

```bash
npm install -g mcp-generator
```

### Local Installation

```bash
npm install mcp-generator
```

### From Source

```bash
git clone https://github.com/smk-dev-projects/mcp-generator.git
cd mcp-generator
npm install
npm run build
npm link
```

---

## 💡 Usage

### Quick Start

```bash
# Interactive mode (recommended for first-time users)
mcp-generator create my-mcp-server

# Or use shorthand
mcp-gen create my-mcp-server
```

### Non-Interactive Mode (CI/CD)

```bash
# Create a basic server
mcp-generator create my-server --template basic --server-type stdio

# Create a server with tools
mcp-generator create my-tools-server --template tools --features logging,validation

# Force overwrite existing directory
mcp-generator create my-server --force
```

### Available Commands

| Command | Description |
|---------|-------------|
| `create [project-name]` | Create a new MCP server project |
| `list-templates` | Display all available templates |
| `--version` | Show the current version |
| `--help` | Show help information |

#### Create Command Options

```bash
-t, --template <type>       Template type: basic or tools (default: basic)
-s, --server-type <type>    Server transport: stdio or http (default: stdio)
-f, --features <features>   Comma-separated: logging,validation,typescript
--force                     Overwrite existing directory
```

---

## 📁 Project Structure

When you generate a new MCP server, you'll get:

```
my-mcp-server/
├── src/
│   ├── index.ts              # Main server entry point
│   ├── tools/                # Tool implementations (tools template)
│   │   └── example-tool.ts
│   └── utils/                # Utilities (if logging enabled)
│       └── logger.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## 🎨 Templates

### Basic Server

A minimal MCP server with stdio transport.

**Perfect for:**
- Learning MCP fundamentals
- Simple resource providers
- Custom integrations

**Includes:**
- ✅ Basic server setup with stdio transport
- ✅ Capability registration
- ✅ Example tool (commented out)
- ✅ TypeScript configuration

### Server with Tools

A comprehensive template with pre-configured tools.

**Perfect for:**
- Production-ready tool servers
- Demonstrating MCP patterns
- Quick prototyping

**Includes:**
- ✅ Multiple example tools (calculate, echo, text processing)
- ✅ Structured logging utility
- ✅ Modular tool organization
- ✅ Comprehensive README with examples

---

## 🔌 MCP Configuration

After generating your server, configure it in your MCP client:

### Standard Configuration

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "node",
      "args": ["/path/to/my-mcp-server/dist/index.js"]
    }
  }
}
```

### Claude Desktop Configuration

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "node",
      "args": ["/path/to/my-mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

---

## 🧪 Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
npm run test:watch  # Watch mode
```

### Linting & Formatting

```bash
npm run lint
npm run lint:fix
npm run format
```

### Local Development

```bash
npm run dev  # Run with ts-node
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and descriptive

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) - The protocol specification
- [Anthropic](https://anthropic.com) - For creating the MCP standard
- [@clack/prompts](https://github.com/natemoo-re/clack) - Beautiful CLI prompts
- [Commander.js](https://github.com/tj/commander.js) - CLI framework

---

## 📞 Support

| Resource | Link |
|----------|------|
|  Issues | [GitHub Issues](https://github.com/smk-dev-projects/mcp-generator/issues) |
| 💬 Discussions | [GitHub Discussions](https://github.com/smk-dev-projects/mcp-generator/discussions) |
| 📚 Documentation | [MCP Specification](https://modelcontextprotocol.io/docs) |

---

## 🌟 Show Your Support

If you find this tool helpful, please consider:

- ⭐ Starring this repository
- 📢 Sharing with your team
- 🐛 Reporting bugs and suggesting features
- 💡 Contributing improvements

---

<div align="center">

**Built with ❤️ for the AI developer community**

[Report Bug](https://github.com/smk-dev-projects/mcp-generator/issues) · [Request Feature](https://github.com/smk-dev-projects/mcp-generator/issues)

</div>
