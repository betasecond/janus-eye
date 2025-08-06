import type {
  UserVO,
  Notification,
  CourseVO,
  Question,
  Assignment,
  Syllabus,
  StudentAnalysis,
  MenuItem,
  Resource,
  KnowledgePoint,
  PerformanceStats,
  Chapter,
  QuestionVO
} from '../types'

const mockTeacher: UserVO = {
  id: crypto.randomUUID(),
  displayName: '王老师',
  avatarUrl: 'https://i.pravatar.cc/150?u=teacher1',
  role: 'TEACHER',
}

const mockStudent: UserVO = {
  id: crypto.randomUUID(),
  displayName: '小明',
  avatarUrl: 'https://i.pravatar.cc/150?u=student1',
  role: 'STUDENT',
}

const mockAdmin: UserVO = {
  id: crypto.randomUUID(),
  displayName: '管理员',
  avatarUrl: 'https://i.pravatar.cc/150?u=admin1',
  role: 'ADMIN',
}

export const mockUsers: UserVO[] = [
  mockTeacher,
  mockStudent,
  mockAdmin,
  {
    id: crypto.randomUUID(),
    displayName: '小红',
    avatarUrl: 'https://i.pravatar.cc/150?u=student2',
    role: 'STUDENT',
  },
  {
    id: crypto.randomUUID(),
    displayName: '李老师',
    avatarUrl: 'https://i.pravatar.cc/150?u=teacher2',
    role: 'TEACHER',
  },
]

export const mockCourses: CourseVO[] = [
    {
      id: 'course-1',
      name: 'Vue.js 高级前端开发',
      description: '深入学习Vue.js框架，包括Vue 3 Composition API、TypeScript和性能优化。',
      coverImageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      teacher: mockTeacher,
      studentCount: 45,
      createdAt: '2023-01-15T09:00:00Z',
      updatedAt: '2023-05-20T14:30:00Z'
    },
    {
      id: 'course-2',
      name: '现代JavaScript精讲',
      description: '掌握ES6+新特性，异步编程，模块化以及函数式编程思想。',
      coverImageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop',
      teacher: mockTeacher,
      studentCount: 32,
      createdAt: '2023-02-01T10:00:00Z',
      updatedAt: '2023-05-22T11:00:00Z'
    }
];


const mockKnowledgePoint1: KnowledgePoint = {
  id: 'kp-1',
  name: 'Vue.js 响应式原理',
  description: '深入理解 Vue 2 的 Object.defineProperty 和 Vue 3 的 Proxy 实现。',
  subject: '前端开发',
}

const mockKnowledgePoint2: KnowledgePoint = {
  id: 'kp-2',
  name: 'Composition API',
  description: '学习如何使用 setup, ref, reactive, computed, watch 等新的 API。',
  subject: '前端开发',
}

export const mockQuestions: QuestionVO[] = [
  {
    id: 'q1',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'EASY',
    content: '在Vue 3中，以下哪个API用于创建一个响应式引用？',
    explanation: '`ref` 用于创建基本类型的响应式引用，而 `reactive` 用于创建对象的响应式代理。',
    knowledgePoints: [mockKnowledgePoint1, mockKnowledgePoint2],
    creator: mockTeacher,
    createdAt: '2023-05-10T10:00:00Z',
    updatedAt: '2023-05-11T11:30:00Z'
  },
  {
    id: 'q2',
    type: 'SHORT_ANSWER',
    difficulty: 'MEDIUM',
    content: '请简述 Composition API 相比于 Options API 的一个主要优势。',
    explanation: 'Composition API 的主要优势在于能够更好地组织和复用逻辑。相关功能的代码可以被组织在一起，而不是分散在 data, methods, computed 等不同选项中，从而提高了代码的可读性和可维护性，尤其是在大型复杂组件中。',
    knowledgePoints: [mockKnowledgePoint2],
    creator: mockTeacher,
    createdAt: '2023-05-12T14:20:00Z',
    updatedAt: '2023-05-12T15:00:00Z'
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: 'as1',
    title: '第一周作业：Vue基础',
    course: mockCourses[0],
    creator: mockTeacher,
    questions: mockQuestions,
    dueDate: '2023-09-15',
    submissions: 30,
    maxScore: 100,
  },
]

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '新作业已发布',
    content: '“计算机科学基础”课程发布了新作业，请在截止日期前完成。',
    type: 'ASSIGNMENT',
    isRead: false,
    createdAt: '2023-09-10T09:00:00Z',
    recipient: mockStudent
  },
  {
    id: '2',
    title: '成绩已更新',
    content: '你的“Python编程入门”期中测试成绩已公布。',
    type: 'GRADE',
    isRead: true,
    createdAt: '2023-09-08T14:30:00Z',
    recipient: mockStudent
  },
  {
    id: '3',
    title: '系统维护通知',
    content: '平台将于本周日凌晨2点至4点进行系统维护。',
    type: 'SYSTEM',
    isRead: false,
    createdAt: '2023-09-07T18:00:00Z',
    recipient: mockStudent
  },
  {
    id: '4',
    title: '教师消息',
    content: '请记得明天下午的实验课不要迟到。',
    type: 'MESSAGE',
    isRead: true,
    createdAt: '2023-09-06T11:00:00Z',
    sender: mockTeacher,
    recipient: mockStudent
  },
]

export const mockPerformanceStats: PerformanceStats = {
  averageAccuracy: 85,
  classRanking: '前 15%',
  knowledgePointMastery: {
    'Vue.js 响应式原理': 90,
    'Composition API': 82,
    '虚拟DOM': 78,
  },
  frequentlyMissedConcepts: ['虚拟DOM的Diff算法', 'Provide/Inject深度应用'],
  accuracyTrends: [
    { week: '第1周', accuracy: 75 },
    { week: '第2周', accuracy: 82 },
    { week: '第3周', accuracy: 88 },
    { week: '第4周', accuracy: 85 },
  ],
  questionTypeDistribution: [
    { type: '选择题', percentage: 60 },
    { type: '简答题', percentage: 25 },
    { type: '填空题', percentage: 15 },
  ],
}

export const mockSyllabus: Syllabus = {
  id: 'sy1',
  courseId: 'c1',
  chapters: [
    {
      id: 'ch1',
      title: '第一章：Vue.js 基础',
      order: 1,
      content: '详细介绍Vue.js的核心概念，如模板语法、响应式数据、计算属性和侦听器。',
      exercises: [], // This should be Question[] not QuestionVO[]
      isCompleted: true,
    },
    {
      id: 'ch2',
      title: '第二章：组件化开发',
      order: 2,
      content: '深入探讨Vue组件系统，包括Props、Events、Slots以及组件生命周期。',
      exercises: [],
      isCompleted: false,
    },
  ],
  isGenerating: false,
  progress: 50,
}

export const mockStudentAnalysis: StudentAnalysis[] = [
  {
    id: 'sa1',
    studentName: '李小明',
    incorrectQuestions: 'Q2, Q5',
    errorLocation: '主要在Vuex状态管理部分概念模糊',
    suggestedCorrection: '建议重新学习Vuex核心概念视频，并完成相关练习题。',
  },
];

export const teacherMenuItems: MenuItem[] = [
  { id: 'dashboard', label: '仪表盘', icon: 'dashboard', path: '/dashboard' },
  { id: 'syllabus', label: '课程大纲', icon: 'book', path: '/syllabus' },
  { id: 'question', label: '智能出题', icon: 'magicWand', path: '/question' },
  { id: 'overview', label: '教学总览', icon: 'chart', path: '/overview' },
  { id: 'profile', label: '个人中心', icon: 'user', path: '/profile' }
];

export const studentMenuItems: MenuItem[] = [
    { id: 'home', label: '主页', icon: 'home', path: '/home' },
    { id: 'assignments', label: '我的作业', icon: 'video', path: '/assignments' },
    {
      id: 'ai-tutor',
      label: 'AI 助教',
      icon: 'message',
      path: '/ai-chat',
    },
    { id: 'practice', label: '练习中心', icon: 'file', path: '/practice' },
    { id: 'resources', label: '资源库', icon: 'bookmark', path: '/library' },
    { id: 'profile', label: '个人中心', icon: 'user', path: '/profile' }
];

export const adminMenuItems: MenuItem[] = [
  { id: 'users', label: '用户管理', icon: 'users', path: '/admin/users' },
  { id: 'resources', label: '资源管理', icon: 'folder', path: '/admin/resources' },
  { id: 'analytics', label: '数据分析', icon: 'chart', path: '/admin/analytics' },
];

export const mockResources: Resource[] = [
    { id: '1', title: 'Vue 3 官方文档', type: 'document', subject: '前端', uploader: '张老师', uploadDate: '2023-05-10' },
    { id: '2', title: 'React 状态管理教程', type: 'video', subject: '前端', uploader: '李老师', uploadDate: '2023-05-12' },
]
