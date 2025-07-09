import type { User, Course, Question, Assignment, Notification, PerformanceStats, Chapter, Syllabus, MenuItem, StudentAnalysis, Resource } from '../types'

// 模拟用户数据
export const mockUsers: User[] = [
  {
    id: '1',
    name: '张老师',
    email: 'zhang@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    role: 'teacher'
  },
  {
    id: '2',
    name: '李小明',
    email: 'li@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    role: 'student'
  },
  {
    id: '3',
    name: '王管理员',
    email: 'wang@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    role: 'admin'
  }
]

// 模拟课程数据
export const mockCourses: Course[] = [
  {
    id: '1',
    name: '计算机科学基础',
    description: '学习计算机科学的基本概念和原理',
    teacher: '张老师',
    students: 45,
    progress: 65,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'
  },
  {
    id: '2',
    name: 'Python编程入门',
    description: '从零开始学习Python编程语言',
    teacher: '张老师',
    students: 32,
    progress: 80,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop'
  }
]

// 模拟题目数据
export const mockQuestions: Question[] = [
  {
    id: '1',
    title: '法国的首都是什么？',
    type: 'multiple-choice',
    difficulty: 'easy',
    knowledgePoints: ['地理', '欧洲'],
    options: ['伦敦', '柏林', '巴黎', '马德里'],
    correctAnswer: 2,
    explanation: '巴黎是法国的首都和最大城市。'
  },
  {
    id: '2',
    title: '世界上最高的山峰是什么？',
    type: 'multiple-choice',
    difficulty: 'medium',
    knowledgePoints: ['地理', '自然'],
    options: ['珠穆朗玛峰', '乔戈里峰', '干城章嘉峰', '洛子峰'],
    correctAnswer: 0
  },
  {
    id: '3',
    title: '地球上最大的海洋是什么？',
    type: 'multiple-choice',
    difficulty: 'easy',
    knowledgePoints: ['地理', '海洋'],
    options: ['大西洋', '印度洋', '太平洋', '北冰洋'],
    correctAnswer: 2
  },
  {
    id: '4',
    title: '谁画了《蒙娜丽莎》？',
    type: 'multiple-choice',
    difficulty: 'medium',
    knowledgePoints: ['艺术', '历史'],
    options: ['米开朗基罗', '达芬奇', '拉斐尔', '毕加索'],
    correctAnswer: 1
  },
  {
    id: '5',
    title: '黄金的化学符号是什么？',
    type: 'multiple-choice',
    difficulty: 'medium',
    knowledgePoints: ['化学', '元素'],
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 2
  }
]

// 模拟作业数据
export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: '数学作业3',
    description: '完成代数方程相关的练习题',
    dueDate: '2024-12-20',
    courseId: '1',
    questions: mockQuestions.slice(0, 3),
    submissions: 5,
    maxScore: 100
  }
]

// 模拟通知数据
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '张老师',
    content: '您的上次作业反馈',
    type: 'info',
    isRead: false,
    createdAt: '2024-12-19',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    title: '数学练习',
    content: '新的练习题可用',
    type: 'info',
    isRead: false,
    createdAt: '2024-12-19'
  },
  {
    id: '3',
    title: '科学测试',
    content: '即将到来的测试提醒',
    type: 'warning',
    isRead: false,
    createdAt: '2024-12-19'
  }
]

// 模拟性能统计数据
export const mockPerformanceStats: PerformanceStats = {
  averageAccuracy: 85,
  frequentlyMissedConcepts: ['代数方程'],
  classRanking: '前10%',
  knowledgePointMastery: {
    '代数': 90,
    '几何': 10,
    '微积分': 50,
    '统计': 90
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

// 模拟章节数据
export const mockChapters: Chapter[] = [
  {
    id: '1',
    title: 'Python基础',
    order: 1,
    content: '学习Python的基本语法和概念',
    exercises: mockQuestions.slice(0, 2),
    isCompleted: true
  },
  {
    id: '2',
    title: '数据结构',
    order: 2,
    content: '学习Python中的数据结构，包括列表、字典、元组等',
    exercises: mockQuestions.slice(2, 4),
    isCompleted: false
  },
  {
    id: '3',
    title: '控制流',
    order: 3,
    content: '学习条件语句、循环语句等控制流结构',
    exercises: mockQuestions.slice(4, 5),
    isCompleted: false
  }
]

// 模拟学生分析数据
export const mockStudentAnalysis: StudentAnalysis[] = [
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
  },
  {
    id: '3',
    studentName: 'Noah Carter',
    incorrectQuestions: 'Question 2, Question 6',
    errorLocation: 'Step 3, Step 5',
    suggestedCorrection: 'Understand function concepts'
  }
]

// 模拟大纲数据
export const mockSyllabus: Syllabus = {
  id: '1',
  courseId: '2',
  chapters: mockChapters,
  isGenerating: false,
  progress: 60
}

// 教师导航菜单
export const teacherMenuItems: MenuItem[] = [
  { id: '1', label: '主页', icon: 'home', path: '/home' },
  { id: '2', label: '课程准备', icon: 'book', path: '/syllabus' },
  { id: '3', label: '作业生成', icon: 'file', path: '/question' },
  { id: '4', label: '学习分析', icon: 'chart', path: '/overview' },
  { id: '5', label: '资源管理', icon: 'folder', path: '/admin/resources' },
  { id: '6', label: '个人中心', icon: 'user', path: '/profile' }
]

// 学生导航菜单
export const studentMenuItems: MenuItem[] = [
  { id: '1', label: '主页', icon: 'home', path: '/home', isActive: true },
  { id: '2', label: '我的作业', icon: 'video', path: '/assignments' },
  { id: '3', label: '练习评估', icon: 'file', path: '/practice' },
  { id: '4', label: '资源库', icon: 'bookmark', path: '/library' },
  { id: '5', label: '个人中心', icon: 'user', path: '/profile' }
]

// 管理员导航菜单
export const adminMenuItems: MenuItem[] = [
  { id: '1', label: '主页', icon: 'home', path: '/admin/dashboard' },
  { id: '2', label: '用户管理', icon: 'users', path: '/admin/users' },
  { id: '3', label: '资源管理', icon: 'folder', path: '/admin/resources' },
  { id: '4.ts', label: '系统设置', icon: 'gear', path: '/admin/settings' }
]

// 模拟资源数据
export const mockResources: Resource[] = [
  { id: 'res001', title: '计算机科学导论.ppt', type: 'document', subject: '计算机科学', uploader: '张老师', uploadDate: '2024-07-20', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop' },
  { id: 'res002', title: '期中考试试卷.pdf', type: 'assessment', subject: '数学', uploader: '张老师', uploadDate: '2024-07-18', thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop' },
  { id: 'res003', title: 'Python编程练习.docx', type: 'document', subject: '编程', uploader: '李老师', uploadDate: '2024-07-15', thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop' },
  { id: 'res004', title: '数据结构视频.mp4', type: 'video', subject: '计算机科学', uploader: '王老师', uploadDate: '2024-07-12', thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop' },
]

// 默认模拟用户
export const mockUser = mockUsers[0] 