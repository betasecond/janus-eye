// 新API格式的模拟数据

// 模拟用户数据 - 新API格式
const mockUsers = [
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    displayName: '张老师',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    role: 'TEACHER'
  },
  {
    id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    displayName: '李小明',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    role: 'STUDENT'
  },
  {
    id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    displayName: '王管理员',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    role: 'ADMIN'
  }
]

// 模拟知识点数据
const mockKnowledgePoints = [
  {
    id: 'g6eebc99-9c0b-4ef8-bb6d-6bb9bd380a17',
    name: '变量',
    description: 'Python变量声明',
    subject: 'Python基础'
  },
  {
    id: 'h7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    name: '数据结构',
    description: 'Python数据结构',
    subject: 'Python基础'
  },
  {
    id: 'i8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    name: '控制流',
    description: 'Python控制流语句',
    subject: 'Python基础'
  }
]

// 模拟课程数据 - 新API格式
const mockCourses = [
  {
    id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    name: '计算机科学基础',
    description: '学习计算机科学的基本概念和原理',
    coverImageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
    teacher: mockUsers[0],
    studentCount: 45,
    createdAt: '2025-07-01T09:00:00Z',
    updatedAt: '2025-07-01T09:00:00Z'
  },
  {
    id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    name: 'Python编程入门',
    description: '从零开始学习Python编程语言',
    coverImageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop',
    teacher: mockUsers[0],
    studentCount: 32,
    createdAt: '2025-07-01T09:00:00Z',
    updatedAt: '2025-07-01T09:00:00Z'
  }
]

// 模拟题目数据 - 新API格式
const mockQuestions = [
  {
    id: 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    type: 'SINGLE_CHOICE',
    difficulty: 'EASY',
    content: 'Python中声明变量的关键字是什么？',
    explanation: 'Python中不需要特殊关键字声明变量，直接赋值即可',
    knowledgePoints: [mockKnowledgePoints[0]],
    creator: mockUsers[0],
    createdAt: '2025-07-05T11:00:00Z',
    updatedAt: '2025-07-05T11:00:00Z'
  },
  {
    id: 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'MEDIUM',
    content: 'Python中哪些是可变数据类型？',
    explanation: 'list, dict, set是可变数据类型',
    knowledgePoints: [mockKnowledgePoints[1]],
    creator: mockUsers[0],
    createdAt: '2025-07-05T11:00:00Z',
    updatedAt: '2025-07-05T11:00:00Z'
  },
  {
    id: 'g6eebc99-9c0b-4ef8-bb6d-6bb9bd380a17',
    type: 'TRUE_FALSE',
    difficulty: 'EASY',
    content: 'Python是一种解释型语言',
    explanation: 'Python是解释型语言，代码在运行时逐行解释执行',
    knowledgePoints: [mockKnowledgePoints[0]],
    creator: mockUsers[0],
    createdAt: '2025-07-05T11:00:00Z',
    updatedAt: '2025-07-05T11:00:00Z'
  }
]

// 模拟作业数据 - 新API格式
const mockAssignments = [
  {
    id: 'h7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    title: 'Python基础练习',
    description: '完成Python基础语法相关的练习题',
    course: mockCourses[1],
    creator: mockUsers[0],
    questions: [mockQuestions[0], mockQuestions[1]],
    dueDate: '2025-07-20T23:59:59Z',
    createdAt: '2025-07-08T14:00:00Z',
    updatedAt: '2025-07-08T14:00:00Z'
  }
]

// 模拟通知数据 - 新API格式
const mockNotifications = [
  {
    id: 'i8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    title: '新作业发布',
    content: '您有新的作业需要完成',
    type: 'ASSIGNMENT',
    sender: mockUsers[0],
    recipient: mockUsers[1],
    isRead: false,
    readAt: null,
    createdAt: '2025-07-08T15:00:00Z'
  },
  {
    id: 'j9eebc99-9c0b-4ef8-bb6d-6bb9bd380a20',
    title: '成绩已发布',
    content: '您的作业已批改完成',
    type: 'GRADE',
    sender: mockUsers[0],
    recipient: mockUsers[1],
    isRead: false,
    readAt: null,
    createdAt: '2025-07-08T16:00:00Z'
  },
  {
    id: 'k0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    title: '系统维护通知',
    content: '系统将于今晚进行维护',
    type: 'SYSTEM',
    sender: mockUsers[2],
    recipient: mockUsers[1],
    isRead: true,
    readAt: '2025-07-08T17:00:00Z',
    createdAt: '2025-07-08T12:00:00Z'
  }
]

// 模拟性能统计数据 - 新API格式
const mockPerformanceStats = {
  averageAccuracy: 0.85,
  frequentlyMissedConcepts: ['变量声明', '数据类型']
}

// 模拟存储对象数据
const mockStorageObjects = [
  {
    id: 'l1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    objectKey: 'uploads/python-tutorial.pdf',
    originalFilename: 'python-tutorial.pdf',
    fileSize: 1024000,
    contentType: 'application/pdf',
    storageProvider: 'minio',
    bucketName: 'janus',
    embeddingStatus: 'COMPLETED',
    uploader: mockUsers[0],
    createdAt: '2025-07-05T10:00:00Z',
    updatedAt: '2025-07-05T10:05:00Z'
  }
]

// 模拟作业提交数据
const mockSubmissions = [
  {
    id: 'm2eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
    assignment: {
      id: 'h7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
      title: 'Python基础练习',
      dueDate: '2025-07-20T23:59:59Z'
    },
    student: mockUsers[1],
    answers: [
      {
        id: 'n3eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
        question: mockQuestions[0],
        answer: '不需要关键字',
        isCorrect: true
      }
    ],
    score: 100.0,
    status: 'GRADED',
    submittedAt: '2025-07-10T10:00:00Z'
  }
]

// 兼容旧API的数据映射
const mockUsersOld = mockUsers.map(user => ({
  id: user.id,
  name: user.displayName,
  email: `${user.displayName}@example.com`,
  avatar: user.avatarUrl,
  role: user.role.toLowerCase()
}))

const mockCoursesOld = mockCourses.map(course => ({
  id: course.id,
  name: course.name,
  description: course.description,
  teacher: course.teacher.displayName,
  students: course.studentCount,
  progress: Math.floor(Math.random() * 100),
  image: course.coverImageUrl
}))

const mockQuestionsOld = mockQuestions.map(question => ({
  id: question.id,
  title: question.content,
  type: question.type.toLowerCase().replace('_', '-'),
  difficulty: question.difficulty.toLowerCase(),
  knowledgePoints: question.knowledgePoints.map(kp => kp.name),
  options: question.type === 'SINGLE_CHOICE' ? ['选项A', '选项B', '选项C', '选项D'] : undefined,
  correctAnswer: question.type === 'SINGLE_CHOICE' ? 0 : undefined,
  explanation: question.explanation
}))

const mockAssignmentsOld = mockAssignments.map(assignment => ({
  id: assignment.id,
  title: assignment.title,
  description: assignment.description,
  dueDate: assignment.dueDate,
  courseId: assignment.course.id,
  questions: mockQuestionsOld.slice(0, 2),
  submissions: Math.floor(Math.random() * 50),
  maxScore: 100
}))

const mockNotificationsOld = mockNotifications.map(notification => ({
  id: notification.id,
  title: notification.sender ? notification.sender.displayName : '系统',
  content: notification.content,
  type: notification.type.toLowerCase(),
  isRead: notification.isRead,
  createdAt: notification.createdAt?.split('T')[0] || '2025-07-08',
  avatar: notification.sender?.avatarUrl
}))

const mockPerformanceStatsOld = {
  averageAccuracy: mockPerformanceStats.averageAccuracy * 100,
  frequentlyMissedConcepts: mockPerformanceStats.frequentlyMissedConcepts,
  classRanking: '前10%',
  knowledgePointMastery: {
    '变量': 90,
    '数据类型': 85,
    '控制流': 80,
    '函数': 75
  },
  accuracyTrends: [
    { week: '第1周', accuracy: 75 },
    { week: '第2周', accuracy: 80 },
    { week: '第3周', accuracy: 78 },
    { week: '第4周', accuracy: 85 }
  ],
  questionTypeDistribution: [
    { type: '选择题', percentage: 30 },
    { type: '判断题', percentage: 40 },
    { type: '简答题', percentage: 80 },
    { type: '论述题', percentage: 40 }
  ]
}

// 继续保留旧数据用于兼容
const mockChapters = [
  {
    id: '1',
    title: 'Python基础',
    order: 1,
    content: '学习Python的基本语法和概念',
    exercises: mockQuestionsOld.slice(0, 2),
    isCompleted: true
  },
  {
    id: '2',
    title: '数据结构',
    order: 2,
    content: '学习Python中的数据结构，包括列表、字典、元组等',
    exercises: mockQuestionsOld.slice(2, 4),
    isCompleted: false
  }
]

const mockSyllabus = {
  id: '1',
  courseId: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
  chapters: mockChapters,
  isGenerating: false,
  progress: 60
}

const mockStudentAnalysis = [
  {
    id: '1',
    studentName: 'Ethan Harper',
    incorrectQuestions: 'Question 5, Question 8',
    errorLocation: 'Step 2, Step 4',
    suggestedCorrection: 'Review algebraic equations'
  },
  {
    id: '2',
    studentName: 'Olivia Bennett',
    incorrectQuestions: 'Question 3, Question 7',
    errorLocation: 'Step 1, Step 3',
    suggestedCorrection: 'Practice geometry proofs'
  }
]

const teacherMenuItems = [
  { id: '1', label: '主页', icon: 'home', path: '/home', isActive: true },
  { id: '2', label: '课程准备', icon: 'book', path: '/syllabus' },
  { id: '3', label: '作业生成', icon: 'file', path: '/question' },
  { id: '4', label: '学习分析', icon: 'chart', path: '/overview' },
  { id: '5', label: '资源管理', icon: 'folder', path: '/home' },
  { id: '6', label: '个人中心', icon: 'user', path: '/home' }
]

const studentMenuItems = [
  { id: '1', label: '主页', icon: 'home', path: '/home', isActive: true },
  { id: '2', label: '我的作业', icon: 'video', path: '/assignments' },
  { id: '3', label: '练习评估', icon: 'file', path: '/practice' },
  { id: '4', label: '资源库', icon: 'bookmark', path: '/library' },
  { id: '5', label: '个人中心', icon: 'user', path: '/profile' }
]

const adminMenuItems = [
  { id: '1', label: '主页', icon: 'home', path: '/admin/dashboard' },
  { id: '2', label: '用户管理', icon: 'users', path: '/admin/users' },
  { id: '3', label: '资源管理', icon: 'folder', path: '/admin/resources' },
  { id: '4', label: '系统设置', icon: 'gear', path: '/admin/settings' }
]

const mockResources = [
  { id: 'res001', title: '计算机科学导论.ppt', type: 'document', subject: '计算机科学', uploader: '张老师', uploadDate: '2024-07-20', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop' },
  { id: 'res002', title: '期中考试试卷.pdf', type: 'assessment', subject: '数学', uploader: '张老师', uploadDate: '2024-07-18', thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop' },
  { id: 'res003', title: 'Python编程练习.docx', type: 'document', subject: '编程', uploader: '李老师', uploadDate: '2024-07-15', thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop' },
  { id: 'res004', title: '数据结构视频.mp4', type: 'video', subject: '计算机科学', uploader: '王老师', uploadDate: '2024-07-12', thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop' }
]

module.exports = {
  // 新API格式
  mockUsers,
  mockCourses,
  mockQuestions,
  mockAssignments,
  mockNotifications,
  mockPerformanceStats,
  mockStorageObjects,
  mockSubmissions,
  mockKnowledgePoints,
  
  // 旧API格式（兼容）
  mockUsers: mockUsersOld,
  mockCourses: mockCoursesOld,
  mockQuestions: mockQuestionsOld,
  mockAssignments: mockAssignmentsOld,
  mockNotifications: mockNotificationsOld,
  mockPerformanceStats: mockPerformanceStatsOld,
  mockSyllabus,
  mockStudentAnalysis,
  mockResources,
  teacherMenuItems,
  studentMenuItems,
  adminMenuItems
}
