import { Command } from 'commander';
import * as clack from '@clack/prompts';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs';
import { generateServer } from '../utils/generator.js';
import { TemplateType, ServerConfig, Feature } from '../types.js';

interface CreateOptions {
  template?: string;
  serverType?: string;
  features?: string;
  force?: boolean;
}

/**
 * Check if running in non-interactive mode (CI or with all flags provided)
 */
function isNonInteractive(options: CreateOptions, projectName?: string): boolean {
  return !!(projectName && options.template && options.serverType && options.features !== undefined);
}

/**
 * Create command - Interactive wizard to generate a new MCP server
 */
export function createCommand(program: Command) {
  program
    .command('create [project-name]')
    .description('Create a new MCP server project')
    .option('-t, --template <type>', 'Template type (basic or tools)', 'basic')
    .option('-s, --server-type <type>', 'Server type (stdio or http)', 'stdio')
    .option('-f, --features <features>', 'Comma-separated features: logging,validation,typescript', '')
    .option('--force', 'Overwrite existing directory', false)
    .action(async (projectName: string | undefined, options: CreateOptions) => {
      await runCreateWizard(projectName, options);
    });
}

/**
 * Run the interactive creation wizard
 */
async function runCreateWizard(projectName: string | undefined, options: CreateOptions) {
  clack.intro(chalk.green('🚀 MCP Server Generator'));

  const config: ServerConfig = {
    name: '',
    template: (options.template || 'basic') as TemplateType,
    serverType: (options.serverType || 'stdio') as 'stdio' | 'http',
    features: [],
    force: options.force || false,
  };

  // Parse features from command line if provided
  if (options.features && options.features.trim() !== '') {
    config.features = options.features
      .split(',')
      .map((f: string) => f.trim() as Feature)
      .filter((f: string) => f.length > 0);
  }

  // Get project name if not provided
  if (!projectName) {
    const nameInput = await clack.text({
      message: 'What is your MCP server name?',
      placeholder: 'my-mcp-server',
      validate: (value): string | void => {
        if (!value || value.length === 0) {
          return 'Project name is required';
        }
        if (!/^[a-z0-9-]+$/.test(value)) {
          return 'Project name can only contain lowercase letters, numbers, and hyphens';
        }
      },
    });

    if (clack.isCancel(nameInput)) {
      clack.cancel('Operation cancelled.');
      process.exit(0);
    }

    config.name = nameInput;
  } else {
    config.name = projectName;
  }

  // Get template type if not provided via flag
  if (!options.template) {
    const templateSelect = await clack.select({
      message: 'Choose a template:',
      options: [
        {
          value: 'basic',
          label: 'Basic Server',
          hint: 'Minimal MCP server with stdio transport',
        },
        {
          value: 'tools',
          label: 'Server with Tools',
          hint: 'MCP server with custom tool definitions',
        },
      ],
      initialValue: config.template,
    });

    if (clack.isCancel(templateSelect)) {
      clack.cancel('Operation cancelled.');
      process.exit(0);
    }

    config.template = templateSelect as TemplateType;
  }

  // Get server type if not provided via flag
  if (!options.serverType) {
    const serverTypeSelect = await clack.select({
      message: 'Choose server transport type:',
      options: [
        {
          value: 'stdio',
          label: 'Stdio',
          hint: 'Standard input/output (recommended for local)',
        },
        {
          value: 'http',
          label: 'HTTP',
          hint: 'HTTP/SSE transport (for remote connections)',
        },
      ],
      initialValue: config.serverType,
    });

    if (clack.isCancel(serverTypeSelect)) {
      clack.cancel('Operation cancelled.');
      process.exit(0);
    }

    config.serverType = serverTypeSelect as 'stdio' | 'http';
  }

  // Ask about additional features (only if not specified via flag)
  const hasFeaturesFromCli = options.features && options.features.trim() !== '';
  if (!hasFeaturesFromCli) {
    const featuresSelect = await clack.multiselect({
      message: 'Select additional features:',
      options: [
        {
          value: 'logging',
          label: 'Logging',
          hint: 'Add structured logging support',
        },
        {
          value: 'validation',
          label: 'Input Validation',
          hint: 'Add Zod schema validation',
        },
        {
          value: 'typescript',
          label: 'TypeScript',
          hint: 'Include TypeScript configuration',
        },
      ],
      required: false,
    });

    if (clack.isCancel(featuresSelect)) {
      clack.cancel('Operation cancelled.');
      process.exit(0);
    }

    config.features = Array.isArray(featuresSelect) ? (featuresSelect as Feature[]) : [];
  }
  // If features were provided via CLI, they're already set above

  // Check if directory exists
  const targetDir = path.join(process.cwd(), config.name);
  if (fs.existsSync(targetDir) && !config.force) {
    const overwrite = await clack.confirm({
      message: `Directory "${config.name}" already exists. Overwrite?`,
    });

    if (clack.isCancel(overwrite) || !overwrite) {
      clack.cancel('Operation cancelled.');
      process.exit(0);
    }

    config.force = true;
  }

  // Generate the server
  const spinner = ora('Generating MCP server...').start();

  try {
    await generateServer(config, targetDir);
    spinner.succeed('MCP server generated successfully!');

    clack.outro(
      chalk.green(`
✅ Your MCP server is ready!

Next steps:
  ${chalk.cyan(`cd ${config.name}`)}
  ${chalk.cyan('npm install')}
  ${chalk.cyan('npm run dev')}

For more information, visit: https://github.com/smk-dev-projects/mcp-generator
`)
    );
  } catch (error) {
    spinner.fail('Failed to generate MCP server');
    clack.log.error(error instanceof Error ? error.message : 'Unknown error occurred');
    process.exit(1);
  }
}
