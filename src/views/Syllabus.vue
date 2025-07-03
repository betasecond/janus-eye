<template>
  <div v-if="syllabus" class="flex-1 flex gap-6 p-4 md:p-6 lg:p-8 animate-fade-in">
    <!-- Left Panel: Syllabus Chapters -->
    <div class="w-96 flex-shrink-0 flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-800">课程大纲</h1>
        <button @click="handleGenerateSyllabus" class="p-2 rounded-full hover:bg-gray-200 transition-colors" title="AI一键生成大纲">
          <Icon name="magicWand" size="20" class="text-blue-500" />
        </button>
      </div>

      <div class="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 flex-1">
        <!-- Course Selector -->
        <div class="mb-4">
          <select class="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl transition-all duration-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none text-gray-800 font-medium">
            <option v-for="course in courses" :key="course.id">{{ course.name }}</option>
          </select>
        </div>

        <!-- Chapters List -->
        <div class="space-y-2">
          <div 
            v-for="chapter in syllabus.chapters" :key="chapter.id" 
            @click="selectChapter(chapter)"
            class="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200"
            :class="{ 
              'bg-gray-800 text-white shadow-lg scale-105': selectedChapter && selectedChapter.id === chapter.id,
              'bg-white hover:bg-white hover:shadow-md': !(selectedChapter && selectedChapter.id === chapter.id)
            }"
          >
            <div 
              class="flex items-center justify-center rounded-lg shrink-0 size-12 transition-all duration-200"
              :class="{
                'bg-white/10': selectedChapter && selectedChapter.id === chapter.id,
                'bg-gray-100': !(selectedChapter && selectedChapter.id === chapter.id)
              }"
            >
              <Icon name="book" size="24" :class="selectedChapter && selectedChapter.id === chapter.id ? 'text-white' : 'text-gray-600'" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-bold leading-normal truncate">{{ chapter.title }}</p>
              <p 
                class="text-sm font-normal leading-normal"
                :class="selectedChapter && selectedChapter.id === chapter.id ? 'text-gray-300' : 'text-gray-500'"
              >
                Chapter {{ chapter.order }}
              </p>
            </div>
             <div v-if="chapter.isCompleted" class="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs ring-2 ring-white/50">✓</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel: Chapter Details -->
    <div class="flex-1 flex flex-col">
       <div class="flex-1 flex flex-col bg-gray-50/80 rounded-2xl border border-gray-100 p-6">
        <template v-if="selectedChapter">
          <div class="border-b border-gray-200 pb-4 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">{{ selectedChapter.title }}</h3>
            <button @click="handleGenerateContent" class="action-button">
              <Icon name="magicWand" size="20" />
              <span>AI 生成内容</span>
            </button>
          </div>

          <div class="flex-1 pt-6 overflow-y-auto">
            <div v-if="isGenerating" class="flex flex-col gap-4 items-center justify-center h-full text-center">
              <div class="relative w-24 h-24">
                <div class="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                <div class="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                <div class="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-500">{{ progress }}%</div>
              </div>
              <p class="text-gray-800 text-lg font-medium">AI 正在为您生成内容...</p>
              <p class="text-gray-500 text-sm max-w-xs">这可能需要一点时间，请稍候。您可以先泡杯咖啡 ☕️</p>
            </div>

            <template v-else>
              <section class="mb-8">
                <h4 class="text-lg font-semibold text-gray-700 mb-3">知识点讲解</h4>
                <div class="prose max-w-none p-4 rounded-xl bg-white border border-gray-200">
                  <textarea 
                    class="form-input w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-gray-800 focus:outline-0 focus:ring-0 border-none bg-transparent min-h-48 p-2 text-base"
                    v-model="selectedChapter.content"
                  ></textarea>
                </div>
              </section>

              <section>
                <h4 class="text-lg font-semibold text-gray-700 mb-3">随堂练习</h4>
                <div class="space-y-3">
                  <div v-for="exercise in selectedChapter.exercises" :key="exercise.id" class="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200">
                    <div class="text-blue-500 flex items-center justify-center rounded-lg bg-blue-50 shrink-0 size-10">
                      <Icon name="listBullets" size="20" />
                    </div>
                    <p class="text-gray-800 font-medium leading-normal flex-1 truncate">{{ exercise.title }}</p>
                    <button class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <Icon name="caretDown" size="16" />
                    </button>
                  </div>
                </div>
              </section>
            </template>
          </div>
        </template>
        <div v-else class="flex flex-1 items-center justify-center text-center text-gray-500 p-8">
           <div class="flex flex-col items-center gap-4">
            <Icon name="bookmark" size="48" class="text-gray-300" />
            <h3 class="text-xl font-semibold">请选择一个章节</h3>
            <p>从左侧选择一个章节以查看详细内容或生成AI辅助教学材料。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex-1 flex items-center justify-center">
    <div class="flex flex-col items-center gap-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p class="text-gray-500">正在加载课程大纲...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Syllabus, Chapter, Course } from '@/types'
import { getSyllabus, getCourses } from '@/api'
import Icon from '@/components/base/Icon.vue'
import { addNotification } from '@/store'

const loading = ref(true)
const syllabus = ref<Syllabus | null>(null)
const courses = ref<Course[]>([])
const selectedChapter = ref<Chapter | null>(null)
const isGenerating = ref(false)
const progress = ref(0)

onMounted(async () => {
  try {
    syllabus.value = await getSyllabus()
    courses.value = await getCourses()
  } catch (error) {
    console.error("Failed to load syllabus data:", error)
    addNotification({
      title: '加载失败',
      content: '无法加载课程大纲数据，请稍后重试。',
      type: 'error',
    });
  } finally {
    loading.value = false;
  }
})

const selectChapter = (chapter: Chapter) => {
  if (isGenerating.value) {
    addNotification({
      title: '提示',
      content: '请等待当前内容生成完成。',
      type: 'warning',
    });
    return;
  }
  selectedChapter.value = chapter
}

const handleGenerateSyllabus = () => {
   addNotification({
      title: '功能开发中',
      content: '一键生成整个教学大纲的功能正在加速开发中！',
      type: 'info',
    });
}

const handleGenerateContent = () => {
  if (!selectedChapter.value) {
     addNotification({
      title: '请先选择章节',
      content: '您需要先从左侧选择一个章节，然后才能生成内容。',
      type: 'warning',
    });
    return;
  }
  
  isGenerating.value = true
  progress.value = 0

  const interval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.floor(Math.random() * 10) + 1;
      if(progress.value > 90) progress.value = 90;
    }
  }, 300)

  setTimeout(() => {
    clearInterval(interval)
    progress.value = 100
    setTimeout(() => {
      isGenerating.value = false
      if(selectedChapter.value) {
        selectedChapter.value.content = `[AI 生成内容]：这是为 "${selectedChapter.value.title}" 生成的详细讲解。\n\n首先，我们来探讨该章节的核心概念...\n\n其次，关键的知识点包括：\n1. ...\n2. ...\n3. ...\n\n最后，让我们通过一些例子来加深理解...`
        addNotification({
          title: '操作成功',
          content: `"${selectedChapter.value.title}"的AI内容已成功生成并填充。`,
          type: 'success',
        })
      }
    }, 500)
  }, 3500)
}
</script>

<style scoped>
.prose {
  line-height: 1.7;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--spacing) * 2);
  height: calc(var(--spacing) * 10);
  padding: 0 calc(var(--spacing) * 4);
  border-radius: var(--radius-xl);
  background-color: var(--color-gray-800);
  color: var(--color-white);
  font-weight: 700;
  font-size: var(--text-sm);
  box-shadow: var(--shadow-lg);
  transition: all 200ms;
  transform: scale(1);
}

.action-button:hover {
  background-color: var(--color-gray-700);
  transform: scale(1.05);
}

.action-button:active {
  transform: scale(0.95);
}
</style>