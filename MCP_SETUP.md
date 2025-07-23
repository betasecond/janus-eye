# MCP (Model Context Protocol) 集成指南

## 🚀 什么是MCP？

MCP (Model Context Protocol) 是一个开放协议，允许AI助手安全地访问外部数据源和工具。通过MCP，AI可以：

- 读取和分析本地文件
- 访问数据库
- 调用API
- 执行系统命令
- 获取实时数据

## ✨ 功能特性

- ✅ **文件系统访问**：读取、搜索、分析代码文件
- ✅ **项目结构分析**：自动分析项目目录结构
- ✅ **配置信息获取**：读取package.json、tsconfig.json等
- ✅ **智能上下文**：根据用户问题自动选择合适的工具
- ✅ **安全访问**：基于权限的文件系统访问
- ✅ **实时集成**：与AI聊天无缝集成
- ✅ **浏览器兼容**：支持浏览器环境，无需Node.js依赖

## 🔧 安装和配置

### 1. 浏览器兼容方案（推荐）

由于MCP SDK在浏览器环境中存在兼容性问题，我们提供了浏览器兼容的解决方案：

#### 启动完整开发环境

```bash
# 启动前端 + 文件系统API服务器
pnpm run dev:full
```

这将同时启动：
- 前端开发服务器 (http://localhost:5173)
- 文件系统API服务器 (http://localhost:3000)

#### 单独启动服务

```bash
# 启动文件系统API服务器
pnpm run server

# 启动前端开发服务器
pnpm run dev
```

### 2. 传统MCP方案（桌面应用）

如果您在桌面应用环境中使用，可以安装完整的MCP服务器：

```bash
# 安装文件系统MCP服务器
pnpm add @modelcontextprotocol/server-filesystem

# 安装其他可选的MCP服务器
pnpm add @modelcontextprotocol/server-sqlite    # SQLite数据库
pnpm add @modelcontextprotocol/server-git       # Git仓库
pnpm add @modelcontextprotocol/server-http      # HTTP API
```

## 🎯 使用方法

### 1. 基本使用

启动应用后，MCP工具会自动检测并启用。你可以直接询问：

```
"请分析一下这个项目的结构"
"读取package.json文件内容"
"搜索包含Vue的文件"
"查看src目录下的所有文件"
```

### 2. 高级功能

#### 项目结构分析
```
用户: "请分析这个Vue项目的结构"
AI: [自动分析项目目录并返回详细结构]
```

#### 代码文件分析
```
用户: "请分析src/views/AIChat.vue文件"
AI: [读取文件内容并提供详细分析]
```

#### 配置信息获取
```
用户: "这个项目使用了哪些依赖？"
AI: [读取package.json并分析依赖]
```

#### 代码搜索
```
用户: "搜索所有包含'Vue'的文件"
AI: [搜索并返回匹配的文件列表]
```

## 🛠️ 技术实现

### 核心组件

1. **浏览器MCP服务** (`src/services/browserMCP.ts`)
   - 浏览器兼容的MCP客户端
   - 使用fetch API进行文件系统访问
   - 提供模拟数据作为备用方案

2. **工具管理器** (`src/utils/mcpTools.ts`)
   - 提供高级工具函数
   - 项目结构分析
   - 文件内容处理

3. **增强AI服务** (`src/services/enhancedAI.ts`)
   - 智能消息分析
   - 自动工具选择
   - 上下文增强

4. **文件系统API** (`server/api/fileSystem.js`)
   - Express服务器提供文件系统访问
   - 安全权限控制
   - 递归文件搜索

### 工作流程

1. **消息分析**：分析用户消息，判断是否需要MCP工具
2. **工具选择**：根据消息内容选择合适的MCP工具
3. **上下文获取**：调用文件系统API获取相关信息
4. **AI增强**：将上下文信息添加到AI请求中
5. **智能回复**：AI基于完整上下文提供准确回复

## 🔍 故障排除

### 常见问题

1. **MCP服务连接失败**
   ```
   错误: MCP服务初始化失败
   解决: 检查文件系统API服务器是否正在运行 (pnpm run server)
   ```

2. **权限问题**
   ```
   错误: 读取文件失败: Permission denied
   解决: 检查文件系统权限设置
   ```

3. **工具不可用**
   ```
   错误: MCP工具不可用
   解决: 确认文件系统API服务器正在运行
   ```

4. **浏览器兼容性问题**
   ```
   错误: process is not defined
   解决: 使用浏览器兼容的MCP服务 (browserMCP.ts)
   ```

### 调试模式

在浏览器控制台中查看MCP状态：

```javascript
// 查看MCP状态
console.log('MCP状态:', mcpStatus.value);

// 查看可用工具
console.log('可用工具:', mcpTools.getAvailableTools());

// 测试文件读取
mcpTools.readFile('package.json').then(console.log);
```

### API端点测试

测试文件系统API是否正常工作：

```bash
# 测试健康检查
curl http://localhost:3000/health

# 测试文件读取
curl "http://localhost:3000/api/file?path=package.json"

# 测试目录列表
curl "http://localhost:3000/api/directory?path=src"

# 测试文件搜索
curl "http://localhost:3000/api/search?query=Vue"
```

## 📝 自定义配置

### 添加新的API端点

1. 在 `server/api/fileSystem.js` 中添加新的处理函数
2. 在 `server/index.js` 中注册新的路由
3. 在 `vite.config.ts` 中添加代理配置

### 自定义工具函数

```typescript
// 在 mcpTools.ts 中添加新工具
static async customTool(args: any): Promise<string> {
  return this.callTool('custom_tool_name', args);
}
```

### 扩展消息分析

```typescript
// 在 enhancedAI.ts 中添加新的关键词
const mcpKeywords = [
  // ... 现有关键词
  'custom_keyword'
];
```

## ⚠️ 安全注意事项

1. **文件访问权限**
   - 只允许访问项目目录
   - 避免访问敏感文件
   - 实施适当的权限控制

2. **数据隐私**
   - 文件内容不会发送到外部服务器
   - 所有处理都在本地进行
   - 保护用户隐私

3. **错误处理**
   - 完善的错误捕获和处理
   - 用户友好的错误提示
   - 优雅的降级机制

4. **网络安全**
   - API服务器仅监听本地端口
   - 实施CORS保护
   - 路径遍历攻击防护

## 🎉 完成！

现在您的AI助手已经具备了强大的MCP功能，可以：

- 🔍 智能分析项目结构
- 📁 读取和分析代码文件
- 🔧 获取项目配置信息
- 🔎 搜索特定内容
- 💡 提供基于上下文的准确建议
- 🌐 完全兼容浏览器环境

开始体验增强的AI编程助手吧！🚀

## 📋 快速开始

1. **安装依赖**
   ```bash
   pnpm install
   ```

2. **启动开发环境**
   ```bash
   pnpm run dev:full
   ```

3. **访问应用**
   - 前端: http://localhost:5173
   - API服务器: http://localhost:3000

4. **测试MCP功能**
   - 在AI聊天中询问："请分析这个项目的结构"
   - 查看控制台中的MCP状态信息
   - 测试文件读取和搜索功能 