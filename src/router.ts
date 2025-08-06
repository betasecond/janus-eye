import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    // 动态导入：只有访问 /login 时，才会加载 Login.vue 对应的 JS 文件
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
  },
  {
    path: '/syllabus',
    name: 'Syllabus',
    component: () => import('@/views/Syllabus.vue'),
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import('@/views/Overview.vue'),
  },
  {
    path: '/question',
    name: 'Question',
    component: () => import('@/views/Question.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/admin/users',
    name: 'UserManagement',
    component: () => import('@/views/UserManagement.vue'),
  },
  {
    path: '/admin/resources',
    name: 'ResourceManagement',
    component: () => import('@/views/ResourceManagement.vue'),
  },
  {
    path: '/admin/analytics',
    name: 'AnalyticsDashboard',
    component: () => import('@/views/AnalyticsDashboard.vue'),
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('@/views/ResourceManagement.vue'), // 注意：这里和上面共用了一个组件
  },
  {
    path: '/assignments',
    name: 'MyAssignments',
    component: () => import('@/views/MyAssignments.vue'),
  },
  {
    path: '/practice',
    name: 'PracticeCenter',
    component: () => import('@/views/PracticeCenter.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/ai-chat',
    name: 'AIChat',
    component: () => import('@/views/AIChat.vue'),
  },
  {
    path: '/test/tracking',
    name: 'TrackingTest',
    component: () => import('@/views/TrackingTest.vue'),
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由跟踪已经在 main.ts 中通过 globalTracking 处理

export default router;
