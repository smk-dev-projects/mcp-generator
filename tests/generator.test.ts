import { generateServer } from '../src/utils/generator.js';
import { ServerConfig } from '../src/types.js';

/**
 * Unit tests for the MCP server generator
 */
describe('Generator', () => {
  describe('generateServer', () => {
    it('should generate a basic MCP server', async () => {
      const config: ServerConfig = {
        name: 'test-server',
        template: 'basic',
        serverType: 'stdio',
        features: [],
        force: true,
      };

      const targetDir = '/tmp/test-mcp-server-basic';

      await expect(generateServer(config, targetDir)).resolves.not.toThrow();
    });

    it('should generate an MCP server with tools', async () => {
      const config: ServerConfig = {
        name: 'test-server-tools',
        template: 'tools',
        serverType: 'stdio',
        features: ['logging'],
        force: true,
      };

      const targetDir = '/tmp/test-mcp-server-tools';

      await expect(generateServer(config, targetDir)).resolves.not.toThrow();
    });

    it('should throw error for unknown template', async () => {
      const config: ServerConfig = {
        name: 'test-server-invalid',
        template: 'invalid' as any,
        serverType: 'stdio',
        features: [],
        force: true,
      };

      const targetDir = '/tmp/test-mcp-server-invalid';

      await expect(generateServer(config, targetDir)).rejects.toThrow(
        'Unknown template: invalid'
      );
    });

    it('should create directory structure for tools template', async () => {
      const config: ServerConfig = {
        name: 'test-server-structure',
        template: 'tools',
        serverType: 'stdio',
        features: ['logging'],
        force: true,
      };

      const targetDir = '/tmp/test-mcp-server-structure';

      await generateServer(config, targetDir);

      // Verify that the generated files exist
      const fs = await import('fs');
      const path = await import('path');

      expect(fs.existsSync(path.join(targetDir, 'package.json'))).toBe(true);
      expect(fs.existsSync(path.join(targetDir, 'src', 'index.ts'))).toBe(true);
      expect(fs.existsSync(path.join(targetDir, 'src', 'tools'))).toBe(true);
      expect(fs.existsSync(path.join(targetDir, 'src', 'utils'))).toBe(true);
    });

    it('should render template placeholders correctly', async () => {
      const config: ServerConfig = {
        name: 'my-custom-server',
        template: 'basic',
        serverType: 'stdio',
        features: [],
        force: true,
      };

      const targetDir = '/tmp/test-mcp-render';

      await generateServer(config, targetDir);

      const fs = await import('fs');
      const path = await import('path');

      const packageJsonPath = path.join(targetDir, 'package.json');
      const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');

      expect(packageJsonContent).toContain('my-custom-server');
      expect(packageJsonContent).not.toContain('{{projectName}}');
    });
  });
});
