/**
 * 兼容性 UUID 生成工具
 * 解决 crypto.randomUUID() 在非安全上下文（HTTP环境）和旧版浏览器中的兼容性问题
 * 
 * 问题说明：
 * 1. crypto.randomUUID() 只能在安全上下文（HTTPS、localhost）中使用
 * 2. 旧版浏览器可能不支持此API
 * 3. 打包部署到HTTP环境时会报错：Uncaught TypeError: crypto.randomUUID is not a function
 * 
 * 解决方案：
 * 1. 优先使用原生 crypto.randomUUID()（性能最佳、安全性最高）
 * 2. 降级到手动实现的UUID v4生成器（兼容性最佳）
 */

/**
 * 生成符合RFC 4122标准的UUID v4
 * @returns {string} UUID字符串，格式如：9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
 */
export function generateUUID(): string {
  // 优先使用原生的 crypto.randomUUID()，如果可用的话
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    try {
      return crypto.randomUUID()
    } catch (e) {
      // 如果在非安全上下文中调用会抛出DOMException，降级到手动实现
      console.warn('crypto.randomUUID() 不可用，降级到手动实现:', e)
    }
  }
  
  // 手动实现的 UUID v4 生成器
  // 符合 RFC 4122 标准，版本字段为4，变体字段为8/9/A/B
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 检查当前环境是否支持 crypto.randomUUID()
 * @returns {boolean} 是否支持原生UUID生成
 */
export function isCryptoUUIDSupported(): boolean {
  try {
    return typeof crypto !== 'undefined' && 
           typeof crypto.randomUUID === 'function' && 
           crypto.randomUUID() !== undefined
  } catch (e) {
    return false
  }
}

/**
 * 获取当前使用的UUID生成方式
 * @returns {string} 'native' | 'polyfill'
 */
export function getUUIDGenerationMethod(): 'native' | 'polyfill' {
  return isCryptoUUIDSupported() ? 'native' : 'polyfill'
}

// 默认导出生成函数
export default generateUUID