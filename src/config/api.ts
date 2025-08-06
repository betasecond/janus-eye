import { extractData } from '@/utils/dataTransformers';

/**
 * API配置文件
 * 包含超时设置和通用请求配置
 */
const TIMEOUT = 3000000;

/**
 * 创建带超时的fetch请求
 */
export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`请求超时 (${TIMEOUT / 1000}秒)`);
    }
    throw error;
  }
};

/**
 * 通用API请求配置
 */
export const apiConfig = {
  baseURL: "",
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * GET请求
 */
export const apiGet = async (endpoint: string, params?: Record<string, any>): Promise<any> => {
  const url = new URL(endpoint, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });
  }
  const response = await fetchWithTimeout(url.pathname + url.search, {
    method: 'GET',
    headers: apiConfig.headers,
  });
  return extractData(response);
};

/**
 * POST请求
 */
export const apiPost = async (endpoint: string, data?: any, options: RequestInit = {}): Promise<any> => {
    const isFormData = data instanceof FormData;
    const headers = { ...apiConfig.headers, ...options.headers };
    if (isFormData) {
        delete headers['Content-Type'];
    }
    const response = await fetchWithTimeout(`${apiConfig.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: isFormData ? data : (data ? JSON.stringify(data) : undefined),
        ...options
    });
    return extractData(response);
};

/**
 * PUT请求
 */
export const apiPut = async (endpoint: string, data?: any): Promise<any> => {
  const response = await fetchWithTimeout(`${apiConfig.baseURL}${endpoint}`, {
    method: 'PUT',
    headers: apiConfig.headers,
    body: data ? JSON.stringify(data) : undefined,
  });
  return extractData(response);
};

/**
 * DELETE请求
 */
export const apiDelete = async (endpoint: string, data?: any): Promise<any> => {
    const url = new URL(endpoint, window.location.origin);
    if (data) {
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value.toString());
            }
        });
    }
    const response = await fetchWithTimeout(url.pathname + url.search, {
        method: 'DELETE',
        headers: apiConfig.headers,
    });
    return extractData(response);
};

export { TIMEOUT };
