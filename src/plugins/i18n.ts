import { createI18n } from 'vue-i18n'
import zhCN from '../locales/zh-CN.json'
import enUS from '../locales/en-US.json'

// 定义支持的语言列表
export const SUPPORTED_LOCALES = [
  { code: 'zh-CN', name: '中文' },
  { code: 'en-US', name: 'English' }
]

// 默认语言
export const DEFAULT_LOCALE = 'zh-CN'

// 消息对象
const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'en-US',
  messages
})

export default i18n