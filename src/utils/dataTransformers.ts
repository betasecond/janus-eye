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
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.success === false) {
    throw new Error(result.message || 'The API returned an error');
  }

  if (result.hasOwnProperty('data')) {
    // Handle the specific Java-style array format [ "java.util.ArrayList", [ ...items ] ]
    if (Array.isArray(result.data) && result.data.length > 1 && typeof result.data[0] === 'string' && result.data[0].includes('List')) {
      const list = result.data[1];
      // Handle nested Java-style objects [ "com.example.MyVO", { ...props } ]
      if (Array.isArray(list) && list.every(item => Array.isArray(item) && item.length > 1)) {
        return list.map(item => item[1]);
      }
      return list;
    }
    // Handle single Java-style object format [ "com.example.MyVO", { ...props } ]
    if(Array.isArray(result.data) && result.data.length > 1 && typeof result.data[0] === 'string' && result.data[0].includes('VO')) {
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
