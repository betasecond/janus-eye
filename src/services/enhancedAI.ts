import { getAIChatResponseStream, getAIChatResponse } from '@/api/ai';
import { mcpTools } from '@/utils/mcpTools';
import { AI_CONFIG } from '@/config/ai';

// 增强的AI聊天服务
export class EnhancedAIService {
  /**
   * 检查MCP工具是否可用
   */
  static isMCPAvailable(): boolean {
    return mcpTools.isAvailable();
  }

  /**
   * 分析用户消息，决定是否需要使用MCP工具
   */
  static async analyzeMessage(message: string): Promise<{
    needsMCP: boolean;
    context?: string;
    tools?: string[];
  }> {
    const mcpKeywords = [
      '文件', '代码', '项目', '结构', '配置', 'package.json', 'tsconfig',
      '读取', '分析', '搜索', '查看', '检查', '文件内容', '代码内容'
    ];

    const needsMCP = mcpKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );

    if (!needsMCP) {
      return { needsMCP: false };
    }

    // 根据消息内容决定使用哪些工具
    const tools: string[] = [];
    let context = '';

    if (message.includes('项目结构') || message.includes('目录')) {
      tools.push('listDirectory');
      try {
        context = await mcpTools.analyzeProjectStructure();
      } catch (error) {
        console.error('获取项目结构失败:', error);
      }
    }

    if (message.includes('package.json') || message.includes('配置')) {
      tools.push('readFile');
      try {
        context = await mcpTools.getProjectConfig();
      } catch (error) {
        console.error('获取项目配置失败:', error);
      }
    }

    if (message.includes('搜索') || message.includes('查找')) {
      tools.push('searchFiles');
    }

    if (message.includes('读取') || message.includes('查看文件')) {
      tools.push('readFile');
    }

    return { needsMCP: true, context, tools };
  }

  /**
   * 增强的AI聊天回复（支持MCP工具）
   */
  static async getEnhancedResponse(
    message: string,
    onChunk: (chunk: string) => void,
    onComplete: (fullResponse: string) => void,
    onError: (error: string) => void
  ): Promise<void> {
    try {
      // 分析消息是否需要MCP工具
      const analysis = await this.analyzeMessage(message);
      
      let enhancedMessage = message;
      
      if (analysis.needsMCP && this.isMCPAvailable()) {
        // 添加MCP上下文到消息中
        enhancedMessage = `${message}

## 项目上下文信息
${analysis.context || '正在获取项目信息...'}

请基于以上项目信息回答用户的问题。`;
      }

      // 调用AI API
      await getAIChatResponseStream(
        enhancedMessage,
        onChunk,
        onComplete,
        onError
      );
    } catch (error) {
      console.error('增强AI服务错误:', error);
      onError(error instanceof Error ? error.message : 'AI服务错误');
    }
  }

  /**
   * 执行MCP工具调用
   */
  static async executeMCPTool(toolName: string, args: any): Promise<string> {
    if (!this.isMCPAvailable()) {
      throw new Error(AI_CONFIG.ERROR_MESSAGES.MCP_NOT_AVAILABLE);
    }

    try {
      switch (toolName) {
        case 'readFile':
          return await mcpTools.readFile(args.path);
        
        case 'listDirectory':
          const result = await mcpTools.listDirectory(args.path || '.');
          return JSON.stringify(result, null, 2);
        
        case 'searchFiles':
          const searchResult = await mcpTools.searchFiles(args.query, args.path);
          return JSON.stringify(searchResult, null, 2);
        
        case 'getFileInfo':
          const fileInfo = await mcpTools.getFileInfo(args.path);
          return JSON.stringify(fileInfo, null, 2);
        
        case 'analyzeProject':
          return await mcpTools.analyzeProjectStructure();
        
        case 'getProjectConfig':
          return await mcpTools.getProjectConfig();
        
        default:
          throw new Error(`未知的MCP工具: ${toolName}`);
      }
    } catch (error) {
      throw new Error(`MCP工具执行失败: ${error}`);
    }
  }

  /**
   * 获取MCP工具状态信息
   */
  static getMCPStatus(): {
    available: boolean;
    tools: any[];
    error?: string;
  } {
    try {
      const available = this.isMCPAvailable();
      const tools = available ? mcpTools.getAvailableTools() : [];
      
      return {
        available,
        tools,
      };
    } catch (error) {
      return {
        available: false,
        tools: [],
        error: error instanceof Error ? error.message : '未知错误'
      };
    }
  }
}

// 导出增强AI服务实例
export const enhancedAI = EnhancedAIService; 