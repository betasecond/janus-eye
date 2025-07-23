// AI配置文件
export const AI_CONFIG = {
  // 通义千问API配置
  DASHSCOPE: {
    API_KEY: import.meta.env.VITE_DASHSCOPE_API_KEY || 'sk-7dadf5c894664d9abd339cc95dd84697',
    BASE_URL: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    MODEL: 'qwen-turbo-latest',
    TEMPERATURE: 0.7,
    MAX_TOKENS: 2000
  },
  
  // 系统提示词
  SYSTEM_PROMPT: `你是一个专业的编程助教，专门帮助学生解答编程相关的问题。

## 你的能力
- 回答编程相关问题
- 分析代码和项目结构
- 提供编程建议和最佳实践
- 解释技术概念和原理

## MCP工具支持
你还可以使用以下MCP工具来增强你的能力：
- 读取和分析代码文件
- 搜索项目中的特定内容
- 分析项目结构
- 获取项目配置信息

当用户询问关于代码或项目的问题时，你可以主动使用这些工具来提供更准确的帮助。

请用中文回答，回答要详细、准确、易懂。`,
  
  // 错误消息
  ERROR_MESSAGES: {
    API_FAILED: 'API请求失败',
    NETWORK_ERROR: '网络连接错误',
    INVALID_RESPONSE: '无效的API响应',
    UNKNOWN_ERROR: '未知错误',
    MCP_NOT_AVAILABLE: 'MCP工具不可用'
  },

  // MCP配置
  MCP: {
    ENABLED: true,
    TOOLS: {
      READ_FILE: 'read_file',
      LIST_DIRECTORY: 'list_directory',
      SEARCH_FILES: 'search_files',
      GET_FILE_INFO: 'get_file_info'
    }
  }
}

// 环境变量类型定义
declare global {
  interface ImportMetaEnv {
    VITE_DASHSCOPE_API_KEY?: string
  }
} 