import { ref, readonly } from 'vue';
import type { User, ToastNotification } from './types';
import { mockUser } from './data/mockData';

// This is a simple global state management for the demo.
// In a real application, you would use a more robust solution like Pinia or Vuex.

// --- User Management ---
export const currentUser = ref<User>(mockUser);

export const setCurrentUser = (role: 'teacher' | 'student' | 'admin') => {
  currentUser.value.role = role;
  // You might want to update other user properties here too based on the role
  switch (role) {
    case 'teacher':
      currentUser.value.name = '张老师';
      break;
    case 'student':
      currentUser.value.name = '李小明';
      break;
    case 'admin':
      currentUser.value.name = '王管理员';
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