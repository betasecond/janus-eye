<template>
  <div class="p-4 flex flex-col gap-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">题目管理</h1>
        <p class="text-gray-500 mt-1">在这里创建、编辑和管理您的所有题目。</p>
      </div>
      <button @click="openNewQuestionModal" class="flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95">
        <Icon name="magicWand" size="20" />
        <span>新建题目</span>
      </button>
    </div>

    <!-- Filters & Search -->
    <Card title="筛选与搜索" class="!p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- 课程选择 -->
        <select class="filter-select">
          <option>所有课程</option>
          <option v-for="course in courses" :key="course.id">{{ course.name }}</option>
        </select>
        <!-- 题型选择 -->
        <select class="filter-select">
          <option>所有题型</option>
          <option value="multiple-choice">选择题</option>
          <option value="true-false">判断题</option>
          <option value="short-answer">简答题</option>
        </select>
        <!-- 难度选择 -->
        <select class="filter-select">
          <option>所有难度</option>
          <option value="easy">简单</option>
          <option value="medium">中等</option>
          <option value="hard">困难</option>
        </select>
        <!-- 搜索框 -->
        <div class="relative">
          <Icon name="search" size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="搜索题干..." class="pl-10 filter-select" />
        </div>
      </div>
    </Card>

    <!-- Question List -->
    <div v-if="!loading">
      <div v-if="filteredQuestions.length > 0" class="space-y-4">
        <Card v-for="(question, index) in filteredQuestions" :key="question.id" :title="`问题 ${index + 1}`" 
            class="question-card overflow-hidden !p-0 animate-slide-in-up" 
            :style="`animation-delay: ${index * 0.05}s`"
        >
          <div class="p-6">
            <p class="text-gray-800 font-semibold leading-relaxed">{{ question.title }}</p>
            <div v-if="question.options" class="mt-4 space-y-2">
              <div v-for="(option, i) in question.options" :key="i" class="flex items-center gap-3">
                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600 font-mono text-sm">{{ String.fromCharCode(65 + i) }}</span>
                <span class="text-gray-700">{{ option }}</span>
              </div>
            </div>
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <span class="tag bg-blue-100 text-blue-700">{{ question.type }}</span>
              <span class="tag" :class="{
                'bg-green-100 text-green-700': question.difficulty === 'easy',
                'bg-yellow-100 text-yellow-700': question.difficulty === 'medium',
                'bg-red-100 text-red-700': question.difficulty === 'hard',
              }">
                {{ question.difficulty }}
              </span>
            </div>
          </div>
          <div class="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
            <button @click="toggleQuestion(question.id)" class="text-sm font-medium text-blue-600 hover:underline">
              {{ selectedQuestionId === question.id ? '收起解析' : '查看解析' }}
            </button>
            <div class="flex items-center gap-2">
              <button class="p-2 rounded-full hover:bg-gray-200 transition-colors"><Icon name="file" size="16" /></button>
              <button class="p-2 rounded-full hover:bg-gray-200 transition-colors"><Icon name="user" size="16" /></button>
            </div>
          </div>
          <!-- Answer Section -->
          <transition name="fade-expand">
            <div v-if="selectedQuestionId === question.id" class="px-6 pb-6 border-t border-gray-100 bg-gray-50/50">
              <p class="mt-4 font-semibold text-gray-700">正确答案: <span class="text-green-600">{{ question.correctAnswer }}</span></p>
              <p v-if="question.explanation" class="mt-2 text-gray-600 prose prose-sm max-w-none">{{ question.explanation }}</p>
            </div>
          </transition>
        </Card>
      </div>
       <div v-else class="text-center py-16 text-gray-500">
        <Icon name="search" size="48" class="mx-auto text-gray-300" />
        <h3 class="mt-4 text-xl font-semibold">未找到题目</h3>
        <p>尝试调整您的筛选条件或创建一个新题目。</p>
      </div>
    </div>
    
    <!-- Loading Skeleton -->
    <div v-else class="space-y-4">
      <div v-for="i in 3" :key="i" class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="space-y-2">
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Question, Course } from '@/types';
import { getQuestions, getCourses } from '@/api';
import Icon from '@/components/base/Icon.vue';
import Card from '@/components/base/Card.vue';
import { addNotification } from '@/store';

const loading = ref(true);
const questions = ref<Question[]>([]);
const courses = ref<Course[]>([]);
const selectedQuestionId = ref<string | null>(null);

onMounted(async () => {
  try {
    [questions.value, courses.value] = await Promise.all([getQuestions(), getCourses()]);
  } catch (error) {
    addNotification({ title: '加载失败', content: '无法加载题目数据', type: 'error' });
  } finally {
    loading.value = false;
  }
});

// Basic filtering logic (can be expanded)
const filteredQuestions = computed(() => {
  return questions.value;
});

const toggleQuestion = (id: string) => {
  if (selectedQuestionId.value === id) {
    selectedQuestionId.value = null;
  } else {
    selectedQuestionId.value = id;
  }
};

const openNewQuestionModal = () => {
  addNotification({ title: '功能提示', content: '创建新题目的模态框功能待实现。', type: 'info' });
};
</script>

<style scoped>
.filter-select {
  @apply w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl transition-all duration-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none;
}

.tag {
  @apply px-3 py-1 text-xs font-medium rounded-full;
}

.question-card {
  transition: all 0.3s ease;
}

.fade-expand-enter-active,
.fade-expand-leave-active {
  transition: all 0.4s ease-in-out;
  overflow: hidden;
}

.fade-expand-enter-from,
.fade-expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
}

.fade-expand-enter-to,
.fade-expand-leave-from {
  opacity: 1;
  max-height: 200px; /* Adjust as needed */
  transform: translateY(0);
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-up {
  animation: slide-in-up 0.5s ease-out forwards;
  animation-fill-mode: both;
}
</style> 