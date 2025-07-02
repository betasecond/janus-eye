import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import RoleSelection from '@/views/RoleSelection.vue';
import Dashboard from '@/views/Dashboard.vue';
import Syllabus from '@/views/Syllabus.vue';
import Overview from '@/views/Overview.vue';
import Question from '@/views/Question.vue';
import Home from '@/views/Home.vue';
import UserManagement from '@/views/UserManagement.vue';
import ResourceManagement from '@/views/ResourceManagement.vue';
import MyAssignments from '@/views/MyAssignments.vue';
import PracticeCenter from '@/views/PracticeCenter.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/select-role',
    name: 'RoleSelection',
    component: RoleSelection,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/syllabus',
    name: 'Syllabus',
    component: Syllabus,
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview,
  },
  {
    path: '/question',
    name: 'Question',
    component: Question,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin/users',
    name: 'UserManagement',
    component: UserManagement,
  },
  {
    path: '/admin/resources',
    name: 'ResourceManagement',
    component: ResourceManagement,
  },
  {
    path: '/assignments',
    name: 'MyAssignments',
    component: MyAssignments,
  },
  {
    path: '/practice',
    name: 'PracticeCenter',
    component: PracticeCenter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 