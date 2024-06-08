//用于定义页面的主要内容区域，通常应用一些全局样式。定义了一个 SectionContainer 组件，用于包装页面的主要内容区域，并应用一些全局样式。
import { ReactNode } from 'react'
//从 react 库中导入 ReactNode 类型，表示该组件可以接受任何有效的 React 子节点作为 children。

interface Props {
  children: ReactNode
}
//定义了一个 TypeScript 接口 Props，用于描述传递给 SectionContainer 组件的 props 结构。这个接口包含一个 children 属性，类型为 ReactNode。

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">{children}</section>
  )
}
//定义并导出一个名为 SectionContainer 的函数组件。
//这个组件接受 Props 作为参数，并解构出 children。
//在组件的返回值中，渲染了一个 section 元素，并将 children 作为其子元素。
//section 元素应用了一些 Tailwind CSS 类来设置样式：mx-auto: 水平居中对齐。max-w-3xl: 最大宽度为 3xl（大约 768px）。px-4: 水平内边距为 1rem（16px）。sm:px-6: 在小屏幕及以上设备上，水平内边距为 1.5rem（24px）。xl:max-w-5xl: 在超大屏幕上，最大宽度为 5xl（大约 1280px）。xl:px-0: 在超大屏幕上，水平内边距为 0。
//主要作用是创建一个具有一致样式的容器，用于包裹页面的主要内容，使得内容在不同设备上都能有良好的展示效果。
