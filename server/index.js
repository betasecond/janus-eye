const express = require('express');
const cors = require('cors');
const fileSystemAPI = require('./api/fileSystem');
const questionAPI = require('./api/question');
const { mockCourses } = require('./data');

const app = express();
const PORT = process.env.PORT || 3001;

// 设置服务器超时时间为3000秒
app.use((req, res, next) => {
  req.setTimeout(3000000); // 3000秒 = 3000000毫秒
  res.setTimeout(3000000);
  next();
});

// 中间件
app.use(cors());
app.use(express.json());

// 文件系统API路由
app.get('/api/file', fileSystemAPI.readFile);
app.get('/api/directory', fileSystemAPI.listDirectory);
app.get('/api/search', fileSystemAPI.searchFiles);
app.get('/api/file-info', fileSystemAPI.getFileInfo);

// 题目API路由
app.get('/api/questions', questionAPI.getQuestions);
app.get('/api/questions/:id', questionAPI.getQuestionById);
app.get('/api/questions/stats', questionAPI.getQuestionStats);
app.get('/api/questions/types', questionAPI.getQuestionTypes);
app.get('/api/questions/difficulties', questionAPI.getQuestionDifficulties);

// 课程API路由 (简单实现)
app.get('/api/courses', (req, res) => {
  try {
    res.json(mockCourses);
  } catch (error) {
    console.error('获取课程列表失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

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
const server = app.listen(PORT, () => {
  console.log(`API服务器运行在 http://localhost:${PORT}`);
  console.log('可用的API端点:');
  console.log('  GET /api/file?path=<文件路径>');
  console.log('  GET /api/directory?path=<目录路径>');
  console.log('  GET /api/search?query=<搜索查询>&path=<搜索路径>');
  console.log('  GET /api/file-info?path=<文件路径>');
  console.log('  GET /api/questions');
  console.log('  GET /api/questions/:id');
  console.log('  GET /api/questions/stats');
  console.log('  GET /api/questions/types');
  console.log('  GET /api/questions/difficulties');
  console.log('  GET /api/courses');
  console.log(`⏱️  Server timeout set to 3000 seconds`);
});

// 设置服务器超时时间
server.timeout = 3000000; // 3000秒
server.keepAliveTimeout = 3000000;
server.headersTimeout = 3000000;

module.exports = app; 