import { TemplateDefinition } from '../../types.js';

/**
 * MCP Server with Tools Template
 * 
 * A comprehensive MCP server template that includes pre-configured tools.
 * This template demonstrates how to implement and register custom tools
 * that can be invoked by MCP clients (AI applications).
 * 
 * Key MCP patterns:
 * - Tool registration with Zod schema validation
 * - Tool implementation with proper error handling
 * - Multiple tool examples for different use cases
 */
export const toolsTemplate: TemplateDefinition = {
  name: 'Server with Tools',
  description: 'MCP server with custom tool definitions',
  serverType: 'stdio',
  features: ['logging'],
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
 * {{projectName}} - MCP Server with Tools
 * 
 * This MCP server demonstrates how to register and implement custom tools.
 * Tools are functions that can be called by MCP clients (AI applications)
 * to perform specific actions or retrieve information.
 * 
 * @see https://modelcontextprotocol.io/
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { exampleTool } from './tools/example-tool.js';
import { logger } from './utils/logger.js';

// Create MCP server instance with metadata
const server = new McpServer({
  name: '{{projectName}}',
  version: '{{version}}',
});

/**
 * Register server capabilities
 * 
 * We're declaring that this server supports tools.
 * The MCP SDK will handle the protocol details automatically.
 */
server.server.registerCapabilities({
  tools: {},
});

/**
 * Register all tools with the server
 * 
 * Each tool must have:
 * - A unique name
 * - A description explaining what it does
 * - A Zod schema defining its input parameters
 * - An async function implementing the tool logic
 */
function registerTools() {
  // Example: Calculator tool
  server.tool(
    'calculate',
    'Perform basic arithmetic calculations',
    {
      operation: z.enum(['add', 'subtract', 'multiply', 'divide']).describe('The arithmetic operation to perform'),
      a: z.number().describe('First operand'),
      b: z.number().describe('Second operand'),
    },
    async ({ operation, a, b }) => {
      logger.info(\`Calculating: \${a} \${operation} \${b}\`);
      
      let result: number;
      switch (operation) {
        case 'add':
          result = a + b;
          break;
        case 'subtract':
          result = a - b;
          break;
        case 'multiply':
          result = a * b;
          break;
        case 'divide':
          if (b === 0) {
            return {
              content: [{ type: 'text', text: 'Error: Division by zero' }],
              isError: true,
            };
          }
          result = a / b;
          break;
        default:
          return {
            content: [{ type: 'text', text: \`Unknown operation: \${operation}\` }],
            isError: true,
          };
      }
      
      logger.info(\`Result: \${result}\`);
      
      return {
        content: [
          {
            type: 'text',
            text: \`\${a} \${operation} \${b} = \${result}\`,
          },
        ],
      };
    }
  );

  // Example: Echo tool (simple string manipulation)
  server.tool(
    'echo',
    'Echo back a message with optional transformation',
    {
      message: z.string().describe('The message to echo'),
      uppercase: z.boolean().optional().default(false).describe('Convert to uppercase'),
    },
    async ({ message, uppercase }) => {
      const response = uppercase ? message.toUpperCase() : message;
      logger.info(\`Echoing message: \${response}\`);
      
      return {
        content: [
          {
            type: 'text',
            text: response,
          },
        ],
      };
    }
  );

  // Register additional tools from separate modules
  exampleTool.register(server);
  
  logger.info('All tools registered successfully');
}

/**
 * Start the server using stdio transport
 */
async function main() {
  try {
    registerTools();
    
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    logger.info('{{projectName}} MCP server running on stdio');
    logger.info('Available tools: calculate, echo, example-tool');
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
}

main();
`,
    },
    {
      path: 'src/tools/example-tool.ts',
      content: `/**
 * Example Tool Module
 * 
 * This demonstrates how to organize tools in separate modules
 * for better code organization and reusability.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { logger } from '../utils/logger.js';

/**
 * Example tool that processes text
 * 
 * @param server - The MCP server instance to register with
 */
export const exampleTool = {
  name: 'example-tool',
  description: 'An example tool that demonstrates MCP tool registration',
  
  register(server: McpServer): void {
    server.tool(
      this.name,
      this.description,
      {
        text: z.string().describe('Text to process'),
        action: z.enum(['reverse', 'uppercase', 'lowercase', 'length']).describe('Action to perform on the text'),
      },
      async ({ text, action }) => {
        logger.info(\`Processing text with action: \${action}\`);
        
        let result: string | number;
        
        switch (action) {
          case 'reverse':
            result = text.split('').reverse().join('');
            break;
          case 'uppercase':
            result = text.toUpperCase();
            break;
          case 'lowercase':
            result = text.toLowerCase();
            break;
          case 'length':
            result = text.length;
            break;
          default:
            return {
              content: [{ type: 'text', text: \`Unknown action: \${action}\` }],
              isError: true,
            };
        }
        
        return {
          content: [
            {
              type: 'text',
              text: \`Result: \${result}\`,
            },
          ],
        };
      }
    );
    
    logger.info('Example tool registered');
  },
};
`,
    },
    {
      path: 'src/utils/logger.ts',
      content: `/**
 * Simple Logger Utility
 * 
 * Provides structured logging for the MCP server.
 * Logs are written to stderr to avoid interfering with stdio transport.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

class Logger {
  private minLevel: LogLevel = 'info';
  
  private levelPriority: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };
  
  setLevel(level: LogLevel): void {
    this.minLevel = level;
  }
  
  private shouldLog(level: LogLevel): boolean {
    return this.levelPriority[level] >= this.levelPriority[this.minLevel];
  }
  
  private formatEntry(entry: LogEntry): string {
    const dataStr = entry.data ? \` \${JSON.stringify(entry.data)}\` : '';
    return \`[\${entry.timestamp}] [\${entry.level.toUpperCase()}] \${entry.message}\${dataStr}\`;
  }
  
  debug(message: string, data?: unknown): void {
    if (this.shouldLog('debug')) {
      this.log('debug', message, data);
    }
  }
  
  info(message: string, data?: unknown): void {
    if (this.shouldLog('info')) {
      this.log('info', message, data);
    }
  }
  
  warn(message: string, data?: unknown): void {
    if (this.shouldLog('warn')) {
      this.log('warn', message, data);
    }
  }
  
  error(message: string, data?: unknown): void {
    if (this.shouldLog('error')) {
      this.log('error', message, data);
    }
  }
  
  private log(level: LogLevel, message: string, data?: unknown): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
    
    // Write to stderr to avoid interfering with stdio transport
    console.error(this.formatEntry(entry));
  }
}

export const logger = new Logger();
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

This MCP server includes pre-configured tools that can be used by AI applications.

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

## Available Tools

### calculate

Perform basic arithmetic calculations.

**Parameters:**
- \`operation\`: add, subtract, multiply, or divide
- \`a\`: First operand (number)
- \`b\`: Second operand (number)

**Example:**
\`\`\`json
{
  "name": "calculate",
  "arguments": {
    "operation": "add",
    "a": 5,
    "b": 3
  }
}
\`\`\`

### echo

Echo back a message with optional transformation.

**Parameters:**
- \`message\`: The message to echo
- \`uppercase\`: Convert to uppercase (optional, default: false)

### example-tool

Process text with various transformations.

**Parameters:**
- \`text\`: Text to process
- \`action\`: reverse, uppercase, lowercase, or length

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

## Adding New Tools

1. Create a new file in \`src/tools/\`
2. Define your tool with a Zod schema for validation
3. Register it in \`src/index.ts\`

Example:

\`\`\`typescript
server.tool(
  'my-tool',
  'Description of what my tool does',
  {
    param1: z.string().describe('Parameter description'),
  },
  async ({ param1 }) => {
    // Tool implementation
    return {
      content: [{ type: 'text', text: 'Result' }],
    };
  }
);
\`\`\`

## License

MIT
`,
    },
  ],
};
