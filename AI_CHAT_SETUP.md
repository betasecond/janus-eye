# AI 聊天功能配置指南（前端直接接入）

## 🚀 功能特性

- ✅ 前端直接调用通义千问API（无需后端）
- ✅ 真实大模型接入
- ✅ 流式输出（Server-Sent Events）
- ✅ 实时打字效果
- ✅ 可中断的流式输出
- ✅ **Markdown格式渲染**
- ✅ 错误处理和重试机制
- ✅ 环境变量配置

## 📋 配置说明

### 1. API密钥配置

#### 方法一：环境变量（推荐）
创建 `.env` 文件：
```env
VITE_DASHSCOPE_API_KEY=sk-7dadf5c894664d9abd339cc95dd84697
```

#### 方法二：直接修改配置文件
编辑 `src/config/ai.ts` 文件：
```typescript
export const AI_CONFIG = {
  DASHSCOPE: {
    API_KEY: 'your-api-key-here', // 替换为您的API密钥
    // ... 其他配置
  }
}
```

### 2. 模型配置

在 `src/config/ai.ts` 中可以调整以下参数：

```typescript
export const AI_CONFIG = {
  DASHSCOPE: {
    MODEL: 'qwen-turbo-latest',    // 模型名称
    TEMPERATURE: 0.7,              // 创造性（0-1）
    MAX_TOKENS: 2000,              // 最大输出长度
  },
  SYSTEM_PROMPT: '你是一个专业的编程助教...', // 系统提示词
}
```

## 🔧 使用方法

### 1. 安装依赖
```bash
npm install
```

### 2. 配置API密钥
选择上述任一方法配置您的通义千问API密钥

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 测试AI聊天
1. 打开应用，进入 AI 助教页面
2. 在输入框中输入问题
3. 点击发送或按回车键
4. AI 将以流式方式回复

## 🎯 高级功能

### 1. 流式输出
- 实时显示AI回复
- 打字光标动画
- 可中断输出

### 2. Markdown渲染
- 支持标题、粗体、斜体
- 代码块和行内代码高亮
- 列表、引用、链接渲染
- 表格和水平线支持

### 3. 错误处理
- API密钥无效提示
- 网络错误处理
- 自动重试机制

### 4. 自定义配置
- 修改系统提示词
- 调整模型参数
- 更换API密钥

## 🔍 故障排除

### 常见问题

1. **API密钥错误**
   ```
   错误信息：API请求失败: 401 - Unauthorized
   解决方案：检查API密钥是否正确配置
   ```

2. **网络连接问题**
   ```
   错误信息：网络连接错误
   解决方案：检查网络连接，确认可以访问 dashscope.aliyuncs.com
   ```

3. **CORS错误**
   ```
   错误信息：CORS policy blocked
   解决方案：通义千问API支持跨域请求，如果仍有问题请检查浏览器设置
   ```

### 调试信息

在浏览器控制台中可以看到：
```javascript
// API请求日志
console.log('Sending message to AI:', message);

// 流式数据接收
console.log('Received chunk:', chunk);

// 完整回复
console.log('Received AI response:', fullResponse);
```

## 🛠️ 技术实现

### 前端技术栈
- **Vue 3** + **TypeScript**
- **Fetch API** + **ReadableStream**
- **Server-Sent Events (SSE)**
- **Marked** (Markdown解析)

### 核心功能
1. **直接API调用**：前端直接调用通义千问API
2. **流式处理**：使用 `ReadableStream` 处理SSE数据
3. **Markdown渲染**：实时解析和渲染Markdown格式
4. **状态管理**：Vue 3 响应式状态管理
5. **错误处理**：完善的错误捕获和用户提示

### API调用示例
```typescript
// 流式调用
const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
  body: JSON.stringify({
    model: 'qwen-turbo-latest',
    messages: [
      { role: 'system', content: '你是一个编程助教' },
      { role: 'user', content: '用户问题' }
    ],
    stream: true,
    temperature: 0.7,
    max_tokens: 2000
  }),
});
```

## ⚠️ 安全注意事项

1. **API密钥保护**
   - 不要将API密钥提交到公共代码仓库
   - 使用环境变量管理敏感信息
   - 定期轮换API密钥

2. **请求限制**
   - 注意API调用频率限制
   - 合理设置 `max_tokens` 参数
   - 监控API使用量

3. **用户输入验证**
   - 前端验证用户输入
   - 防止恶意输入
   - 限制消息长度

## 🎉 完成！

现在您的AI聊天功能已经配置完成，可以直接在前端调用通义千问API了！

### 下一步
1. 配置您的API密钥
2. 启动开发服务器
3. 测试AI聊天功能
4. 根据需要调整配置参数

如果遇到任何问题，请检查：
1. API密钥是否正确
2. 网络连接是否正常
3. 浏览器控制台错误信息
4. 通义千问服务状态 