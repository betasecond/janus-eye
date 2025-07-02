<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">用户管理</h1>
  
      <!-- 操作区域 -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-2">
          <input
            type="text"
            placeholder="搜索用户..."
            class="form-input px-4 py-2 border rounded-lg"
          />
          <button class="px-4 py-2 bg-gray-200 rounded-lg">搜索</button>
        </div>
        <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          + 添加用户
        </button>
      </div>
  
      <!-- 用户表格 -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                用户名
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                角色
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                状态
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ user.id }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ user.name }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ user.role }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span :class="user.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'" class="px-2 py-1 rounded-full text-xs">{{ user.status === 'active' ? '活跃' : '禁用' }}</span>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button class="text-blue-500 hover:underline mr-2">编辑</button>
                <button @click="promptDelete(user.id)" class="text-red-500 hover:underline">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- 删除确认模态框 -->
      <Modal
        :show="showDeleteModal"
        @close="cancelDelete"
        @confirm="confirmDelete"
        title="确认删除"
        confirm-button-text="确认删除"
        confirm-button-type="danger"
      >
        您确定要删除该用户吗？此操作无法撤销。
      </Modal>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Modal from '../components/base/Modal.vue';
  import { addNotification } from '@/store';
  
  const users = ref([
    { id: 'usr001', name: '张三', role: '教师', status: 'active' },
    { id: 'usr002', name: '李四', role: '学生', status: 'active' },
    { id: 'usr003', name: '王五', role: '学生', status: 'inactive' },
    { id: 'usr004', name: '赵六', role: '管理员', status: 'active' },
    { id: 'usr005', name: '孙七', role: '教师', status: 'active' },
  ]);
  
  const showDeleteModal = ref(false);
  const userToDeleteId = ref<string | null>(null);
  
  const promptDelete = (userId: string) => {
    userToDeleteId.value = userId;
    showDeleteModal.value = true;
  };
  
  const cancelDelete = () => {
    showDeleteModal.value = false;
    userToDeleteId.value = null;
  };
  
  const confirmDelete = () => {
    if (userToDeleteId.value) {
      users.value = users.value.filter(user => user.id !== userToDeleteId.value);
      addNotification({
        title: '删除成功',
        content: `用户 (ID: ${userToDeleteId.value}) 已被成功删除。`,
        type: 'success',
      });
    }
    cancelDelete();
  };
  </script>