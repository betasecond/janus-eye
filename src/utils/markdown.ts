import { marked } from 'marked';

// 配置marked选项
marked.setOptions({
  breaks: true, // 支持换行
  gfm: true,    // 支持GitHub风格的Markdown
});

/**
 * 解析Markdown文本为HTML
 */
export const parseMarkdown = async (text: string): Promise<string> => {
  try {
    const result = await marked(text);
    return result;
  } catch (error) {
    console.error('Markdown parsing error:', error);
    // 如果解析失败，返回原始文本
    return text.replace(/\n/g, '<br>');
  }
};

/**
 * 同步解析Markdown文本为HTML
 */
export const parseMarkdownSync = (text: string): string => {
  try {
    // 使用简单的正则表达式进行基本的Markdown解析
    return text
      // 标题
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-700 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-800 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 mb-4">$1</h1>')
      // 粗体
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      // 斜体
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>')
      // 行内代码
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      // 代码块
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 rounded-lg p-4 overflow-x-auto"><code class="text-sm">$1</code></pre>')
      // 链接
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // 无序列表
      .replace(/^\s*[-*+]\s+(.*$)/gim, '<li class="text-gray-700">$1</li>')
      // 有序列表
      .replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="text-gray-700">$1</li>')
      // 引用
      .replace(/^\s*>\s+(.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 mb-3 bg-blue-50 italic text-gray-700">$1</blockquote>')
      // 水平线
      .replace(/^\s*---+\s*$/gm, '<hr class="my-4 border-gray-300">')
      // 换行
      .replace(/\n/g, '<br>');
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return text.replace(/\n/g, '<br>');
  }
};

/**
 * 安全地解析Markdown，防止XSS攻击
 */
export const parseMarkdownSafe = async (text: string): Promise<string> => {
  try {
    // 先进行基本的XSS防护
    const sanitizedText = text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '');
    
    const result = await marked(sanitizedText);
    return result;
  } catch (error) {
    console.error('Safe markdown parsing error:', error);
    return text.replace(/\n/g, '<br>');
  }
};

/**
 * 提取纯文本（去除Markdown标记）
 */
export const extractPlainText = (markdown: string): string => {
  try {
    // 移除Markdown标记
    return markdown
      .replace(/#{1,6}\s+/g, '') // 移除标题
      .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体
      .replace(/\*(.*?)\*/g, '$1') // 移除斜体
      .replace(/`(.*?)`/g, '$1') // 移除行内代码
      .replace(/```[\s\S]*?```/g, '') // 移除代码块
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接
      .replace(/^\s*[-*+]\s+/gm, '') // 移除无序列表
      .replace(/^\s*\d+\.\s+/gm, '') // 移除有序列表
      .replace(/^\s*>\s+/gm, '') // 移除引用
      .replace(/^\s*\|.*\|.*$/gm, '') // 移除表格
      .replace(/^\s*---+\s*$/gm, '') // 移除水平线
      .trim();
  } catch (error) {
    console.error('Text extraction error:', error);
    return markdown;
  }
}; 