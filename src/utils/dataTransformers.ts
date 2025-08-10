import type { PerformanceStats, PerformanceStatsVO } from '@/types'

/**
 * Extracts and transforms data from a backend response.
 * The backend returns a specific format where the actual data is in the second element of the 'data' array.
 * This function handles that structure and also maps nested structures.
 *
 * @param response The fetch API Response object.
 * @returns The extracted and cleaned data.
 * @throws An error if the response is not ok or if the data format is invalid.
 */
export async function extractData(response: Response): Promise<any> {
  // 先读取文本，兼容空响应体（如 200/204 无内容）
  const rawText = await response.text().catch(() => '');

  if (!response.ok) {
    // 尝试从返回文本解析出JSON错误，否则使用原始文本/状态码
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorJson = rawText ? JSON.parse(rawText) : null;
      if (errorJson) {
        errorMessage = errorJson.message || errorJson.error?.message || errorMessage;
      }
    } catch (_) {
      if (rawText) errorMessage = rawText;
    }
    throw new Error(errorMessage);
  }

  // 无内容直接返回 null，适配 POST /api/v1/track 等空Body响应
  if (!rawText || rawText.trim().length === 0) {
    return null;
  }

  // 正常JSON解析
  let result: any;
  try {
    result = JSON.parse(rawText);
  } catch {
    // 返回非JSON文本时直接返回原始文本
    return rawText;
  }

  if (result && result.success === false) {
    throw new Error(result.message || 'The API returned an error');
  }

  if (result && Object.prototype.hasOwnProperty.call(result, 'data')) {
    // 兼容特殊Java风格数组 [ "java.util.ArrayList", [ ...items ] ]
    if (
      Array.isArray(result.data) &&
      result.data.length > 1 &&
      typeof result.data[0] === 'string' &&
      result.data[0].includes('List')
    ) {
      const list = result.data[1];
      if (Array.isArray(list) && list.every((item: any) => Array.isArray(item) && item.length > 1)) {
        return list.map((item: any) => item[1]);
      }
      return list;
    }
    // 兼容单个对象 [ "com.example.MyVO", { ...props } ]
    if (
      Array.isArray(result.data) &&
      result.data.length > 1 &&
      typeof result.data[0] === 'string' &&
      result.data[0].includes('VO')
    ) {
      return result.data[1];
    }
    return result.data;
  }

  return result;
}


/**
 * Transforms and validates performance stats data from API
 * Handles both old format (PerformanceStats) and new format (PerformanceStatsVO)
 * Ensures all required properties exist with appropriate defaults
 * 
 * @param data API response data
 * @returns Validated PerformanceStats object with all required properties
 */
export function transformAndValidateStats(data: any): PerformanceStats {
  // Start with default values for all required properties
  const defaultStats: PerformanceStats = {
    averageAccuracy: 0,
    frequentlyMissedConcepts: [],
    classRanking: 'N/A',
    knowledgePointMastery: {
      '默认': 0
    },
    accuracyTrends: [
      { week: '当前', accuracy: 0 }
    ],
    questionTypeDistribution: [
      { type: '默认', percentage: 0 }
    ]
  }
  
  // If no data, return defaults
  if (!data) return defaultStats
  
  // Create a copy of the data to avoid modifying the original
  const transformedData = { ...data }
  
  // Transform new API format to expected format if needed
  if (typeof transformedData.averageAccuracy === 'number') {
    // If averageAccuracy is a decimal (0-1) in new format, convert to percentage (0-100)
    if (transformedData.averageAccuracy <= 1) {
      transformedData.averageAccuracy = transformedData.averageAccuracy * 100
    }
  }
  
  // Ensure knowledgePointMastery exists
  if (!transformedData.knowledgePointMastery) {
    transformedData.knowledgePointMastery = defaultStats.knowledgePointMastery
  }
  
  // Ensure accuracyTrends exists
  if (!transformedData.accuracyTrends) {
    transformedData.accuracyTrends = defaultStats.accuracyTrends
  }
  
  // Ensure questionTypeDistribution exists
  if (!transformedData.questionTypeDistribution) {
    transformedData.questionTypeDistribution = defaultStats.questionTypeDistribution
  }
  
  // Ensure classRanking exists
  if (!transformedData.classRanking) {
    transformedData.classRanking = defaultStats.classRanking
  }
  
  // Ensure frequentlyMissedConcepts is an array
  if (!Array.isArray(transformedData.frequentlyMissedConcepts)) {
    transformedData.frequentlyMissedConcepts = defaultStats.frequentlyMissedConcepts
  }
  
  // Merge with defaults to ensure all properties exist
  return { ...defaultStats, ...transformedData }
}
