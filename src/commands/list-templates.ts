import { Command } from 'commander';
import chalk from 'chalk';
import * as clack from '@clack/prompts';
import { TEMPLATES } from '../templates/index.js';

/**
 * List templates command - Show available MCP server templates
 */
export function listTemplatesCommand(program: Command) {
  program
    .command('list-templates')
    .description('List all available MCP server templates')
    .action(() => {
      listTemplates();
    });
}

/**
 * Display all available templates with descriptions
 */
function listTemplates() {
  clack.intro(chalk.blue('📋 Available MCP Server Templates'));

  console.log('\n');

  for (const [key, template] of Object.entries(TEMPLATES)) {
    console.log(chalk.bold.cyan(`  ${template.name}`));
    console.log(chalk.gray(`    ${template.description}`));
    console.log(chalk.gray(`    Type: ${template.serverType}`));
    console.log(chalk.gray(`    Features: ${template.features.join(', ') || 'none'}`));
    console.log('');
  }

  console.log(chalk.green('\n💡 Use --template flag to select a specific template:'));
  console.log(chalk.cyan('   mcp-generator create my-server --template tools\n'));

  clack.outro(chalk.green('Done!'));
}
