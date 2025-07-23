// 浏览器兼容的MCP服务
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: any;
}

// 浏览器MCP服务类
export class BrowserMCPService {
  private isConnected = false;
  private tools: MCPTool[] = [];

  constructor() {
    this.init();
  }

  /**
   * 初始化浏览器MCP服务
   */
  private async init() {
    try {
      // 在浏览器环境中，我们使用模拟的工具
      this.tools = [
        {
          name: 'read_file',
          description: '读取文件内容',
          inputSchema: { type: 'object', properties: { path: { type: 'string' } } }
        },
        {
          name: 'list_directory',
          description: '列出目录内容',
          inputSchema: { type: 'object', properties: { path: { type: 'string' } } }
        },
        {
          name: 'search_files',
          description: '搜索文件',
          inputSchema: { type: 'object', properties: { query: { type: 'string' }, path: { type: 'string' } } }
        },
        {
          name: 'get_file_info',
          description: '获取文件信息',
          inputSchema: { type: 'object', properties: { path: { type: 'string' } } }
        }
      ];

      this.isConnected = true;
      console.log('浏览器MCP服务初始化成功');
    } catch (error) {
      console.error('浏览器MCP服务初始化失败:', error);
      this.isConnected = false;
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
   * 模拟文件读取（使用fetch API）
   */
  async readFile(path: string): Promise<string> {
    try {
      // 对于项目文件，尝试通过HTTP请求获取
      const response = await fetch(`/api/file?path=${encodeURIComponent(path)}`);
      if (response.ok) {
        return await response.text();
      }
      
      // 如果API不可用，返回模拟数据
      return this.getMockFileContent(path);
    } catch (error) {
      console.warn(`无法读取文件 ${path}，使用模拟数据:`, error);
      return this.getMockFileContent(path);
    }
  }

  /**
   * 模拟目录列表
   */
  async listDirectory(path: string): Promise<any> {
    try {
      const response = await fetch(`/api/directory?path=${encodeURIComponent(path)}`);
      if (response.ok) {
        return await response.json();
      }
      
      return this.getMockDirectoryContent(path);
    } catch (error) {
      console.warn(`无法列出目录 ${path}，使用模拟数据:`, error);
      return this.getMockDirectoryContent(path);
    }
  }

  /**
   * 模拟文件搜索
   */
  async searchFiles(query: string, path?: string): Promise<any> {
    try {
      const params = new URLSearchParams({ query });
      if (path) params.append('path', path);
      
      const response = await fetch(`/api/search?${params}`);
      if (response.ok) {
        return await response.json();
      }
      
      return this.getMockSearchResults(query, path);
    } catch (error) {
      console.warn(`无法搜索文件，使用模拟数据:`, error);
      return this.getMockSearchResults(query, path);
    }
  }

  /**
   * 模拟文件信息获取
   */
  async getFileInfo(path: string): Promise<any> {
    try {
      const response = await fetch(`/api/file-info?path=${encodeURIComponent(path)}`);
      if (response.ok) {
        return await response.json();
      }
      
      return this.getMockFileInfo(path);
    } catch (error) {
      console.warn(`无法获取文件信息 ${path}，使用模拟数据:`, error);
      return this.getMockFileInfo(path);
    }
  }

  /**
   * 获取模拟文件内容
   */
  private getMockFileContent(path: string): string {
    const mockFiles: Record<string, string> = {
      'package.json': `{
  "name": "janus-eye",
  "version": "1.0.0",
  "description": "AI编程助手项目",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.3.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0",
    "@modelcontextprotocol/sdk": "^1.16.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.0",
    "typescript": "^5.0.0",
    "vite": "^4.3.0",
    "vue-tsc": "^1.4.0"
  }
}`,
      'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
      'vite.config.ts': `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})`,
      'src/views/AIChat.vue': `<!-- AI聊天组件 -->
<template>
  <div class="ai-chat">
    <!-- 聊天界面 -->
  </div>
</template>

<script setup lang="ts">
// AI聊天逻辑
</script>`
    };

    return mockFiles[path] || `# ${path}\n\n这是一个模拟的文件内容。在实际环境中，这里会显示真实的文件内容。`;
  }

  /**
   * 获取模拟目录内容
   */
  private getMockDirectoryContent(path: string): any {
    const mockDirectories: Record<string, any> = {
      '.': {
        type: 'directory',
        entries: [
          { name: 'src', type: 'directory' },
          { name: 'public', type: 'directory' },
          { name: 'package.json', type: 'file' },
          { name: 'tsconfig.json', type: 'file' },
          { name: 'vite.config.ts', type: 'file' },
          { name: 'README.md', type: 'file' }
        ]
      },
      'src': {
        type: 'directory',
        entries: [
          { name: 'views', type: 'directory' },
          { name: 'components', type: 'directory' },
          { name: 'services', type: 'directory' },
          { name: 'utils', type: 'directory' },
          { name: 'api', type: 'directory' },
          { name: 'App.vue', type: 'file' },
          { name: 'main.ts', type: 'file' },
          { name: 'router.ts', type: 'file' }
        ]
      },
      'src/views': {
        type: 'directory',
        entries: [
          { name: 'AIChat.vue', type: 'file' },
          { name: 'Dashboard.vue', type: 'file' },
          { name: 'Home.vue', type: 'file' },
          { name: 'Login.vue', type: 'file' }
        ]
      }
    };

    return mockDirectories[path] || {
      type: 'directory',
      entries: [
        { name: 'README.md', type: 'file' },
        { name: '示例文件.txt', type: 'file' }
      ]
    };
  }

  /**
   * 获取模拟搜索结果
   */
  private getMockSearchResults(query: string, path?: string): any {
    const mockResults = [
      {
        path: 'src/views/AIChat.vue',
        matches: [`包含 "${query}" 的文件`],
        line: 1
      },
      {
        path: 'package.json',
        matches: [`项目配置中包含 "${query}"`],
        line: 1
      }
    ];

    return {
      query,
      results: mockResults,
      total: mockResults.length
    };
  }

  /**
   * 获取模拟文件信息
   */
  private getMockFileInfo(path: string): any {
    return {
      path,
      size: 1024,
      modified: new Date().toISOString(),
      type: 'file',
      permissions: 'rw-r--r--'
    };
  }

  /**
   * 关闭连接
   */
  async disconnect() {
    this.isConnected = false;
    this.tools = [];
  }
}

// 创建全局浏览器MCP服务实例
export const browserMCPService = new BrowserMCPService(); 