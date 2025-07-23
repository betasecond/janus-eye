import type { PerformanceStats, PerformanceStatsVO } from '@/types'

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