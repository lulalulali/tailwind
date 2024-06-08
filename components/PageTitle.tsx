//用于渲染页面标题的组件，可能包含 SEO 优化和样式定义。定义了一个 PageTitle 组件，用于渲染一个页面标题。
import { ReactNode } from 'react'
//从 react 库中导入 ReactNode 类型，用于表示可以作为子节点的任意 React 元素。

interface Props {
  children: ReactNode
}
//interface Props：定义一个名为 Props 的接口，用于指定组件的属性类型。children: ReactNode：Props 接口中的 children 属性，类型为 ReactNode，表示可以传递任何 React 元素作为子节点。

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
      {children}
    </h1>
  )
  //export default function PageTitle({ children }: Props)：定义一个名为 PageTitle 的函数组件，并将其导出为默认导出。组件接受一个 Props 类型的参数，并使用解构赋值从 Props 中提取 children 属性。
  //return ( ... )：返回 JSX 元素，表示组件的渲染内容。<h1 className="...">：使用 h1 标签渲染标题，并应用一系列 Tailwind CSS 类来设置样式：text-3xl：设置文本大小为 3xl。font-extrabold：设置字体为超粗体。leading-9：设置行高为 9。tracking-tight：设置字间距为紧凑。text-gray-900 dark:text-gray-100：在浅色模式下设置文本颜色为灰色 900，在深色模式下设置文本颜色为灰色 100。sm:text-4xl sm:leading-10：在小屏幕（sm）下，设置文本大小为 4xl，行高为 10。md:text-5xl md:leading-14：在中等屏幕（md）下，设置文本大小为 5xl，行高为 14。
  //{children}：在 h1 标签内渲染传递给 PageTitle 组件的子节点。
  //PageTitle 组件接受 children 作为属性，并将其渲染为 h1 标签中的内容，同时应用了一系列 Tailwind CSS 类来设置样式。
}
