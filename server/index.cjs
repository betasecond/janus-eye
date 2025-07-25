const express = require('express');
const cors = require('cors');
const {
  mockUsers,
  mockCourses,
  mockQuestions,
  mockAssignments,
  mockNotifications,
  mockPerformanceStats,
  mockSyllabus,
  mockStudentAnalysis,
  mockResources,
  teacherMenuItems,
  studentMenuItems,
  adminMenuItems,
} = require('./data.cjs');

// 导入新API格式的数据
const newData = require('./newData.cjs');

const app = express();
const port = 3001;

// 设置服务器超时时间为3000秒
app.use((req, res, next) => {
  req.setTimeout(3000000); // 3000秒 = 3000000毫秒
  res.setTimeout(3000000);
  next();
});

app.use(cors());
app.use(express.json());

// --- 新API Endpoints ---

// 统计接口
app.get('/api/stats', (req, res) => {
  res.json(newData.mockPerformanceStats);
});

// 存储接口
app.post('/api/storage/upload', (req, res) => {
  // 模拟文件上传
  const newFile = {
    ...newData.mockStorageObjects[0],
    id: `upload-${Date.now()}`,
    originalFilename: req.body.filename || 'uploaded-file.pdf',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  res.json(newFile);
});

app.get('/api/storage/:id', (req, res) => {
  const file = newData.mockStorageObjects.find(f => f.id === req.params.id);
  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }
  res.json(file);
});

app.post('/api/storage/:id/embed', (req, res) => {
  res.status(202).json({
    status: 'accepted',
    message: 'Embedding request queued for processing'
  });
});

app.get('/api/storage', (req, res) => {
  const { currentUserId, page = 0, size = 20 } = req.query;
  const start = page * size;
  const end = start + parseInt(size);
  const files = newData.mockStorageObjects.slice(start, end);
  
  res.json({
    content: files,
    totalElements: newData.mockStorageObjects.length,
    totalPages: Math.ceil(newData.mockStorageObjects.length / size),
    size: parseInt(size),
    number: parseInt(page)
  });
});

// AI接口
app.post('/ai/embedding/store', (req, res) => {
  res.json({
    status: 'success',
    message: 'Text embedded and stored successfully'
  });
});

app.post('/ai/embedding', (req, res) => {
  res.json({
    embedding: {
      embedding: Array.from({ length: 384 }, () => Math.random() - 0.5),
      metadata: {}
    }
  });
});

// 课程接口
app.get('/api/courses', (req, res) => {
  res.json(newData.mockCourses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = newData.mockCourses.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.json(course);
});

app.post('/api/courses', (req, res) => {
  const newCourse = {
    id: `course-${Date.now()}`,
    ...req.body,
    teacher: newData.mockUsers.find(u => u.id === req.body.teacherId),
    studentCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  res.status(201).json(newCourse);
});

app.get('/api/courses/:id/students', (req, res) => {
  res.json([newData.mockUsers[1]]); // 返回学生列表
});

app.get('/api/courses/:id/stats', (req, res) => {
  const course = newData.mockCourses.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.json({
    id: course.id,
    name: course.name,
    studentCount: course.studentCount,
    teacher: course.teacher,
    createdAt: course.createdAt
  });
});

// 作业接口
app.get('/api/assignments', (req, res) => {
  res.json(newData.mockAssignments);
});

app.get('/api/assignments/:id', (req, res) => {
  const assignment = newData.mockAssignments.find(a => a.id === req.params.id);
  if (!assignment) {
    return res.status(404).json({ error: 'Assignment not found' });
  }
  res.json(assignment);
});

app.post('/api/assignments', (req, res) => {
  const newAssignment = {
    id: `assignment-${Date.now()}`,
    ...req.body,
    course: newData.mockCourses.find(c => c.id === req.body.courseId),
    creator: newData.mockUsers.find(u => u.id === req.body.creatorId),
    questions: newData.mockQuestions.filter(q => req.body.questionIds.includes(q.id)),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  res.status(201).json(newAssignment);
});

app.get('/api/assignments/:id/submissions', (req, res) => {
  res.json(newData.mockSubmissions);
});

app.post('/api/assignments/submit', (req, res) => {
  const newSubmission = {
    id: `submission-${Date.now()}`,
    assignment: {
      id: req.body.assignmentId,
      title: 'Test Assignment',
      dueDate: '2025-07-20T23:59:59Z'
    },
    student: newData.mockUsers.find(u => u.id === req.body.studentId),
    answers: Object.entries(req.body.answers).map(([questionId, answer]) => ({
      id: `answer-${Date.now()}-${questionId}`,
      question: newData.mockQuestions.find(q => q.id === questionId),
      answer: answer,
      isCorrect: null
    })),
    score: null,
    status: 'SUBMITTED',
    submittedAt: new Date().toISOString()
  };
  res.status(201).json(newSubmission);
});

// 题目接口
app.get('/api/questions', (req, res) => {
  const { page = 0, size = 20 } = req.query;
  const start = page * size;
  const end = start + parseInt(size);
  const questions = newData.mockQuestions.slice(start, end);
  
  res.json({
    content: questions,
    totalElements: newData.mockQuestions.length,
    totalPages: Math.ceil(newData.mockQuestions.length / size),
    size: parseInt(size),
    number: parseInt(page)
  });
});

app.get('/api/questions/:id', (req, res) => {
  const question = newData.mockQuestions.find(q => q.id === req.params.id);
  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }
  res.json(question);
});

app.post('/api/questions', (req, res) => {
  const newQuestion = {
    id: `question-${Date.now()}`,
    ...req.body,
    knowledgePoints: newData.mockKnowledgePoints.filter(kp => req.body.knowledgePointIds.includes(kp.id)),
    creator: newData.mockUsers.find(u => u.id === req.body.creatorId),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  res.status(201).json(newQuestion);
});

app.post('/api/questions/search', (req, res) => {
  let results = newData.mockQuestions;
  
  if (req.body.difficulty) {
    results = results.filter(q => q.difficulty === req.body.difficulty);
  }
  if (req.body.type) {
    results = results.filter(q => q.type === req.body.type);
  }
  if (req.body.keyword) {
    results = results.filter(q => q.content.includes(req.body.keyword));
  }
  
  res.json(results);
});

app.get('/api/questions/stats', (req, res) => {
  res.json({
    total: newData.mockQuestions.length,
    byType: {
      'SINGLE_CHOICE': 1,
      'MULTIPLE_CHOICE': 1,
      'TRUE_FALSE': 1
    },
    byDifficulty: {
      'EASY': 2,
      'MEDIUM': 1,
      'HARD': 0
    }
  });
});

app.get('/api/questions/types', (req, res) => {
  res.json(['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_IN_BLANK', 'SHORT_ANSWER']);
});

app.get('/api/questions/difficulties', (req, res) => {
  res.json(['EASY', 'MEDIUM', 'HARD']);
});

// 通知接口
app.post('/api/notifications', (req, res) => {
  const newNotification = {
    id: `notification-${Date.now()}`,
    ...req.body,
    sender: req.body.senderId ? newData.mockUsers.find(u => u.id === req.body.senderId) : null,
    recipient: newData.mockUsers.find(u => u.id === req.body.recipientId),
    isRead: false,
    readAt: null,
    createdAt: new Date().toISOString()
  };
  res.status(201).json(newNotification);
});

app.get('/api/notifications/user/:userId', (req, res) => {
  const userNotifications = newData.mockNotifications.filter(n => n.recipient.id === req.params.userId);
  res.json(userNotifications);
});

app.get('/api/notifications/user/:userId/summary', (req, res) => {
  const userNotifications = newData.mockNotifications.filter(n => n.recipient.id === req.params.userId);
  const unreadCount = userNotifications.filter(n => !n.isRead).length;
  
  res.json({
    totalCount: userNotifications.length,
    unreadCount: unreadCount,
    byType: {
      'ASSIGNMENT': userNotifications.filter(n => n.type === 'ASSIGNMENT').length,
      'GRADE': userNotifications.filter(n => n.type === 'GRADE').length,
      'SYSTEM': userNotifications.filter(n => n.type === 'SYSTEM').length
    }
  });
});

app.put('/api/notifications/:id/read', (req, res) => {
  const notification = newData.mockNotifications.find(n => n.id === req.params.id);
  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }
  
  notification.isRead = true;
  notification.readAt = new Date().toISOString();
  res.json(notification);
});

app.put('/api/notifications/user/:userId/read-all', (req, res) => {
  const userNotifications = newData.mockNotifications.filter(n => n.recipient.id === req.params.userId);
  userNotifications.forEach(n => {
    n.isRead = true;
    n.readAt = new Date().toISOString();
  });
  
  res.json({ message: 'All notifications marked as read' });
});

// --- 旧API Endpoints（兼容） ---

// Users
app.get('/api/users', (req, res) => {
  res.json(mockUsers);
});

// Courses
app.get('/courses', (req, res) => {
  res.json(mockCourses);
});

// Questions
app.get('/questions', (req, res) => {
  res.json(mockQuestions);
});

// Assignments
app.get('/assignments', (req, res) => {
  res.json(mockAssignments);
});

// Notifications
app.get('/notifications', (req, res) => {
  res.json(mockNotifications);
});

// Performance Stats
app.get('/stats', (req, res) => {
  res.json(mockPerformanceStats);
});

// Syllabus
app.get('/api/syllabus', (req, res) => {
  res.json(mockSyllabus);
});

// Student Analysis
app.get('/api/analysis', (req, res) => {
  res.json(mockStudentAnalysis);
});

// Resources
app.get('/api/resources', (req, res) => {
  res.json(mockResources);
});

// Menu Items
app.get('/api/menu/teacher', (req, res) => {
  res.json(teacherMenuItems);
});

app.get('/api/menu/student', (req, res) => {
  res.json(studentMenuItems);
});

app.get('/api/menu/admin', (req, res) => {
  res.json(adminMenuItems);
});

const server = app.listen(port, () => {
  console.log(`🚀 Mock API server is running at http://localhost:${port}`);
  console.log(`📚 New API endpoints available at /api/*`);
  console.log(`🔗 Old API endpoints still available for compatibility`);
  console.log(`⏱️  Server timeout set to 3000 seconds`);
});

// 设置服务器超时时间
server.timeout = 3000000; // 3000秒
server.keepAliveTimeout = 3000000;
server.headersTimeout = 3000000; 