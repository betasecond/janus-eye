<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">资源管理</h1>

    <!-- 资源卡片网格 -->
    <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="resource in resources" :key="resource.id" class="bg-white rounded-lg shadow overflow-hidden group">
        <div class="relative pb-[60%]">
          <img :src="resource.thumbnail" alt="Resource thumbnail" class="absolute h-full w-full object-cover">
        </div>
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2">{{ resource.title }}</h3>
          <p class="text-gray-600 text-sm mb-1">类型: {{ resource.type }} | 学科: {{ resource.subject }}</p>
          <p class="text-gray-500 text-sm mb-4">上传者: {{ resource.uploader }} | 日期: {{ resource.uploadDate }}</p>
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
    <div v-else>
      <p>Loading resources...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Icon from '../components/base/Icon.vue';
import { getResources } from '@/api';
import type { Resource } from '@/types';

const resources = ref<Resource[]>([]);
const loading = ref(true);

onMounted(async () => {
  resources.value = await getResources();
  loading.value = false;
});
</script> 