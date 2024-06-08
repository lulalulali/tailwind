//定义标签组件，用于显示文章或内容的分类标签，通常是点击可跳转到相关标签页。定义了一个 Tag 组件，用于显示文章或内容的分类标签。标签通常是可点击的，并会跳转到相关标签页。Tag 组件的主要作用是显示文章或内容的分类标签，用户点击该标签后会跳转到相应的标签页。这使得用户可以方便地查看所有属于同一标签的内容。通过使用 slug 函数，标签的 URL 友好且易于访问。

import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}
//从 next/link 导入 Link 组件，用于创建可点击的链接。从 github-slugger 导入 slug 函数，用于生成 URL 友好的标签名称。
//定义一个 TypeScript 接口 Props，指定 Tag 组件的 props 结构。这个接口包含一个 text 属性，该属性的类型为 string。  就是说在tag界面生成一串link链接.

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}
//定义一个名为 Tag 的函数组件，使用解构赋值从 props 中提取 text 属性。
//组件返回一个 Link 元素：href={/tags/${slug(text)}}: 生成一个指向 /tags/[slug] 的链接，slug(text) 将标签文本转换为 URL 友好的形式。className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400": 应用了一组 Tailwind CSS 类，添加样式：mr-3: 右边距。text-sm: 小字号文本。font-medium: 中等粗细的字体。uppercase: 全部大写。text-primary-500: 主颜色文本。hover:text-primary-600: 悬停时变为稍深的主颜色文本。dark:hover:text-primary-400: 在暗模式下悬停时变为稍浅的主颜色文本。{text.split(' ').join('-')}: 标签文本，空格替换为连字符。

export default Tag
//导出 Tag 组件，以便在其他文件中可以导入并使用。
