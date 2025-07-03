import { ref, readonly } from 'vue';
import type { User, ToastNotification } from './types';
import { mockUser } from './data/mockData';

// This is a simple global state management for the demo.
// In a real application, you would use a more robust solution like Pinia or Vuex.

// --- User Management ---
export const currentUser = ref<User | null>(null);

export const setCurrentUser = (role: 'teacher' | 'student' | 'admin') => {
  // 创建新的用户对象
  const baseUser = {
    id: '1',
    email: `${role}@example.com`,
    avatar: role === 'teacher' 
      ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face'
      : role === 'student'
      ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    role: role
  };

  switch (role) {
    case 'teacher':
      currentUser.value = { ...baseUser, name: '张老师' };
      break;
    case 'student':
      currentUser.value = { ...baseUser, name: '李小明' };
      break;
    case 'admin':
      currentUser.value = { ...baseUser, name: '王管理员' };
      break;
  }
};

// --- Notification Management ---
const notifications = ref<ToastNotification[]>([]);

let notificationId = 0;

export const addNotification = (notification: Omit<ToastNotification, 'id'>) => {
  const id = notificationId++;
  notifications.value.push({ ...notification, id });

  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }, 5000); // Remove after 5 seconds
};

export const useNotifications = () => {
  return {
    notifications: readonly(notifications),
  };
}; 