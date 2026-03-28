import { TemplateDefinition } from '../../types.js';

/**
 * Basic MCP Server Template
 * 
 * A minimal MCP server implementation using stdio transport.
 * This template provides the foundation for building MCP-compliant servers.
 * 
 * Key MCP patterns:
 * - Server initialization with capabilities
 * - Request/Response handling via stdio
 * - Resource and tool registration (empty by default)
 */
export const basicTemplate: TemplateDefinition = {
  name: 'Basic Server',
  description: 'Minimal MCP server with stdio transport',
  serverType: 'stdio',
  features: [],
  files: [
    {
      path: 'package.json',
      content: `{
  "name": "{{projectName}}",
  "version": "{{version}}",
  "description": "{{description}}",
  "main": "dist/index.js",
  "type": "module",
  "bin": {
    "{{projectName}}": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx src/index.ts",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "typescript": "^5.3.3",
    "tsx": "^4.7.0"
  }
}
`,
    },
    {
      path: 'tsconfig.json',
      content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
`,
    },
    {
      path: 'src/index.ts',
      content: `/**
 * {{projectName}} - MCP Server
 * 
 * This is a basic MCP server implementation using stdio transport.
 * The Model Context Protocol (MCP) allows AI applications to interact
 * with external tools, resources, and prompts.
 * 
 * @see https://modelcontextprotocol.io/
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Create MCP server instance with metadata
const server = new McpServer({
  name: '{{projectName}}',
  version: '{{version}}',
});

/**
 * Register server capabilities
 * 
 * MCP servers can expose:
 * - Tools: Functions that can be called by the client
 * - Resources: Data that can be read by the client
 * - Prompts: Pre-defined prompt templates
 */
server.server.registerCapabilities({
  tools: {},
  resources: {},
  prompts: {},
});

/**
 * Example: Register a simple tool
 * 
 * Tools are functions that can be invoked by MCP clients.
 * They receive arguments and return results.
 */
// server.tool(
//   'example-tool',
//   'An example tool that demonstrates MCP tool registration',
//   {
//     message: z.string().describe('A message to process'),
//   },
//   async ({ message }) => {
//     return {
//       content: [
//         {
//           type: 'text',
//           text: \`Processed: \${message}\`,
//         },
//       ],
//     };
//   }
// );

/**
 * Start the server using stdio transport
 * 
 * Stdio transport uses standard input/output for communication,
 * making it ideal for local development and CLI integration.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('{{projectName}} MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
`,
    },
    {
      path: '.gitignore',
      content: `node_modules
dist
.env
*.log
.DS_Store
coverage
`,
    },
    {
      path: 'README.md',
      content: `# {{projectName}}

{{description}}

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn

## Installation

\`\`\`bash
npm install
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Usage

### Development

\`\`\`bash
npm run dev
\`\`\`

### Production

\`\`\`bash
npm run build
npm start
\`\`\`

## MCP Configuration

To use this server with an MCP client, configure it in your client's settings:

\`\`\`json
{
  "mcpServers": {
    "{{projectName}}": {
      "command": "node",
      "args": ["path/to/{{projectName}}/dist/index.js"]
    }
  }
}
\`\`\`

## License

MIT
`,
    },
  ],
};
