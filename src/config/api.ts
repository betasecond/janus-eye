/**
 * API配置文件
 * 包含超时设置和通用请求配置
 */


// 超时时间设置为3000秒（3000000毫秒）
const TIMEOUT = 3000000

/**
 * 创建带超时的fetch请求
 */
export const fetchWithTimeout = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`请求超时 (${TIMEOUT / 1000}秒)`)
    }
    throw error
  }
}

/**
 * 通用API请求配置
 */
export const apiConfig = {
  baseURL: "localhost",
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
}

/**
 * GET请求
 */
export const apiGet = async (endpoint: string, params?: Record<string, string>): Promise<Response> => {
  const url = `${apiConfig.baseURL}${endpoint}`
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value)
    })
  }
  
  return fetchWithTimeout(url.toString(), {
    method: 'GET',
    headers: apiConfig.headers,
  })
}

/**
 * POST请求
 */
export const apiPost = async (endpoint: string, data?: any): Promise<Response> => {
  return fetchWithTimeout(`${apiConfig.baseURL}${endpoint}`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * PUT请求
 */
export const apiPut = async (endpoint: string, data?: any): Promise<Response> => {
  return fetchWithTimeout(`${apiConfig.baseURL}${endpoint}`, {
    method: 'PUT',
    headers: apiConfig.headers,
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * DELETE请求
 */
export const apiDelete = async (endpoint: string): Promise<Response> => {
  return fetchWithTimeout(`${apiConfig.baseURL}${endpoint}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
}

export { TIMEOUT }