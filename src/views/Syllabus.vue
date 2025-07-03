<template>
  <div v-if="syllabus" class="flex-1 flex gap-6 p-4 animate-fade-in">
    <!-- Left Panel: Syllabus Chapters -->
    <div class="w-96 flex-shrink-0 flex flex-col gap-4 animate-slide-in-left">
      <div class="flex justify-between items-center p-2">
        <h2 class="text-2xl font-bold text-gray-800">课程大纲</h2>
        <button @click="handleGenerateSyllabus" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Icon name="magicWand" size="20" class="text-blue-500" />
        </button>
      </div>

      <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-lg flex-1">
        <!-- Course Selector -->
        <div class="mb-4">
          <select class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-800 focus:outline-0 focus:ring-2 focus:ring-blue-300 border border-gray-200 bg-gray-50 h-12 p-3 text-base font-medium leading-normal transition-all duration-200">
            <option v-for="course in courses" :key="course.id">{{ course.name }}</option>
          </select>
        </div>

        <!-- Chapters List -->
        <div class="space-y-2">
          <div 
            v-for="chapter in syllabus.chapters" :key="chapter.id" 
            @click="selectChapter(chapter)"
            class="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2"
            :class="{ 
              'bg-blue-500 text-white shadow-lg border-blue-500 scale-105': selectedChapter && selectedChapter.id === chapter.id,
              'bg-gray-50 hover:bg-white hover:border-blue-300 hover:shadow-md border-transparent': !(selectedChapter && selectedChapter.id === chapter.id)
            }"
          >
            <div 
              class="flex items-center justify-center rounded-lg shrink-0 size-12 transition-all duration-200"
              :class="{
                'bg-white/20': selectedChapter && selectedChapter.id === chapter.id,
                'bg-gray-200': !(selectedChapter && selectedChapter.id === chapter.id)
              }"
            >
              <Icon name="book" size="24" :class="selectedChapter && selectedChapter.id === chapter.id ? 'text-white' : 'text-gray-600'" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-bold leading-normal truncate">{{ chapter.title }}</p>
              <p 
                class="text-sm font-normal leading-normal"
                :class="selectedChapter && selectedChapter.id === chapter.id ? 'text-blue-100' : 'text-gray-500'"
              >
                Chapter {{ chapter.order }}
              </p>
            </div>
             <div v-if="chapter.isCompleted" class="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel: Chapter Details -->
    <div class="flex-1 flex flex-col animate-slide-in-up">
       <Card title="Chapter Details" class="flex-1 flex flex-col !p-0">
        <template v-if="selectedChapter">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">{{ selectedChapter.title }}</h3>
            <button @click="handleGenerateContent" class="flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95">
              <Icon name="magicWand" size="20" color="white" />
              <span class="truncate">AI 生成讲解与练习</span>
            </button>
          </div>

          <div class="flex-1 p-6 overflow-y-auto">
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
                <div class="prose max-w-none p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <textarea 
                    class="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-gray-800 focus:outline-0 focus:ring-0 border-none bg-transparent min-h-48 p-2 text-base"
                    v-model="selectedChapter.content"
                  ></textarea>
                </div>
              </section>

              <section>
                <h4 class="text-lg font-semibold text-gray-700 mb-3">随堂练习</h4>
                <div class="space-y-3">
                  <div v-for="exercise in selectedChapter.exercises" :key="exercise.id" class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-white transition-all duration-200">
                    <div class="text-blue-500 flex items-center justify-center rounded-lg bg-blue-100 shrink-0 size-10">
                      <Icon name="listBullets" size="20" />
                    </div>
                    <p class="text-gray-800 font-medium leading-normal flex-1 truncate">{{ exercise.title }}</p>
                    <button class="p-2 rounded-full hover:bg-gray-200 transition-colors">
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
      </Card>
    </div>
  </div>
  <div v-else class="flex-1 flex items-center justify-center">
    <!-- Loading Skeleton or Spinner -->
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
import Card from '@/components/base/Card.vue'
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
    if (syllabus.value && syllabus.value.chapters.length > 0) {
      // Don't auto-select a chapter, let user choose.
      // selectedChapter.value = syllabus.value.chapters[0];
    }
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

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out forwards;
}

.animate-slide-in-up {
  animation: slide-in-up 0.6s 0.2s ease-out forwards;
  opacity: 0; /* start hidden */
  animation-fill-mode: both;
}
</style>