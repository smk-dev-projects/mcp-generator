import { TemplateDefinition } from '../types.js';
import { basicTemplate } from './basic.js';
import { toolsTemplate } from './tools.js';

/**
 * Registry of all available MCP server templates
 * 
 * Each template provides a complete boilerplate for a specific type of MCP server.
 * Templates include all necessary files: package.json, TypeScript config, source files, etc.
 */
export const TEMPLATES: Record<string, TemplateDefinition> = {
  basic: basicTemplate,
  tools: toolsTemplate,
};

/**
 * Get all available template names
 */
export function getTemplateNames(): string[] {
  return Object.keys(TEMPLATES);
}

/**
 * Get a template by name
 * 
 * @param name - Template name
 * @returns Template definition or undefined if not found
 */
export function getTemplate(name: string): TemplateDefinition | undefined {
  return TEMPLATES[name];
}
