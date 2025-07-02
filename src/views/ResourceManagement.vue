<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">资源管理</h1>

    <!-- 资源卡片网格 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="resource in resources" :key="resource.id" class="bg-white rounded-lg shadow overflow-hidden group">
        <div class="relative pb-[60%]">
          <img :src="resource.thumbnail" alt="Resource thumbnail" class="absolute h-full w-full object-cover">
        </div>
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2">{{ resource.title }}</h3>
          <p class="text-gray-600 text-sm mb-4">类型: {{ resource.type }} | 上传者: {{ resource.uploader }}</p>
          <div class="flex justify-end gap-2">
            <button class="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <Icon name="eye" size="20" />
            </button>
            <button class="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <Icon name="download" size="20" />
            </button>
            <button class="p-2 rounded-full hover:bg-gray-200 transition-colors text-red-500">
              <Icon name="trash" size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Icon from '../components/base/Icon.vue';

const resources = ref([
  { id: 'res001', title: '计算机科学导论.ppt', type: 'PPT', uploader: '张老师', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop' },
  { id: 'res002', title: '期中考试试卷.pdf', type: '试卷', uploader: '张老师', thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop' },
  { id: 'res003', title: 'Python编程练习.docx', type: '文档', uploader: '李老师', thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop' },
  { id: 'res004', title: '数据结构视频.mp4', type: '视频', uploader: '王老师', thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop' },
]);
</script> 