import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import { globalTracking, trackClickDirective } from './services/globalTracking'

const app = createApp(App)

// 注册全局跟踪指令
app.directive('track-click', trackClickDirective)

// 路由守卫，自动跟踪页面浏览
router.beforeEach((to, _from, next) => {
  const pageName = to.name as string || to.path
  globalTracking.setCurrentPage(pageName)
  next()
})

app.use(router).use(i18n).mount('#app')
