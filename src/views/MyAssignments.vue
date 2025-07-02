<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">我的作业</h1>

    <div v-if="!loading" class="bg-white shadow rounded-lg">
      <ul>
        <li v-for="assignment in assignments" :key="assignment.id" class="border-b last:border-b-0">
          <div class="p-4 flex justify-between items-center">
            <div>
              <h3 class="font-bold text-lg">{{ assignment.title }}</h3>
              <p class="text-gray-600 text-sm">{{ assignment.description }}</p>
              <p class="text-gray-500 text-sm mt-1">截止日期: {{ assignment.dueDate }}</p>
            </div>
            <div class="flex items-center gap-4">
              <button
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                开始作业
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading assignments...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAssignments } from '@/api';
import type { Assignment } from '@/types';

const assignments = ref<Assignment[]>([]);
const loading = ref(true);

onMounted(async () => {
  assignments.value = await getAssignments();
  loading.value = false;
});
</script> 