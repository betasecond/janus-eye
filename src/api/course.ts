import type { CourseVO, CreateCourseDto, UpdateCourseDto, UserVO, CourseStatsVO } from '@/types'
import { apiGet, apiPost, apiPut, apiDelete } from '@/config/api'


/**
 * 获取所有课程
 */
export const getCourses = async (params?: {
  teacherId?: string
  studentId?: string
  keyword?: string
}): Promise<CourseVO[] > => {
  const response = await apiGet('/api/courses', params)
  if (!response.ok) {
    throw new Error('Failed to fetch courses')
  }
  return response.json()
}

/**
 * 获取课程详情
 */
export const getCourseById = async (id: string): Promise<CourseVO> => {
  const response = await apiGet(`/api/courses/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch course')
  }
  return response.json()
}

/**
 * 创建课程
 */
export const createCourse = async (data: CreateCourseDto): Promise<CourseVO> => {
  const response = await apiPost('/api/courses', data)
  if (!response.ok) {
    throw new Error('Failed to create course')
  }
  return response.json()
}

/**
 * 更新课程
 */
export const updateCourse = async (id: string, data: UpdateCourseDto): Promise<CourseVO> => {
  const response = await fetch(`/api/courses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update course')
  }
  return response.json()
}

/**
 * 删除课程
 */
export const deleteCourse = async (id: string): Promise<void> => {
  const response = await fetch(`/api/courses/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete course')
  }
}

/**
 * 学生选课
 */
export const enrollCourse = async (courseId: string, studentId: string): Promise<CourseVO> => {
  const response = await fetch(`/api/courses/${courseId}/enroll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ studentId }),
  })
  if (!response.ok) {
    throw new Error('Failed to enroll course')
  }
  return response.json()
}

/**
 * 学生退课
 */
export const unenrollCourse = async (courseId: string, studentId: string): Promise<CourseVO> => {
  const response = await fetch(`/api/courses/${courseId}/enroll/${studentId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to unenroll course')
  }
  return response.json()
}

/**
 * 获取课程学生列表
 */
export const getCourseStudents = async (courseId: string): Promise<UserVO[]> => {
  const response = await fetch(`/api/courses/${courseId}/students`)
  if (!response.ok) {
    throw new Error('Failed to fetch course students')
  }
  return response.json()
}

/**
 * 获取课程统计
 */
export const getCourseStats = async (courseId: string): Promise<CourseStatsVO> => {
  const response = await fetch(`/api/courses/${courseId}/stats`)
  if (!response.ok) {
    throw new Error('Failed to fetch course stats')
  }
  return response.json()
} 