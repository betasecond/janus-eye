// 模拟用户数据
const mockUsers = [
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
  },
  {
    id: '4',
    name: '李老师',
    email: 'li_teacher@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    role: 'teacher'
  }
];

// 模拟课程数据
const mockCourses = [
  {
    id: '1',
    name: '计算机组成原理',
    description: '学习计算机硬件系统的组成和工作原理',
    teacher: '张老师',
    students: 50,
    progress: 70,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'
  },
  {
    id: '2',
    name: '数字逻辑',
    description: '学习数字电路的设计和分析',
    teacher: '李老师',
    students: 40,
    progress: 60,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop'
  }
];

// 模拟题目数据
const mockQuestions = [
  {
    id: '1',
    title: '在编译选项当中增加 –fopenmp。如果修改第25行代码“omp_set_num_threads(2);”当中的数字，（比如把2改成4）可以改变Windows任务管理器中观察到的线程的数量。',
    type: 'true-false',
    difficulty: 'medium',
    knowledgePoints: ['计算机组成原理'],
    options: ['对', '错'],
    correctAnswer: 0,
    explanation: '修改omp_set_num_threads的参数可以改变创建的线程数量。'
  },
  {
    id: '2',
    title: '在程序执行的过程中，所有的信号线上都是有数据的，但因为控制信号的作用，这些数据未必会被处理。比如，当执行的指令是jump这样的跳转指令时，尽管寄存器文件也能够输出寄存器的内容，但实际上并没有起到作用。',
    type: 'true-false',
    difficulty: 'medium',
    knowledgePoints: ['计算机组成原理'],
    options: ['对', '错'],
    correctAnswer: 0,
    explanation: '控制信号决定哪些数据被实际使用。'
  },
  {
    id: '3',
    title: '关于龙芯指令集（LoongArch）和RISC–V指令集，以下说法错误的是：',
    type: 'multiple-choice',
    difficulty: 'medium',
    knowledgePoints: ['计算机组成原理'],
    options: [
      '从编程者的角度看，使用MIPS编程和使用LoongArch或RISC–V高度相似',
      'LoongArch是我国自行设计并投入市场化的指令集，目前为国产信息系统和国产工控系统提供关键技术支持',
      'RISC–V的主要特点是“开源”，可以被任何学术机构和商业组织自由使用，开放且免费',
      '高级语言的语法特性不依赖于指令集体系结构的支持，两者毫无关联'
    ],
    correctAnswer: 3,
    explanation: '高级语言的语法特性实际上受到指令集体系结构的支持和影响。'
  },
  {
    id: '4',
    title: '以下哪一个表述是错误的？',
    type: 'multiple-choice',
    difficulty: 'medium',
    knowledgePoints: ['计算机组成原理'],
    options: [
      '与“计算机组成原理”课程密切相关的课程有“数字逻辑”、“操作系统”、“程序设计”等课程。',
      '如果把计算机的功能简单地划分为“计算”和“存储”，那么计算机中的核心器件CPU主要完成“计算”的功能，因此CPU将所有资源投入到了运算器件的设计中。',
      '现代计算机系统的一个明显特征是“并行”，通过并行能够进一步提升程序性能。',
      '发展以CPU和操作系统为代表的自主基础软硬件，是我国的战略需求。'
    ],
    correctAnswer: 1,
    explanation: 'CPU不仅包含运算器件，还包含控制单元、寄存器等。'
  },
  {
    id: '5',
    title: '使用2个整数位和2个小数位表达−0.75，正确的答案是：',
    type: 'multiple-choice',
    difficulty: 'medium',
    knowledgePoints: ['数字逻辑'],
    options: ['1111', '1110', '1101', '1100'],
    correctAnswer: 2,
    explanation: '使用补码表示，-0.75可以用1101表示。'
  },
  {
    id: '6',
    title: '以下哪个是时序逻辑电路的典型代表？',
    type: 'multiple-choice',
    difficulty: 'medium',
    knowledgePoints: ['数字逻辑'],
    options: ['加法器', '译码器', '触发器', '组合逻辑门'],
    correctAnswer: 2,
    explanation: '触发器是时序逻辑电路的典型代表。'
  },
  {
    id: '7',
    title: '在二进制数的计算中，因低位无法表示计算结果，需要将计算结果传递给相邻的高位，这种现象叫做“进位”。',
    type: 'true-false',
    difficulty: 'medium',
    knowledgePoints: ['数字逻辑'],
    options: ['对', '错'],
    correctAnswer: 0,
    explanation: '进位是二进制计算中的基本现象。'
  }
];

// 模拟作业数据
const mockAssignments = [
  {
    id: '1',
    title: '计算机组成原理作业1',
    description: '完成计算机组成原理相关的练习题',
    dueDate: '2024-12-20',
    courseId: '1',
    questions: mockQuestions.slice(0, 3),
    submissions: 5,
    maxScore: 100
  }
];

// 模拟通知数据
const mockNotifications = [
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
    title: '计算机组成原理',
    content: '新的练习题可用',
    type: 'info',
    isRead: false,
    createdAt: '2024-12-19'
  },
  {
    id: '3',
    title: '数字逻辑测试',
    content: '即将到来的测试提醒',
    type: 'warning',
    isRead: false,
    createdAt: '2024-12-19'
  }
];

// 模拟性能统计数据
const mockPerformanceStats = {
  averageAccuracy: 85,
  frequentlyMissedConcepts: ['指令集', '数字电路'],
  classRanking: '前10%',
  knowledgePointMastery: {
    '指令集': 80,
    'CPU设计': 70,
    '数字电路': 85,
    '并行计算': 75
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
};

// 模拟章节数据
const mockChapters = [
  {
    id: '1',
    title: '数字逻辑基础',
    order: 1,
    content: '学习数字逻辑的基本概念和门电路',
    exercises: [mockQuestions[4]],
    isCompleted: true
  },
  {
    id: '2',
    title: '组合逻辑电路',
    order: 2,
    content: '学习组合逻辑电路的设计和分析',
    exercises: [mockQuestions[5]],
    isCompleted: false
  },
  {
    id: '3',
    title: '时序逻辑电路',
    order: 3,
    content: '学习时序逻辑电路的设计和分析',
    exercises: [mockQuestions[6]],
    isCompleted: false
  }
];

// 模拟学生分析数据
const mockStudentAnalysis = [
  {
    id: '1',
    studentName: 'Ethan Harper',
    incorrectQuestions: 'Question 1, Question 3',
    errorLocation: 'Understanding of instruction sets',
    suggestedCorrection: 'Review LoongArch and RISC-V'
  },
  {
    id: '2',
    studentName: 'Olivia Bennett',
    incorrectQuestions: 'Question 2, Question 4',
    errorLocation: 'CPU design concepts',
    suggestedCorrection: 'Study CPU components and functions'
  },
  {
    id: '3',
    studentName: 'Noah Carter',
    incorrectQuestions: 'Question 5, Question 6',
    errorLocation: 'Digital logic basics',
    suggestedCorrection: 'Practice with logic gates and circuits'
  }
];

// 模拟大纲数据
const mockSyllabus = {
  id: '1',
  courseId: '2',
  chapters: mockChapters,
  isGenerating: false,
  progress: 60
};

// 教师导航菜单
const teacherMenuItems = [
  { id: '1', label: '主页', icon: 'home', path: '/home', isActive: true },
  { id: '2', label: '课程准备', icon: 'book', path: '/syllabus' },
  { id: '3', label: '作业生成', icon: 'file', path: '/question' },
  { id: '4', label: '学习分析', icon: 'chart', path: '/overview' },
  { id: '5', label: '资源管理', icon: 'folder', path: '/home' },
  { id: '6', label: '个人中心', icon: 'user', path: '/home' }
];

// 学生导航菜单
const studentMenuItems = [
  { id: '1', label: '主页', icon: 'home', path: '/home', isActive: true },
  { id: '2', label: '我的作业', icon: 'video', path: '/assignments' },
  { id: '3', label: '练习评估', icon: 'file', path: '/practice' },
  { id: '4', label: '资源库', icon: 'bookmark', path: '/library' },
  { id: '5', 'label': '个人中心', 'icon': 'user', 'path': '/profile' }
];

// 管理员导航菜单
const adminMenuItems = [
  { id: '1', label: '主页', icon: 'home', path: '/admin/dashboard' },
  { id: '2', label: '用户管理', icon: 'users', path: '/admin/users' },
  { id: '3', label: '资源管理', icon: 'folder', path: '/admin/resources' },
  { id: '4', label: '系统设置', icon: 'gear', path: '/admin/settings' }
];

// 模拟资源数据
const mockResources = [
  {
    id: 'res001',
    title: '计算机组成原理讲义.ppt',
    type: 'document',
    subject: '计算机组成原理',
    uploader: '张老师',
    uploadDate: '2024-07-20',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'
  },
  {
    id: 'res002',
    title: '数字逻辑实验报告.pdf',
    type: 'assessment',
    subject: '数字逻辑',
    uploader: '李老师',
    uploadDate: '2024-07-18',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop'
  },
  {
    id: 'res003',
    title: 'CPU设计原理.docx',
    type: 'document',
    subject: '计算机组成原理',
    uploader: '张老师',
    uploadDate: '2024-07-15',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop'
  },
  {
    id: 'res004',
    title: '数字电路视频.mp4',
    type: 'video',
    subject: '数字逻辑',
    uploader: '李老师',
    uploadDate: '2024-07-12',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop'
  }
];

module.exports = {
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
  adminMenuItems
};