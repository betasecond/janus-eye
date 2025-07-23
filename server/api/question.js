const { mockQuestions } = require('../data');

// 模拟分页对象
const createPageVO = (content, page = 0, size = 10) => {
  return {
    content,
    totalElements: content.length,
    totalPages: Math.ceil(content.length / size),
    size,
    number: page
  };
};

// 获取题目列表
const getQuestions = (req, res) => {
  try {
    // 获取查询参数
    const { page = 0, size = 10, type, difficulty } = req.query;
    
    // 过滤数据
    let filteredQuestions = [...mockQuestions];
    
    if (type) {
      filteredQuestions = filteredQuestions.filter(q => q.type === type);
    }
    
    if (difficulty) {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
    }
    
    // 分页处理
    const startIndex = page * size;
    const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + parseInt(size));
    
    // 返回分页数据
    res.json(createPageVO(paginatedQuestions, parseInt(page), parseInt(size)));
  } catch (error) {
    console.error('获取题目列表失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 根据ID获取题目
const getQuestionById = (req, res) => {
  try {
    const { id } = req.params;
    const question = mockQuestions.find(q => q.id === id);
    
    if (!question) {
      return res.status(404).json({ error: '题目不存在' });
    }
    
    res.json(question);
  } catch (error) {
    console.error('获取题目详情失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取题目统计信息
const getQuestionStats = (req, res) => {
  try {
    const stats = {
      total: mockQuestions.length,
      byType: {},
      byDifficulty: {}
    };
    
    // 统计题型分布
    mockQuestions.forEach(q => {
      stats.byType[q.type] = (stats.byType[q.type] || 0) + 1;
    });
    
    // 统计难度分布
    mockQuestions.forEach(q => {
      stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
    });
    
    res.json(stats);
  } catch (error) {
    console.error('获取题目统计失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取所有题型
const getQuestionTypes = (req, res) => {
  try {
    const types = [...new Set(mockQuestions.map(q => q.type))];
    res.json(types);
  } catch (error) {
    console.error('获取题型列表失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取所有难度等级
const getQuestionDifficulties = (req, res) => {
  try {
    const difficulties = [...new Set(mockQuestions.map(q => q.difficulty))];
    res.json(difficulties);
  } catch (error) {
    console.error('获取难度等级失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

module.exports = {
  getQuestions,
  getQuestionById,
  getQuestionStats,
  getQuestionTypes,
  getQuestionDifficulties
};