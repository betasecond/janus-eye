import type { Question, QuestionVO } from '@/types'

/**
 * Transforms API question data to the format expected by the PracticeCenter component
 * 
 * @param questionData Raw question data from API
 * @returns Transformed Question object with title and options properties
 */
export function transformQuestionData(questionData: QuestionVO | any): Question {
  if (!questionData) {
    return {} as Question;
  }
  
  // Create a copy of the data to avoid modifying the original
  const transformedQuestion: Question = {
    ...questionData,
    // Map content to title for display
    title: questionData.content
  }
  
  // Generate options based on question type
  if (questionData.type === 'SINGLE_CHOICE') {
    // For single choice questions, generate mock options if none exist
    // In a real app, these would come from the API or be stored with the question
    transformedQuestion.options = ['选项A', '选项B', '选项C', '选项D']
  } else if (questionData.type === 'MULTIPLE_CHOICE') {
    // For multiple choice questions
    transformedQuestion.options = ['选项A', '选项B', '选项C', '选项D']
  } else if (questionData.type === 'TRUE_FALSE') {
    // For true/false questions, set standard options
    transformedQuestion.options = ['正确', '错误']
  }
  
  return transformedQuestion
}

/**
 * Transforms an array of questions from the API
 * 
 * @param questionsData Array of raw question data or JSON string
 * @returns Array of transformed Question objects
 */
export function transformQuestionsData(questionsData: QuestionVO[] | any[] | string): Question[] {
  // Handle string input (JSON)
  if (typeof questionsData === 'string') {
    try {
      questionsData = JSON.parse(questionsData);
    } catch (e) {
      console.error('Failed to parse question data string:', e);
      return [];
    }
  }
  
  // Ensure we have an array
  if (!Array.isArray(questionsData)) {
    return [];
  }
  
  return questionsData.map(question => transformQuestionData(question));
}