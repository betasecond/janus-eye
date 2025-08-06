import type { StorageObjectVO, StatusVO, PageVO } from '@/types'
import { apiGet, apiPost } from '@/config/api'

/**
 * 上传文件
 */
export const uploadFile = (file: File, uploaderId: string): Promise<StorageObjectVO> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('uploaderId', uploaderId)

  return apiPost(`/api/storage/upload`, formData)
}

/**
 * 获取文件详情
 */
export const getFileById = (id: string): Promise<StorageObjectVO> => {
  return apiGet(`/api/storage/${id}`)
}

/**
 * 请求文件向量化
 */
export const requestFileEmbedding = (id: string): Promise<StatusVO> => {
  return apiPost(`/api/storage/${id}/embed`, {})
}

/**
 * 获取文件列表（分页）
 */
export const getFiles = (params: {
  currentUserId: string
  uploaderId?: string
  keyword?: string
  page?: number
  size?: number
}): Promise<PageVO<StorageObjectVO>> => {
  return apiGet(`/api/storage`, params)
}
