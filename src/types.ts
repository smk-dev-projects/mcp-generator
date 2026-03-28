/**
 * Type definitions for MCP Generator
 */

export type TemplateType = 'basic' | 'tools';

export type ServerType = 'stdio' | 'http';

export type Feature = 'logging' | 'validation' | 'typescript';

export interface ServerConfig {
  name: string;
  template: TemplateType;
  serverType: ServerType;
  features: Feature[];
  force: boolean;
}

export interface TemplateDefinition {
  name: string;
  description: string;
  serverType: ServerType;
  features: Feature[];
  files: TemplateFile[];
}

export interface TemplateFile {
  path: string;
  content: string;
  isBinary?: boolean;
}

export interface RenderContext {
  projectName: string;
  description: string;
  serverType: ServerType;
  hasTools: boolean;
  hasLogging: boolean;
  hasValidation: boolean;
  isTypeScript: boolean;
  author: string;
  version: string;
}
