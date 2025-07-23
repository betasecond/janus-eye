// 用户相关类型
export interface User {
  id: string
  displayName: string
  avatarUrl?: string
  role: 'TEACHER' | 'STUDENT' | 'ADMIN'
}

// 新API的UserVO接口
export interface UserVO {
  id: string
  displayName: string | null
  avatarUrl: string | null
  role: string
}

// 课程相关类型
export interface Course {
  id: string
  name: string
  description?: string
  teacher: UserVO
  studentCount: number
  progress?: number
  coverImageUrl?: string
  createdAt?: string
  updatedAt?: string
}

// 新API的CourseVO接口
export interface CourseVO {
  id: string
  name: string
  description: string | null
  coverImageUrl: string | null
  teacher: UserVO
  studentCount: number
  createdAt: string | null
  updatedAt: string | null
}

// 题目相关类型
export interface Question {
  id: string
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_BLANK' | 'SHORT_ANSWER'
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  content: string
  explanation?: string
  knowledgePoints: KnowledgePoint[]
  creator?: UserVO
  createdAt?: string
  updatedAt?: string
  // 前端兼容字段
  title?: string
  options?: string[]
  correctAnswer?: string | number
}

// 新API的QuestionVO接口
export interface QuestionVO {
  id: string
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_BLANK' | 'SHORT_ANSWER'
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  content: string
  explanation: string | null
  knowledgePoints: KnowledgePointVO[]
  creator: UserVO | null
  createdAt: string | null
  updatedAt: string | null
}

// 知识点相关类型
export interface KnowledgePoint {
  id: string
  name: string
  description: string
  subject: string
}

export interface KnowledgePointVO {
  id: string
  name: string
  description: string
  subject: string
}

// 作业相关类型
export interface Assignment {
  id: string
  title: string
  description?: string
  course: CourseVO
  creator: UserVO
  questions: QuestionVO[]
  dueDate?: string
  createdAt?: string
  updatedAt?: string
  // 前端兼容字段
  courseId?: string
  submissions?: number
  maxScore?: number
}

// 新API的AssignmentVO接口
export interface AssignmentVO {
  id: string
  title: string
  description: string | null
  course: CourseVO
  creator: UserVO
  questions: QuestionVO[]
  dueDate: string | null
  createdAt: string | null
  updatedAt: string | null
}

// 通知相关类型
export interface Notification {
  id: string
  title: string
  content: string
  type: 'SYSTEM' | 'ASSIGNMENT' | 'GRADE' | 'MESSAGE'
  sender?: UserVO
  recipient: UserVO
  isRead: boolean
  readAt?: string
  createdAt?: string
  // 前端兼容字段
  avatar?: string
}

// 新API的NotificationVO接口
export interface NotificationVO {
  id: string
  title: string
  content: string
  type: 'SYSTEM' | 'ASSIGNMENT' | 'GRADE' | 'MESSAGE'
  sender: UserVO | null
  recipient: UserVO
  isRead: boolean
  readAt: string | null
  createdAt: string | null
}

// 统计数据类型
export interface PerformanceStats {
  averageAccuracy: number
  frequentlyMissedConcepts: string[]
  // 前端兼容字段
  classRanking?: string
  knowledgePointMastery?: {
    [key: string]: number
  }
  accuracyTrends?: {
    week: string
    accuracy: number
  }[]
  questionTypeDistribution?: {
    type: string
    percentage: number
  }[]
}

// 新API的PerformanceStatsVO接口
export interface PerformanceStatsVO {
  averageAccuracy: number
  frequentlyMissedConcepts: string[]
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
  badge?: number | string
}

export interface ToastNotification {
  id: number
  title: string
  content: string
  type: 'success' | 'error' | 'info' | 'warning'
}

// 资源管理相关类型
export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'document' | 'image' | 'assessment';
  subject: string;
  uploader: string;
  uploadDate: string;
  thumbnail?: string;
}

// 新API相关类型定义

// 分页响应类型
export interface PageVO<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

// 状态响应类型
export interface StatusVO {
  status: string
  message: string
}

// 消息响应类型
export interface MessageVO {
  message: string
}

// 存储对象类型
export interface StorageObjectVO {
  id: string
  objectKey: string
  originalFilename: string
  fileSize: number
  contentType: string | null
  storageProvider: string
  bucketName: string
  embeddingStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
  uploader: UserVO | null
  createdAt: string | null
  updatedAt: string | null
}

// 作业提交相关类型
export interface AssignmentSubmissionVO {
  id: string
  assignment: AssignmentBriefVO
  student: UserVO
  answers: SubmissionAnswerVO[]
  score: number | null
  status: 'PENDING' | 'SUBMITTED' | 'GRADED'
  submittedAt: string | null
}

export interface AssignmentBriefVO {
  id: string
  title: string
  dueDate: string | null
}

export interface SubmissionAnswerVO {
  id: string
  question: QuestionVO
  answer: string
  isCorrect: boolean | null
}

// 通知摘要类型
export interface NotificationSummaryVO {
  totalCount: number
  unreadCount: number
  byType: Record<string, number>
}

// 课程统计类型
export interface CourseStatsVO {
  id: string
  name: string
  studentCount: number
  teacher: UserVO
  createdAt: string
}

// 作业统计类型
export interface AssignmentStatsVO {
  id: string
  title: string
  totalStudents: number
  submissionCount: number
  gradedCount: number
  submissionRate: number
  averageScore: number | null
}

// 题目统计类型
export interface QuestionStatsVO {
  total: number
  byType: Record<string, number>
  byDifficulty: Record<string, number>
}

// 通知统计类型
export interface NotificationStatsVO {
  total: number
  byType: Record<string, number>
  readStatus: Record<string, number>
}

// 请求DTO类型
export interface CreateCourseDto {
  name: string
  description?: string
  teacherId: string
  coverImageUrl?: string
}

export interface UpdateCourseDto {
  name?: string
  description?: string
  coverImageUrl?: string
}

export interface CreateAssignmentDto {
  title: string
  description?: string
  courseId: string
  creatorId: string
  dueDate?: string
  questionIds: string[]
}

export interface UpdateAssignmentDto {
  title?: string
  description?: string
  dueDate?: string
  questionIds?: string[]
}

export interface CreateQuestionDto {
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_BLANK' | 'SHORT_ANSWER'
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  content: string
  correctAnswer?: string
  explanation?: string
  knowledgePointIds: string[]
  creatorId: string
}

export interface UpdateQuestionDto {
  type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_BLANK' | 'SHORT_ANSWER'
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD'
  content?: string
  correctAnswer?: string
  explanation?: string
  knowledgePointIds?: string[]
}

export interface CreateNotificationDto {
  title: string
  content: string
  type: 'SYSTEM' | 'ASSIGNMENT' | 'GRADE' | 'MESSAGE'
  recipientId: string
  senderId?: string
}

export interface QuestionSearchDto {
  type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_BLANK' | 'SHORT_ANSWER'
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD'
  knowledgePointIds?: string[]
  subject?: string
  creatorId?: string
  keyword?: string
}