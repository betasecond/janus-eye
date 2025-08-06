import type { Question, QuestionVO, PageVO, Course, CourseVO } from '@/types'

/**
 * 解析单个题目数据，将其从 VO (View Object) 转换为前端应用的 Question 类型
 */
function transformSingleQuestion(questionVO: any): Question {
    console.log("Transforming single question:", questionVO);
    
    // 如果是数组格式，取第二个元素（保持向后兼容）
    // 否则直接使用传入的对象（新的标准格式）
    const question = Array.isArray(questionVO) ? questionVO[1] : questionVO;

    let title = '未提供题干内容';
    let options: string[] = [];

    // 解析 content 字段, 它可能是一个 JSON 字符串
    if (question.content) {
        try {
            const contentObj = JSON.parse(question.content);
            title = contentObj.title || title;
            options = contentObj.options || [];
            console.log("Parsed content JSON:", contentObj);
        } catch (e) {
            console.log("Content is not JSON, using as plain text:", question.content);
            // 如果 content 不是合法的 JSON，直接将其作为 title
            title = question.content;
        }
    }
  
    // 解析 options 字段, 它可能是 LinkedHashMap 格式
    if (question.options && Array.isArray(question.options) && question.options.length > 1) {
        const optionsMap = question.options[1];
        if (typeof optionsMap === 'object' && optionsMap !== null) {
            options = Object.values(optionsMap);
        }
    }
  
    // 解析 correctAnswer 字段, 它可能是一个 JSON 字符串
    let correctAnswer: string | number = '';
    if (question.correctAnswer) {
      try {
        const answerObj = JSON.parse(question.correctAnswer);
        correctAnswer = answerObj.answer || question.correctAnswer;
        console.log("Parsed correctAnswer JSON:", answerObj);
      } catch (e) {
        console.log("CorrectAnswer is not JSON, using as plain text:", question.correctAnswer);
        // 如果不是 JSON，直接使用原值
        correctAnswer = question.correctAnswer;
      }
    }
  
    const transformedQuestion = {
      id: question.id,
      type: question.type,
      difficulty: question.difficulty,
      content: title, // content 字段现在是解析后的题干
      title: title, // title 字段用于显示
      options: options,
      correctAnswer: correctAnswer,
      explanation: question.explanation ?? undefined,
      knowledgePoints: question.knowledgePoints || [],
      creator: question.creator ?? undefined,
      createdAt: question.createdAt ?? undefined,
      updatedAt: question.updatedAt ?? undefined,
    };
    
    console.log("Final transformed question:", transformedQuestion);
    return transformedQuestion;
}


/**
 * 解析分页后的题目列表API响应
 * @param apiResponse - 来自 getQuestions 的原始 API 响应
 * @returns 一个包含题目数组、总页数和当前页码的对象
 */
export function parsePaginatedQuestions(apiResponse: any): { questions: Question[], totalPages: number, currentPage: number } {
    console.log("1. Starting to parse API Response:", apiResponse);

    let pageVO: any;

    // 检查是否是 success/data 包装的格式
    if (apiResponse && apiResponse.success && Array.isArray(apiResponse.data) && apiResponse.data.length > 1) {
        console.log("2a. Detected success/data wrapper.");
        pageVO = apiResponse.data[1];
    } 
    // 检查是否是直接的 PageVO 格式
    else if (apiResponse && 'content' in apiResponse) {
        console.log("2b. Detected direct PageVO object.");
        pageVO = apiResponse;
    } 
    // 如果两种都不是，则无法解析
    else {
        console.warn("2c. Unsupported API response structure.", apiResponse);
        return { questions: [], totalPages: 0, currentPage: 0 };
    }

    try {
        // 处理标准分页响应格式：content 直接是题目数组
        if (pageVO && Array.isArray(pageVO.content)) {
            console.log("3. Found standard pagination response with content array.");
            const questionList = pageVO.content;

            if (questionList.length > 0) {
                console.log("4. Found question list. Starting transformation.", questionList);
                const questions = questionList.map(transformSingleQuestion);
                console.log("5. Successfully parsed questions:", questions);
                return {
                    questions,
                    totalPages: pageVO.totalPages || 1,
                    currentPage: pageVO.number || 0,
                };
            } else {
                console.log("4b. Question list is empty.");
                return {
                    questions: [],
                    totalPages: pageVO.totalPages || 1,
                    currentPage: pageVO.number || 0,
                };
            }
        }
        // 处理旧格式：content[1] 嵌套结构（向后兼容）
        else if (pageVO && Array.isArray(pageVO.content) && pageVO.content.length > 1) {
            console.log("3b. Found legacy nested structure.");
            const questionList = pageVO.content[1];

            if (Array.isArray(questionList)) {
                console.log("4c. Found nested question list.", questionList);
                const questions = questionList.map(transformSingleQuestion);
                console.log("5c. Successfully parsed questions from nested structure:", questions);
                return {
                    questions,
                    totalPages: pageVO.totalPages,
                    currentPage: pageVO.number,
                };
            } else {
                console.warn("4d. Nested questionList is not an array.", questionList);
            }
        } else {
             console.warn("3c. PageVO content check failed.", pageVO ? pageVO.content : 'pageVO is null');
        }
    } catch (error) {
        console.error("X. Caught an error during parsing:", error, apiResponse);
    }
    
    console.warn("Z. Returning empty questions array due to parsing failure.");
    return { questions: [], totalPages: 0, currentPage: 0 };
}


/**
 * 解析课程列表的 API 响应
 * @param apiResponse - 来自 getCourses 的原始 API 响应
 * @returns Course[] 类型的课程数组
 */
export function parseCourseList(apiResponse: any): Course[] {
    if (!apiResponse) return [];

    let courseList: any[] = [];

    // Case 1: Standard success/data wrapper
    if (apiResponse.success && Array.isArray(apiResponse.data) && apiResponse.data.length > 1) {
        courseList = apiResponse.data[1];
    }
    // Case 2: Direct array with type info
    else if (Array.isArray(apiResponse) && apiResponse.length > 1 && typeof apiResponse[0] === 'string') {
        courseList = apiResponse[1];
    }
    // Case 3: Direct PageVO object
    else if (apiResponse.content) {
        courseList = apiResponse.content
    }
    else {
        return [];
    }

    return courseList.map((courseItem: any) => {
        const course = Array.isArray(courseItem) ? courseItem[1] : courseItem;
        return {
            ...course,
            description: course.description ?? undefined,
            coverImageUrl: course.coverImageUrl ?? undefined,
            createdAt: course.createdAt ?? undefined,
            updatedAt: course.updatedAt ?? undefined,
            progress: 0, // Default value
        };
    });
}

// --- 以下是旧的或用于其他地方的函数，暂时保留 ---

export function transformQuestionData(questionData: QuestionVO | any): Question {
  if (!questionData) {
    console.warn('Empty question data provided to transformQuestionData');
    return {} as Question;
  }
  
  const transformedQuestion: Question = {
    ...questionData,
    title: questionData.content || '未提供题干内容'
  }
  
  if (transformedQuestion.explanation === null) {
    transformedQuestion.explanation = undefined;
  }
  
  if (questionData.type === 'SINGLE_CHOICE' || questionData.type === 'MULTIPLE_CHOICE') {
    transformedQuestion.options = ['选项A', '选项B', '选项C', '选项D']
    transformedQuestion.correctAnswer = 'A'
  } else if (questionData.type === 'TRUE_FALSE') {
    transformedQuestion.options = ['正确', '错误']
    transformedQuestion.correctAnswer = '正确'
  } else if (questionData.type === 'FILL_IN_BLANK') {
    transformedQuestion.correctAnswer = '答案示例'
  } else if (questionData.type === 'SHORT_ANSWER') {
    transformedQuestion.correctAnswer = '参考答案示例'
  }
  
  return transformedQuestion
}

export function transformQuestionsData(questionsData: QuestionVO[] | any[] | string): Question[] {
  if (typeof questionsData === 'string') {
    try {
      questionsData = JSON.parse(questionsData);
    } catch (e) {
      console.error('Failed to parse question data string:', e);
      return [];
    }
  }
  
  if (!Array.isArray(questionsData)) {
    console.error('Questions data is not an array:', questionsData);
    return [];
  }
  
  return questionsData.map((question, index) => {
    try {
      return transformQuestionData(question);
    } catch (error) {
      console.error(`Error transforming question at index ${index}:`, error);
      return {} as Question;
    }
  });
}

export function parseComplexQuestionData(apiResponse: any): Question[] {
    console.log('parseComplexQuestionData 接收到的响应:', apiResponse);
    
    if (!apiResponse) {
      console.error('API response is null or undefined.');
      return [];
    }
  
    // 处理 success/data 包装格式
    if (apiResponse.success && apiResponse.data) {
      if (Array.isArray(apiResponse.data) && apiResponse.data.length > 1) {
        return parseComplexQuestionData(apiResponse.data[1]);
      }
    }
  
    // 处理标准分页响应格式：content 直接是题目数组
    if (typeof apiResponse === 'object' && 'content' in apiResponse && Array.isArray(apiResponse.content)) {
      console.log('找到标准分页响应，content长度:', apiResponse.content.length);
      const questionList = apiResponse.content;
  
      if (questionList.length > 0) {
        console.log('开始转换题目列表:', questionList);
        const transformedQuestions = questionList.map(transformSingleQuestion);
        console.log('转换完成的题目:', transformedQuestions);
        return transformedQuestions;
      } else {
        console.log('题目列表为空');
        return [];
      }
    }
    
    // 向后兼容：处理旧的嵌套格式 content[1]
    if (typeof apiResponse === 'object' && 'content' in apiResponse && Array.isArray(apiResponse.content) && apiResponse.content.length > 1) {
      console.log('使用向后兼容的嵌套格式');
      const questionList = apiResponse.content[1];
  
      if (Array.isArray(questionList)) {
        return questionList.map(transformSingleQuestion);
      }
    }
    
    console.warn('Unsupported API response structure:', apiResponse);
    return [];
}
  
export function transformCoursesData(coursesData: CourseVO[]): Course[] {
  if (!Array.isArray(coursesData)) {
    console.error('传入的课程数据不是一个数组:', coursesData);
    return [];
  }

  return coursesData.map(courseVO => {
    const course: Course = {
      ...courseVO,
      description: courseVO.description ?? undefined,
      coverImageUrl: courseVO.coverImageUrl ?? undefined,
      createdAt: courseVO.createdAt ?? undefined,
      updatedAt: courseVO.updatedAt ?? undefined,
      progress: 0,
    };
    return course;
  });
}
