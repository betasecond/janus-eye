import type { Question, QuestionVO } from '@/types'

/**
 * Transforms API question data to the format expected by the PracticeCenter component
 * 
 * @param questionData Raw question data from API
 * @returns Transformed Question object with title and options properties
 */
export function transformQuestionData(questionData: QuestionVO | any): Question {
  if (!questionData) {
    console.warn('Empty question data provided to transformQuestionData');
    return {} as Question;
  }
  
  // Log the raw data for debugging
  console.log('Transforming question data:', questionData);
  
  // Create a copy of the data to avoid modifying the original
  const transformedQuestion: Question = {
    ...questionData,
    // Map content to title for display, handle null values
    title: questionData.content || '未提供题干内容'
  }
  
  // Handle explanation, ensure it's a string or undefined
  if (transformedQuestion.explanation === null) {
    transformedQuestion.explanation = undefined;
  }
  
  // Generate options based on question type
  // For now, we're using mock options since the API doesn't seem to return them
  if (questionData.type === 'SINGLE_CHOICE' || questionData.type === 'MULTIPLE_CHOICE') {
    // For choice questions, generate mock options if none exist
    // In a real app, these would come from the API or be stored with the question
    transformedQuestion.options = ['选项A', '选项B', '选项C', '选项D']
    // Mock correct answer for display
    transformedQuestion.correctAnswer = 'A' // This would come from the API in a real implementation
  } else if (questionData.type === 'TRUE_FALSE') {
    // For true/false questions, set standard options
    transformedQuestion.options = ['正确', '错误']
    // Mock correct answer for display
    transformedQuestion.correctAnswer = '正确' // This would come from the API in a real implementation
  } else if (questionData.type === 'FILL_IN_BLANK') {
    // For fill in blank questions
    transformedQuestion.correctAnswer = '答案示例' // This would come from the API in a real implementation
  } else if (questionData.type === 'SHORT_ANSWER') {
    // For short answer questions
    transformedQuestion.correctAnswer = '参考答案示例' // This would come from the API in a real implementation
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
  console.log('Raw questions data received:', questionsData);
  
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
    console.error('Questions data is not an array:', questionsData);
    return [];
  }
  
  // Transform each question
  const transformedQuestions = questionsData.map((question, index) => {
    try {
      return transformQuestionData(question);
    } catch (error) {
      console.error(`Error transforming question at index ${index}:`, error);
      return {} as Question;
    }
  });
  
  console.log('Transformed questions:', transformedQuestions);
  return transformedQuestions;
}

import type { Course, CourseVO, UserVO } from '@/types'; // 确保导入了所有需要的类型

/**
 * 将从 API 获取的课程数据数组 (CourseVO[]) 转换为组件内部使用的格式 (Course[])
 * @param coursesData - 从 API 返回的原始课程数据数组
 * @returns 转换后的课程对象数组
 */
export function transformCoursesData(coursesData: CourseVO[]): Course[] {
  // 1. 检查输入是否为数组，保证程序的健壮性
  if (!Array.isArray(coursesData)) {
    console.error('传入的课程数据不是一个数组:', coursesData);
    return [];
  }

  // 2. 遍历数组，将每个 CourseVO 对象转换为 Course 对象
  return coursesData.map(courseVO => {
    const course: Course = {
      // 直接对应的属性
      id: courseVO.id,
      name: courseVO.name,
      teacher: courseVO.teacher,
      studentCount: courseVO.studentCount,

      // 将 null 转换为 undefined，以匹配 Course 类型的可选属性 (string | undefined)
      // 使用空值合并操作符 (??) 是最安全的方式，它只会在值为 null 或 undefined 时进行转换
      description: courseVO.description ?? undefined,
      coverImageUrl: courseVO.coverImageUrl ?? undefined,
      createdAt: courseVO.createdAt ?? undefined,
      updatedAt: courseVO.updatedAt ?? undefined,

      // 添加 Course 类型中有但 CourseVO 中没有的属性，并提供默认值
      progress: 0,
    };
    return course;
  });
}