import type { StorageObjectVO, StatusVO, PageVO } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 上传文件
 */
export const uploadFile = async (file: File, uploaderId: string): Promise<StorageObjectVO> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('uploaderId', uploaderId)
  
  const response = await fetch(`${API_BASE_URL}/api/storage/upload`, {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) {
    throw new Error('Failed to upload file')
  }
  return response.json()
}

/**
 * 获取文件详情
 */
export const getFileById = async (id: string): Promise<StorageObjectVO> => {
  const response = await fetch(`${API_BASE_URL}/api/storage/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch file')
  }
  return response.json()
}

/**
 * 请求文件向量化
 */
export const requestFileEmbedding = async (id: string): Promise<StatusVO> => {
  const response = await fetch(`${API_BASE_URL}/api/storage/${id}/embed`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Failed to request file embedding')
  }
  return response.json()
}

/**
 * 获取文件列表（分页）
 */
export const getFiles = async (params: {
  currentUserId: string
  uploaderId?: string
  keyword?: string
  page?: number
  size?: number
}): Promise<PageVO<StorageObjectVO>> => {
  const url = new URL(`${API_BASE_URL}/api/storage`)
  url.searchParams.append('currentUserId', params.currentUserId)
  if (params.uploaderId) url.searchParams.append('uploaderId', params.uploaderId)
  if (params.keyword) url.searchParams.append('keyword', params.keyword)
  if (params.page) url.searchParams.append('page', params.page.toString())
  if (params.size) url.searchParams.append('size', params.size.toString())
  
  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('Failed to fetch files')
  }
  return response.json()
}
