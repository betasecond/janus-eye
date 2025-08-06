import type {
  QuestionVO,
  CreateQuestionDto,
  UpdateQuestionDto,
  QuestionSearchDto,
  QuestionStatsVO,
  PageVO
} from '@/types'
import {
  apiDelete, apiGet, apiPost, apiPut,
} from '@/config/api';

/**
 * 获取题目列表（分页）
 */
export const getQuestions = (params?: {
  type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_BLANK' | 'SHORT_ANSWER'
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD'
  creatorId?: string
  knowledgePointId?: string
  subject?: string
  page?: number
  size?: number
}): Promise<PageVO<QuestionVO>> => {
  return apiGet('/api/questions', params);
}

/**
 * 获取题目详情
 */
export const getQuestionById = (id: string): Promise<QuestionVO> => {
  return apiGet(`/api/questions/${id}`)
}

/**
 * 创建题目
 */
export const createQuestion = (data: CreateQuestionDto): Promise<QuestionVO> => {
  return apiPost(`/api/questions`, data)
}

/**
 * 更新题目
 */
export const updateQuestion = (id: string, data: UpdateQuestionDto): Promise<QuestionVO> => {
  return apiPut(`/api/questions/${id}`, data)
}

/**
 * 删除题目
 */
export const deleteQuestion = (id: string): Promise<void> => {
  return apiDelete(`/api/questions/${id}`)
}

/**
 * 搜索题目
 */
export const searchQuestions = (data: QuestionSearchDto): Promise<PageVO<QuestionVO>> => {
  return apiPost(`/api/questions/search`, data)
}

/**
 * 获取题目统计
 */
export const getQuestionStats = (): Promise<QuestionStatsVO> => {
  return apiGet(`/api/questions/stats`)
}

/**
 * 获取所有题目类型
 */
export const getQuestionTypes = (): Promise<string[]> => {
  return apiGet(`/api/questions/types`)
}

/**
 * 获取所有难度等级
 */
export const getQuestionDifficulties = (): Promise<string[]> => {
  return apiGet(`/api/questions/difficulties`)
}
