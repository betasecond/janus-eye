import { browserMCPService } from '@/services/browserMCP';

// MCP工具管理器
export class MCPToolsManager {
  /**
   * 检查MCP服务是否可用
   */
  static isAvailable(): boolean {
    return browserMCPService.isServiceConnected();
  }

  /**
   * 获取可用工具列表
   */
  static getAvailableTools() {
    return browserMCPService.getAvailableTools();
  }

  /**
   * 读取文件内容
   */
  static async readFile(path: string): Promise<string> {
    try {
      const content = await browserMCPService.readFile(path);
      return content;
    } catch (error) {
      throw new Error(`读取文件失败: ${error}`);
    }
  }

  /**
   * 列出目录内容
   */
  static async listDirectory(path: string): Promise<any> {
    try {
      const result = await browserMCPService.listDirectory(path);
      return result;
    } catch (error) {
      throw new Error(`列出目录失败: ${error}`);
    }
  }

  /**
   * 搜索文件
   */
  static async searchFiles(query: string, path?: string): Promise<any> {
    try {
      const result = await browserMCPService.searchFiles(query, path);
      return result;
    } catch (error) {
      throw new Error(`搜索文件失败: ${error}`);
    }
  }

  /**
   * 获取文件信息
   */
  static async getFileInfo(path: string): Promise<any> {
    try {
      const result = await browserMCPService.getFileInfo(path);
      return result;
    } catch (error) {
      throw new Error(`获取文件信息失败: ${error}`);
    }
  }

  /**
   * 分析项目结构
   */
  static async analyzeProjectStructure(rootPath: string = '.'): Promise<string> {
    try {
      const structure = await this.listDirectory(rootPath);
      return JSON.stringify(structure, null, 2);
    } catch (error) {
      throw new Error(`分析项目结构失败: ${error}`);
    }
  }

  /**
   * 读取代码文件并分析
   */
  static async analyzeCodeFile(filePath: string): Promise<string> {
    try {
      const content = await this.readFile(filePath);
      const info = await this.getFileInfo(filePath);
      
      return `文件: ${filePath}
大小: ${info.size} 字节
修改时间: ${info.modified}
内容:
\`\`\`
${content}
\`\`\``;
    } catch (error) {
      throw new Error(`分析代码文件失败: ${error}`);
    }
  }

  /**
   * 搜索代码中的特定内容
   */
  static async searchInCode(query: string, path?: string): Promise<string> {
    try {
      const results = await this.searchFiles(query, path);
      return JSON.stringify(results, null, 2);
    } catch (error) {
      throw new Error(`搜索代码失败: ${error}`);
    }
  }

  /**
   * 获取项目配置文件
   */
  static async getProjectConfig(): Promise<string> {
    try {
      const configFiles = ['package.json', 'tsconfig.json', 'vite.config.ts', '.env'];
      let configInfo = '';

      for (const file of configFiles) {
        try {
          const content = await this.readFile(file);
          configInfo += `\n## ${file}\n\`\`\`\n${content}\n\`\`\`\n`;
        } catch (error) {
          // 文件不存在，跳过
        }
      }

      return configInfo || '未找到项目配置文件';
    } catch (error) {
      throw new Error(`获取项目配置失败: ${error}`);
    }
  }
}

// 导出工具管理器实例
export const mcpTools = MCPToolsManager; 