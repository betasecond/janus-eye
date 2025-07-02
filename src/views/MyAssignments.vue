<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">我的作业</h1>

    <div class="bg-white shadow rounded-lg">
      <ul>
        <li v-for="assignment in assignments" :key="assignment.id" class="border-b last:border-b-0">
          <div class="p-4 flex justify-between items-center">
            <div>
              <h3 class="font-bold text-lg">{{ assignment.title }}</h3>
              <p class="text-gray-600 text-sm">科目: {{ assignment.subject }} | 截止日期: {{ assignment.dueDate }}</p>
            </div>
            <div class="flex items-center gap-4">
              <span 
                class="px-3 py-1 rounded-full text-sm font-semibold"
                :class="{
                  'bg-yellow-200 text-yellow-800': assignment.status === '待完成',
                  'bg-green-200 text-green-800': assignment.status === '已完成',
                  'bg-red-200 text-red-800': assignment.status === '已逾期'
                }"
              >
                {{ assignment.status }}
              </span>
              <button 
                v-if="assignment.status === '待完成'" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                开始作业
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const assignments = ref([
  { id: 'asg001', title: '第一章：代数基础', subject: '数学', dueDate: '2024-08-15', status: '待完成' },
  { id: 'asg002', title: '第二次世界大战历史测验', subject: '历史', dueDate: '2024-08-10', status: '已完成' },
  { id: 'asg003', title: '莎士比亚戏剧阅读报告', subject: '文学', dueDate: '2024-08-05', status: '已完成' },
  { id: 'asg004', title: '物理实验报告：牛顿第一定律', subject: '物理', dueDate: '2024-08-01', status: '已逾期' },
]);
</script> 