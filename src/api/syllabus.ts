import type { Syllabus } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 获取教学大纲
 * 注意：新API文档中未提供教学大纲相关接口，需要补充
 */
export const getSyllabus = async (): Promise<Syllabus> => {
  const response = await fetch(`${API_BASE_URL}/api/syllabus`)
  if (!response.ok) {
    throw new Error('Failed to fetch syllabus')
  }
  return response.json()
} 