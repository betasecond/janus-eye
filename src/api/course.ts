import type { CourseVO, CreateCourseDto, UpdateCourseDto, UserVO, CourseStatsVO, PageVO } from '@/types'
import { apiGet, apiPost, apiPut, apiDelete } from '@/config/api'

/**
 * 获取所有课程
 */
export const getCourses = (params?: {
  teacherId?: string
  studentId?: string
  keyword?: string
  page?: number
  size?: number
}): Promise<PageVO<CourseVO>> => {
  return apiGet('/api/courses', params)
}

/**
 * 获取课程详情
 */
export const getCourseById = (id: string): Promise<CourseVO> => {
  return apiGet(`/api/courses/${id}`)
}

/**
 * 创建课程
 */
export const createCourse = (data: CreateCourseDto): Promise<CourseVO> => {
  return apiPost('/api/courses', data)
}

/**
 * 更新课程
 */
export const updateCourse = (id: string, data: UpdateCourseDto): Promise<CourseVO> => {
  return apiPut(`/api/courses/${id}`, data)
}

/**
 * 删除课程
 */
export const deleteCourse = (id: string): Promise<void> => {
  return apiDelete(`/api/courses/${id}`)
}

/**
 * 学生选课
 */
export const enrollCourse = (courseId: string, studentId: string): Promise<CourseVO> => {
  return apiPost(`/api/courses/${courseId}/enroll`, { studentId })
}

/**
 * 学生退课
 */
export const unenrollCourse = (courseId: string, studentId: string): Promise<CourseVO> => {
  return apiDelete(`/api/courses/${courseId}/enroll/${studentId}`)
}

/**
 * 获取课程学生列表
 */
export const getCourseStudents = (courseId: string): Promise<UserVO[]> => {
  return apiGet(`/api/courses/${courseId}/students`)
}

/**
 * 获取课程统计
 */
export const getCourseStats = (courseId: string): Promise<CourseStatsVO> => {
  return apiGet(`/api/courses/${courseId}/stats`)
}
