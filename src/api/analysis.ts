import type { StudentAnalysis } from '@/types'
import { apiGet } from '@/config/api'

/**
 * 获取学生分析数据
 * 注意：新API文档中未提供学生分析相关接口，需要补充
 */
export const getStudentAnalysis = (): Promise<StudentAnalysis[]> => {
  return apiGet(`/api/analysis`)
}
