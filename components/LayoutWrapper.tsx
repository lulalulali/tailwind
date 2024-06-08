//作为一个布局包装器组件，用于包裹页面内容，应用统一的布局结构，如页头、页脚、侧边栏等。定义了一个 LayoutWrapper 组件，它负责将页面内容包装在一个统一的布局中，包括页头 (Header)、页脚 (Footer)，以及主要内容区域 (main)。这个布局组件使用了 Inter 字体，并且采用了 next/font/google 模块来引入和配置该字体。

import { Inter } from 'next/font/google'
//字体导入和配置,从 next/font/google 模块导入 Inter 字体，并通过 Inter 函数来配置该字体。
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'
//导入了 SectionContainer、Footer、Header 组件，以及 ReactNode 类型。

interface Props {
  children: ReactNode
}
//定义了 Props 接口，规定 LayoutWrapper 组件接受一个 children 属性，该属性的类型为 ReactNode。

const inter = Inter({
  subsets: ['latin'],
})
//这里指定了 subsets 为 'latin'，表示只加载拉丁字符集的字体子集。

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
  //定义layoutwrapper组件-结构：SectionContainer：外层容器组件，用于包裹整个布局。div：使用了 Inter 字体的类名（通过 inter.className 获取）和 Tailwind CSS 的一些实用类，创建一个全屏高度的 flex 布局，主轴为垂直方向。Header：页头组件。main：主要内容区域，包含传递给 LayoutWrapper 的子元素（children）。Footer：页脚组件。
  //类名和样式：flex h-screen flex-col justify-between font-sans：使用了 Tailwind CSS 类名，使 div 具有全屏高度，垂直方向排列子元素，且内容在垂直方向上分布在开始和结束位置之间，并且使用无衬线字体。mb-auto：在 main 元素上使用该类，使其在 flex 布局中占据剩余空间。
}

export default LayoutWrapper
