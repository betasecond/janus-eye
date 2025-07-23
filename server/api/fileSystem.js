const fs = require('fs').promises;
const path = require('path');

// 文件系统API路由
const fileSystemAPI = {
  // 读取文件内容
  async readFile(req, res) {
    try {
      const { path: filePath } = req.query;
      
      if (!filePath) {
        return res.status(400).json({ error: '缺少文件路径参数' });
      }

      // 安全检查：只允许访问项目目录
      const projectRoot = process.cwd();
      const fullPath = path.resolve(projectRoot, filePath);
      
      if (!fullPath.startsWith(projectRoot)) {
        return res.status(403).json({ error: '访问被拒绝：路径超出项目范围' });
      }

      const content = await fs.readFile(fullPath, 'utf-8');
      res.setHeader('Content-Type', 'text/plain');
      res.send(content);
    } catch (error) {
      console.error('读取文件错误:', error);
      res.status(500).json({ error: '读取文件失败' });
    }
  },

  // 列出目录内容
  async listDirectory(req, res) {
    try {
      const { path: dirPath = '.' } = req.query;
      
      // 安全检查：只允许访问项目目录
      const projectRoot = process.cwd();
      const fullPath = path.resolve(projectRoot, dirPath);
      
      if (!fullPath.startsWith(projectRoot)) {
        return res.status(403).json({ error: '访问被拒绝：路径超出项目范围' });
      }

      const entries = await fs.readdir(fullPath, { withFileTypes: true });
      const result = {
        type: 'directory',
        path: dirPath,
        entries: entries.map(entry => ({
          name: entry.name,
          type: entry.isDirectory() ? 'directory' : 'file',
          size: entry.isFile() ? fs.statSync(path.join(fullPath, entry.name)).size : null
        }))
      };

      res.json(result);
    } catch (error) {
      console.error('列出目录错误:', error);
      res.status(500).json({ error: '列出目录失败' });
    }
  },

  // 搜索文件
  async searchFiles(req, res) {
    try {
      const { query, path: searchPath = '.' } = req.query;
      
      if (!query) {
        return res.status(400).json({ error: '缺少搜索查询参数' });
      }

      // 安全检查：只允许搜索项目目录
      const projectRoot = process.cwd();
      const fullSearchPath = path.resolve(projectRoot, searchPath);
      
      if (!fullSearchPath.startsWith(projectRoot)) {
        return res.status(403).json({ error: '访问被拒绝：路径超出项目范围' });
      }

      const results = await searchFilesRecursive(fullSearchPath, query, projectRoot);
      
      res.json({
        query,
        path: searchPath,
        results,
        total: results.length
      });
    } catch (error) {
      console.error('搜索文件错误:', error);
      res.status(500).json({ error: '搜索文件失败' });
    }
  },

  // 获取文件信息
  async getFileInfo(req, res) {
    try {
      const { path: filePath } = req.query;
      
      if (!filePath) {
        return res.status(400).json({ error: '缺少文件路径参数' });
      }

      // 安全检查：只允许访问项目目录
      const projectRoot = process.cwd();
      const fullPath = path.resolve(projectRoot, filePath);
      
      if (!fullPath.startsWith(projectRoot)) {
        return res.status(403).json({ error: '访问被拒绝：路径超出项目范围' });
      }

      const stats = await fs.stat(fullPath);
      const info = {
        path: filePath,
        size: stats.size,
        modified: stats.mtime.toISOString(),
        created: stats.birthtime.toISOString(),
        type: stats.isDirectory() ? 'directory' : 'file',
        permissions: stats.mode.toString(8)
      };

      res.json(info);
    } catch (error) {
      console.error('获取文件信息错误:', error);
      res.status(500).json({ error: '获取文件信息失败' });
    }
  }
};

// 递归搜索文件
async function searchFilesRecursive(dirPath, query, projectRoot) {
  const results = [];
  
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.relative(projectRoot, fullPath);
      
      // 跳过node_modules和.git目录
      if (entry.name === 'node_modules' || entry.name === '.git') {
        continue;
      }
      
      if (entry.isDirectory()) {
        // 递归搜索子目录
        const subResults = await searchFilesRecursive(fullPath, query, projectRoot);
        results.push(...subResults);
      } else if (entry.isFile()) {
        // 检查文件名是否匹配
        if (entry.name.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            path: relativePath,
            type: 'filename_match',
            matches: [`文件名包含 "${query}"`]
          });
        } else {
          // 检查文件内容是否匹配
          try {
            const content = await fs.readFile(fullPath, 'utf-8');
            if (content.toLowerCase().includes(query.toLowerCase())) {
              const lines = content.split('\n');
              const matchingLines = [];
              
              lines.forEach((line, index) => {
                if (line.toLowerCase().includes(query.toLowerCase())) {
                  matchingLines.push({
                    line: index + 1,
                    content: line.trim()
                  });
                }
              });
              
              if (matchingLines.length > 0) {
                results.push({
                  path: relativePath,
                  type: 'content_match',
                  matches: matchingLines.slice(0, 5) // 最多显示5个匹配行
                });
              }
            }
          } catch (error) {
            // 忽略无法读取的文件
            console.warn(`无法读取文件 ${fullPath}:`, error.message);
          }
        }
      }
    }
  } catch (error) {
    console.warn(`无法访问目录 ${dirPath}:`, error.message);
  }
  
  return results;
}

module.exports = fileSystemAPI; 