#!/usr/bin/env node

/**
 * MCP Generator CLI - Main Entry Point
 *
 * This CLI tool generates Model Context Protocol (MCP) server boilerplate.
 * MCP is a protocol for AI applications to interact with external tools and data sources.
 *
 * @see https://modelcontextprotocol.io/
 */

import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import { listTemplatesCommand } from './commands/list-templates.js';
import { version as pkgVersion } from '../package.json';

const program = new Command();

program
  .name('mcp-generator')
  .description('Generate Model Context Protocol (MCP) server boilerplate')
  .version(pkgVersion);

// Register commands
createCommand(program);
listTemplatesCommand(program);

program.parse(process.argv);
