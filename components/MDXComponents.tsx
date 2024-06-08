//用于渲染 MDX 文件中的自定义组件。MDX 是一种将 Markdown 与 JSX 结合的格式，允许在 Markdown 中使用 React 组件。一个 JavaScript/TypeScript 模块，用于定义和导出一个 components 对象，该对象包含一些自定义组件的映射。这些组件将在 MDX 文件中使用。MDX 是一种将 Markdown 和 React 组件结合在一起的格式。
import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
//导入 TOCInline 组件，该组件可能用于显示文章的目录（Table of Contents）。
// 导入 Pre 组件，该组件可能用于显示预格式化文本（例如代码块）。
// 导入 BlogNewsletterForm 组件，该组件可能用于显示博客的订阅表单。
// 导入 MDXComponents 类型，用于 TypeScript 类型检查。这确保了导出的组件对象符合 MDX 组件的类型要求。
// 导入自定义的 Image 组件，可能是对 next/image 的一个封装。
// 导入自定义的 CustomLink 组件，用于处理内部和外部链接。
// 导入自定义的 TableWrapper 组件，用于处理表格的显示。

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
}

//接下来是组件映射的定义和导出：导出一个名为 components 的对象，并指定它的类型为 MDXComponents。这是一个符合 MDX 要求的组件映射对象。Image,：将 Image 组件映射为 MDX 中的 Image 标签。TOCInline,：将 TOCInline 组件映射为 MDX 中的 TOCInline 标签。a: CustomLink,：将 CustomLink 组件映射为 MDX 中的 a 标签，用于处理链接。pre: Pre,：将 Pre 组件映射为 MDX 中的 pre 标签，用于处理预格式化文本（代码块）。table: TableWrapper,：将 TableWrapper 组件映射为 MDX 中的 table 标签，用于处理表格。BlogNewsletterForm,：将 BlogNewsletterForm 组件映射为 MDX 中的 BlogNewsletterForm 标签。
