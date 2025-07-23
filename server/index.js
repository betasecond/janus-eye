const express = require('express');
const cors = require('cors');
const fileSystemAPI = require('./api/fileSystem');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 文件系统API路由
app.get('/api/file', fileSystemAPI.readFile);
app.get('/api/directory', fileSystemAPI.listDirectory);
app.get('/api/search', fileSystemAPI.searchFiles);
app.get('/api/file-info', fileSystemAPI.getFileInfo);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 错误处理中间件
app.use((error, req, res, next) => {
  console.error('服务器错误:', error);
  res.status(500).json({ error: '服务器内部错误' });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ error: '接口不存在' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`文件系统API服务器运行在 http://localhost:${PORT}`);
  console.log('可用的API端点:');
  console.log('  GET /api/file?path=<文件路径>');
  console.log('  GET /api/directory?path=<目录路径>');
  console.log('  GET /api/search?query=<搜索查询>&path=<搜索路径>');
  console.log('  GET /api/file-info?path=<文件路径>');
});

module.exports = app; 