import type { 
  QuestionVO, 
  CreateQuestionDto, 
  UpdateQuestionDto, 
  QuestionSearchDto,
  QuestionStatsVO,
  PageVO
} from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 获取题目列表（分页）
 */
export const getQuestions = async (params?: {
  type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_BLANK' | 'SHORT_ANSWER'
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD'
  creatorId?: string
  knowledgePointId?: string
  subject?: string
  page?: number
  size?: number
}): Promise<PageVO<QuestionVO>| QuestionVO[]> => {
  const url = new URL(`${API_BASE_URL}/api/questions`)
  if (params?.type) url.searchParams.append('type', params.type)
  if (params?.difficulty) url.searchParams.append('difficulty', params.difficulty)
  if (params?.creatorId) url.searchParams.append('creatorId', params.creatorId)
  if (params?.knowledgePointId) url.searchParams.append('knowledgePointId', params.knowledgePointId)
  if (params?.subject) url.searchParams.append('subject', params.subject)
  if (params?.page) url.searchParams.append('page', params.page.toString())
  if (params?.size) url.searchParams.append('size', params.size.toString())
  
  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('Failed to fetch questions')
  }
  return response.json()
}

/**
 * 获取题目详情
 */
export const getQuestionById = async (id: string): Promise<QuestionVO> => {
  const response = await fetch(`${API_BASE_URL}/api/questions/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch question')
  }
  return response.json()
}

/**
 * 创建题目
 */
export const createQuestion = async (data: CreateQuestionDto): Promise<QuestionVO> => {
  const response = await fetch(`${API_BASE_URL}/api/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create question')
  }
  return response.json()
}

/**
 * 更新题目
 */
export const updateQuestion = async (id: string, data: UpdateQuestionDto): Promise<QuestionVO> => {
  const response = await fetch(`${API_BASE_URL}/api/questions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update question')
  }
  return response.json()
}

/**
 * 删除题目
 */
export const deleteQuestion = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/questions/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete question')
  }
}

/**
 * 搜索题目
 */
export const searchQuestions = async (data: QuestionSearchDto): Promise<QuestionVO[]> => {
  const response = await fetch(`${API_BASE_URL}/api/questions/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to search questions')
  }
  return response.json()
}

/**
 * 获取题目统计
 */
export const getQuestionStats = async (): Promise<QuestionStatsVO> => {
  const response = await fetch(`${API_BASE_URL}/api/questions/stats`)
  if (!response.ok) {
    throw new Error('Failed to fetch question stats')
  }
  return response.json()
}

/**
 * 获取所有题目类型
 */
export const getQuestionTypes = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/api/questions/types`)
  if (!response.ok) {
    throw new Error('Failed to fetch question types')
  }
  return response.json()
}

/**
 * 获取所有难度等级
 */
export const getQuestionDifficulties = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/api/questions/difficulties`)
  if (!response.ok) {
    throw new Error('Failed to fetch question difficulties')
  }
  return response.json()
} 