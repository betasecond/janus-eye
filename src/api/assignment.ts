import type { 
  AssignmentVO, 
  CreateAssignmentDto, 
  UpdateAssignmentDto, 
  AssignmentSubmissionVO,
  AssignmentStatsVO
} from '@/types'



/**
 * 获取作业列表
 */
export const getAssignments = async (params?: {
  courseId?: string
  creatorId?: string
  studentId?: string
}): Promise<AssignmentVO[]> => {
  // 1. 基础路径
  let requestUrl = '/api/assignments';

  // 2. 如果有参数，则构建查询字符串
  if (params) {
    const queryParams = new URLSearchParams();

    if (params.courseId) {
      queryParams.append('courseId', params.courseId);
    }
    if (params.creatorId) {
      queryParams.append('creatorId', params.creatorId);
    }
    if (params.studentId) {
      queryParams.append('studentId', params.studentId);
    }

    const queryString = queryParams.toString();

    // 3. 如果查询字符串不为空，则拼接到 URL 后面
    if (queryString) {
      requestUrl += `?${queryString}`;
    }
  }

  const response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch assignments');
  }
  // 假设后端对空数组的响应也是 application/json
  const responseData = await response.json();
  // 从你的后端代码看，返回的数据应该在 data 字段里
  return responseData.data || [];
}

/**
 * 获取作业详情
 */
export const getAssignmentById = async (id: string): Promise<AssignmentVO> => {
  const response = await fetch(`/api/assignments/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch assignment')
  }
  return response.json()
}

/**
 * 创建作业
 */
export const createAssignment = async (data: CreateAssignmentDto): Promise<AssignmentVO> => {
  const response = await fetch(`/api/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create assignment')
  }
  return response.json()
}

/**
 * 更新作业
 */
export const updateAssignment = async (id: string, data: UpdateAssignmentDto): Promise<AssignmentVO> => {
  const response = await fetch(`/api/assignments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update assignment')
  }
  return response.json()
}

/**
 * 删除作业
 */
export const deleteAssignment = async (id: string): Promise<void> => {
  const response = await fetch(`/api/assignments/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete assignment')
  }
}

/**
 * 提交作业
 */
export const submitAssignment = async (data: {
  assignmentId: string
  studentId: string
  answers: Record<string, string>
}): Promise<AssignmentSubmissionVO> => {
  const response = await fetch(`/api/assignments/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to submit assignment')
  }
  return response.json()
}

/**
 * 获取作业提交列表
 */
export const getAssignmentSubmissions = async (assignmentId: string): Promise<AssignmentSubmissionVO[]> => {
  const response = await fetch(`/api/assignments/${assignmentId}/submissions`)
  if (!response.ok) {
    throw new Error('Failed to fetch assignment submissions')
  }
  return response.json()
}

/**
 * 获取单个提交详情
 */
export const getSubmissionById = async (submissionId: string): Promise<AssignmentSubmissionVO> => {
  const response = await fetch(`/api/assignments/submissions/${submissionId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch submission')
  }
  return response.json()
}

/**
 * 批改作业
 */
export const gradeSubmission = async (submissionId: string, scores: Record<string, boolean>): Promise<AssignmentSubmissionVO> => {
  const response = await fetch(`/api/assignments/submissions/${submissionId}/grade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ scores }),
  })
  if (!response.ok) {
    throw new Error('Failed to grade submission')
  }
  return response.json()
}

/**
 * 获取学生的提交列表
 */
export const getStudentSubmissions = async (studentId: string): Promise<AssignmentSubmissionVO[]> => {
  const response = await fetch(`/api/assignments/student/${studentId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch student submissions')
  }
  return response.json()
}

/**
 * 获取作业统计
 */
export const getAssignmentStats = async (assignmentId: string): Promise<AssignmentStatsVO> => {
  const response = await fetch(`/api/assignments/${assignmentId}/stats`)
  if (!response.ok) {
    throw new Error('Failed to fetch assignment stats')
  }
  return response.json()
} 