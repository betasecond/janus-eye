// 用户相关类型
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'teacher' | 'student' | 'admin'
}

// 课程相关类型
export interface Course {
  id: string
  name: string
  description: string
  teacher: string
  students: number
  progress: number
  image?: string
}

// 题目相关类型
export interface Question {
  id: string
  title: string
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay'
  difficulty: 'easy' | 'medium' | 'hard'
  knowledgePoints: string[]
  options?: string[]
  correctAnswer?: string | number
  explanation?: string
}

// 作业相关类型
export interface Assignment {
  id: string
  title: string
  description: string
  dueDate: string
  courseId: string
  questions: Question[]
  submissions: number
  maxScore: number
}

// 通知相关类型
export interface Notification {
  id: string
  title: string
  content: string
  type: 'info' | 'warning' | 'success' | 'error'
  isRead: boolean
  createdAt: string
  avatar?: string
}

// 统计数据类型
export interface PerformanceStats {
  averageAccuracy: number
  frequentlyMissedConcepts: string[]
  classRanking: string
  knowledgePointMastery: {
    [key: string]: number
  }
  accuracyTrends: {
    week: string
    accuracy: number
  }[]
  questionTypeDistribution: {
    type: string
    percentage: number
  }[]
}

// 章节类型
export interface Chapter {
  id: string
  title: string
  order: number
  content: string
  exercises: Question[]
  isCompleted: boolean
}

// 大纲类型
export interface Syllabus {
  id: string
  courseId: string
  chapters: Chapter[]
  isGenerating: boolean
  progress: number
}

// 学生分析数据类型
export interface StudentAnalysis {
  id: string
  studentName: string
  incorrectQuestions: string
  errorLocation: string
  suggestedCorrection: string
}

// 导航菜单项类型
export interface MenuItem {
  id: string
  label: string
  icon: string
  path: string
  isActive?: boolean
} 