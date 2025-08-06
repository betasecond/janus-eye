import type { StudentAnalysis } from '@/types'



/**
 * 获取学生分析数据
 * 注意：新API文档中未提供学生分析相关接口，需要补充
 */
export const getStudentAnalysis = async (): Promise<StudentAnalysis[]> => {
  const response = await fetch(`/api/analysis`)
  if (!response.ok) {
    throw new Error('Failed to fetch student analysis')
  }
  return response.json()
} 