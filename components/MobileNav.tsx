//定义移动设备上的导航菜单，通常实现汉堡菜单样式的导航。定义了一个用于移动设备的导航栏组件 MobileNav，它可以在点击按钮时显示或隐藏导航菜单。
'use client'

import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
//useState：从 React 中导入，用于在函数组件中添加状态。Link：从本地文件中导入的自定义链接组件。headerNavLinks：从数据文件中导入的导航链接数组，包含导航菜单的项。

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  //定义 MobileNav 组件
  //使用 useState 钩子定义 navShow 状态，初始值为 false。navShow 用于控制导航菜单的显示或隐藏。
  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }
  //切换导航菜单的函数:onToggleNav 函数用于切换 navShow 状态。document.body：指向当前文档的 <body> 元素。style：指向 <body> 元素的内联样式对象。overflow：CSS 属性，控制元素内容超出元素框时的处理方式。'auto'：CSS 属性值，表示浏览器将根据内容的高度自动决定是否显示滚动条。如果导航菜单显示，则恢复页面滚动，否则禁止页面滚动。
  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transform bg-white opacity-95 duration-300 ease-in-out dark:bg-gray-950 dark:opacity-[0.98] ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end">
          <button className="mr-8 mt-11 h-8 w-8" aria-label="Toggle Menu" onClick={onToggleNav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                href={link.href}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
  //返回jsx结构-一个按钮用于切换菜单的显示状态，按钮内是一个 SVG 图标（汉堡菜单图标）。一个 div 元素，用于包裹整个导航菜单。其类名根据 navShow 状态动态设置，以控制显示或隐藏效果。内部还有一个按钮，用于关闭菜单。一个导航元素 (nav)，其中包含 headerNavLinks 数组的映射，每个链接项都渲染为一个 Link 组件。
  //<>中是botton和一个div. botton里面是一个svg;div里面一个div(显示隐藏按钮)和nav.
  //{headerNavLinks.map((link) => ( ... ))}：headerNavLinks：一个包含导航链接的数组。map：数组方法，用于对数组的每个元素执行相同的操作。(link) => ( ... )：箭头函数，对 headerNavLinks 中的每个 link 对象执行代码块中的操作。
  //<div key={link.title} className="px-12 py-4">：<div>：HTML 元素，作为每个导航链接的容器。key={link.title}：React 属性，用于唯一标识每个 div，以帮助 React 识别哪些元素被改变、添加或移除。className="px-12 py-4"：设置 div 的样式，px-12 表示左右内边距，py-4 表示上下内边距。
  //<Link href={link.href} className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100" onClick={onToggleNav}>：<Link>：自定义 Link 组件，用于创建一个导航链接。href={link.href}：设置链接的目标 URL。className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"：设置链接的样式，text-2xl 表示文本大小，font-bold 表示字体加粗，tracking-widest 表示字间距，text-gray-900 dark:text-gray-100 表示不同模式下的文本颜色。onClick={onToggleNav}：当用户点击链接时，将调用 onToggleNav 函数，以切换导航菜单的显示状态。
  //{link.title}：link.title：链接的标题文本，显示在导航菜单中。
  //</Link> 和 </div>：关闭 Link 和 div 元素，结束导航链接的定义。这段代码通过 map 方法遍历 headerNavLinks 数组，为每个链接生成一个带有适当样式和功能的导航项。
}

export default MobileNav
//导出组件-将 MobileNav 组件作为默认导出。
