import type {
  AssignmentVO,
  CreateAssignmentDto,
  UpdateAssignmentDto,
  AssignmentSubmissionVO,
  AssignmentStatsVO
} from '@/types'
import {
  apiDelete, apiGet, apiPost, apiPut,
} from '@/config/api'

/**
 * 获取作业列表
 */
export const getAssignments = async (params?: {
  courseId?: string
  creatorId?: string
  studentId?: string
}): Promise<AssignmentVO[]> => {
  const responseData = await apiGet('/api/assignments', params)
  return responseData || []
}

/**
 * 获取作业详情
 */
export const getAssignmentById = (id: string): Promise<AssignmentVO> => {
  return apiGet(`/api/assignments/${id}`)
}

/**
 * 创建作业
 */
export const createAssignment = (data: CreateAssignmentDto): Promise<AssignmentVO> => {
  return apiPost(`/api/assignments`, data)
}

/**
 * 更新作业
 */
export const updateAssignment = (id: string, data: UpdateAssignmentDto): Promise<AssignmentVO> => {
  return apiPut(`/api/assignments/${id}`, data)
}

/**
 * 删除作业
 */
export const deleteAssignment = (id: string): Promise<void> => {
  return apiDelete(`/api/assignments/${id}`)
}

/**
 * 提交作业
 */
export const submitAssignment = (data: {
  assignmentId: string
  studentId: string
  answers: Record<string, string>
}): Promise<AssignmentSubmissionVO> => {
  return apiPost(`/api/assignments/submit`, data)
}

/**
 * 获取作业提交列表
 */
export const getAssignmentSubmissions = (assignmentId: string): Promise<AssignmentSubmissionVO[]> => {
  return apiGet(`/api/assignments/${assignmentId}/submissions`)
}

/**
 * 获取单个提交详情
 */
export const getSubmissionById = (submissionId: string): Promise<AssignmentSubmissionVO> => {
  return apiGet(`/api/assignments/submissions/${submissionId}`)
}

/**
 * 批改作业
 */
export const gradeSubmission = (submissionId: string, scores: Record<string, boolean>): Promise<AssignmentSubmissionVO> => {
  return apiPost(`/api/assignments/submissions/${submissionId}/grade`, { scores })
}

/**
 * 获取学生的提交列表
 */
export const getStudentSubmissions = (studentId: string): Promise<AssignmentSubmissionVO[]> => {
  return apiGet(`/api/assignments/student/${studentId}`)
}

/**
 * 获取作业统计
 */
export const getAssignmentStats = (assignmentId: string): Promise<AssignmentStatsVO> => {
  return apiGet(`/api/assignments/${assignmentId}/stats`)
}
