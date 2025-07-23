import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// MCP工具定义
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: any;
}

// MCP服务类
export class MCPService {
  private client: Client | null = null;
  private isConnected = false;
  private tools: MCPTool[] = [];

  constructor() {
    this.init();
  }

  /**
   * 初始化MCP客户端
   */
  private async init() {
    try {
      // 创建stdio传输层
      const transport = new StdioClientTransport({
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-filesystem', '--stdio'],
      });

      // 创建MCP客户端
      this.client = new Client({
        name: 'janus-eye-ai-assistant',
        version: '1.0.0',
      }, {
        capabilities: {
          tools: {},
        },
      });

      // 连接到MCP服务器
      await this.client.connect(transport);
      this.isConnected = true;

      // 获取可用工具
      await this.loadTools();

      console.log('MCP服务初始化成功');
    } catch (error) {
      console.error('MCP服务初始化失败:', error);
      this.isConnected = false;
    }
  }

  /**
   * 加载可用工具
   */
  private async loadTools() {
    if (!this.client || !this.isConnected) return;

    try {
      const tools = await this.client.listTools();
      this.tools = tools.tools.map(tool => ({
        name: tool.name,
        description: tool.description || '无描述',
        inputSchema: tool.inputSchema,
      }));

      console.log('MCP工具加载成功:', this.tools);
    } catch (error) {
      console.error('加载MCP工具失败:', error);
    }
  }

  /**
   * 获取可用工具列表
   */
  getAvailableTools(): MCPTool[] {
    return this.tools;
  }

  /**
   * 检查连接状态
   */
  isServiceConnected(): boolean {
    return this.isConnected;
  }

  /**
   * 调用MCP工具
   */
  async callTool(toolName: string, arguments_: any): Promise<any> {
    if (!this.client || !this.isConnected) {
      throw new Error('MCP服务未连接');
    }

    try {
      const request = {
        name: toolName,
        arguments: arguments_,
      };

      const response = await this.client.callTool(request);
      return response.content;
    } catch (error) {
      console.error(`调用MCP工具 ${toolName} 失败:`, error);
      throw error;
    }
  }

  /**
   * 读取文件内容
   */
  async readFile(path: string): Promise<string> {
    return this.callTool('read_file', { path });
  }

  /**
   * 列出目录内容
   */
  async listDirectory(path: string): Promise<any> {
    return this.callTool('list_directory', { path });
  }

  /**
   * 搜索文件
   */
  async searchFiles(query: string, path?: string): Promise<any> {
    return this.callTool('search_files', { query, path });
  }

  /**
   * 获取文件信息
   */
  async getFileInfo(path: string): Promise<any> {
    return this.callTool('get_file_info', { path });
  }

  /**
   * 关闭连接
   */
  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.isConnected = false;
    }
  }
}

// 创建全局MCP服务实例
export const mcpService = new MCPService(); 