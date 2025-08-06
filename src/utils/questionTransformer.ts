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

/**
 * 解析复杂的后端数据结构
 * 处理包含JSON字符串的content字段和LinkedHashMap格式的options字段
 */
export function parseComplexQuestionData(rawData: any): Question[] {
  console.log('Parsing complex question data:', rawData);
  
  // 检查是否是PageVO格式
  if (rawData && typeof rawData === 'object' && 'content' in rawData) {
    const pageData = rawData.content;
    
    // 如果content是数组，且包含类型信息
    if (Array.isArray(pageData) && pageData.length > 0) {
      // 提取实际的题目数据（跳过类型信息）
      const questions = pageData.filter((item, index) => {
        // 跳过类型信息（通常是字符串）
        return typeof item !== 'string' && item && typeof item === 'object';
      });
      
      return questions.map(question => parseSingleQuestion(question));
    }
  }
  
  // 如果不是PageVO格式，尝试直接解析
  if (Array.isArray(rawData)) {
    return rawData.map(question => parseSingleQuestion(question));
  }
  
  console.error('Unsupported data format:', rawData);
  return [];
}

/**
 * 解析单个题目数据
 */
function parseSingleQuestion(questionData: any): Question {
  console.log('Parsing single question:', questionData);
  
  // 解析content字段（可能是JSON字符串）
  let title = '未提供题干内容';
  let options: string[] = [];
  
  if (questionData.content) {
    try {
      // 尝试解析content为JSON
      const contentObj = typeof questionData.content === 'string' 
        ? JSON.parse(questionData.content) 
        : questionData.content;
      
      if (contentObj.title) {
        title = contentObj.title;
      }
      
      if (contentObj.options && Array.isArray(contentObj.options)) {
        options = contentObj.options;
      }
    } catch (e) {
      console.warn('Failed to parse content JSON:', e);
      // 如果解析失败，直接使用content作为title
      title = questionData.content;
    }
  }
  
  // 解析options字段（可能是LinkedHashMap格式）
  if (!options.length && questionData.options) {
    try {
      if (Array.isArray(questionData.options) && questionData.options.length > 1) {
        // 跳过类型信息，获取实际的options对象
        const optionsObj = questionData.options[1];
        if (optionsObj && typeof optionsObj === 'object') {
          // 将对象转换为数组
          options = Object.values(optionsObj);
        }
      } else if (typeof questionData.options === 'object') {
        // 直接是对象格式
        options = Object.values(questionData.options);
      }
    } catch (e) {
      console.warn('Failed to parse options:', e);
    }
  }
  
  // 解析correctAnswer字段
  let correctAnswer: string | number = '';
  if (questionData.correctAnswer) {
    try {
      const answerObj = typeof questionData.correctAnswer === 'string' 
        ? JSON.parse(questionData.correctAnswer) 
        : questionData.correctAnswer;
      
      if (answerObj.answer !== undefined) {
        correctAnswer = answerObj.answer;
      }
    } catch (e) {
      console.warn('Failed to parse correctAnswer:', e);
    }
  }
  
  return {
    id: questionData.id || '',
    type: questionData.type || 'SINGLE_CHOICE',
    difficulty: questionData.difficulty || 'EASY',
    content: title,
    title: title,
    options: options,
    correctAnswer: correctAnswer,
    explanation: questionData.explanation || undefined,
    knowledgePoints: questionData.knowledgePoints || [],
    creator: questionData.creator || undefined,
    createdAt: questionData.createdAt || undefined,
    updatedAt: questionData.updatedAt || undefined
  };
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