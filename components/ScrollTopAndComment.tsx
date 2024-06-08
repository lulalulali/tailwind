//包含滚动到顶部和滚动到评论部分的按钮，增强用户体验。定义了一个名为 ScrollTopAndComment 的 React 组件。该组件包含两个按钮：一个用于滚动到页面顶部，另一个用于滚动到评论部分，以增强用户体验。
'use client'

import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'
//导入 siteMetadata 以获取站点的元数据。从 React 中导入 useEffect 和 useState 钩子，用于管理组件的状态和副作用。

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)
  //定义 ScrollTopAndComment 组件。使用 useState 钩子创建一个名为 show 的状态变量，用于控制按钮的显示。
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])
  //使用 useEffect 钩子在组件挂载时管理\添加 scroll 事件监听器。handleWindowScroll 函数根据页面滚动位置更新 show 状态。在组件卸载时移除 scroll 事件监听器，以防止内存泄漏。
  //useEffect：这是一个 React 钩子，用于在组件挂载后执行副作用。这里，useEffect 在组件第一次渲染后立即运行。const handleWindowScroll = () => { ... }：定义了一个名为 handleWindowScroll 的函数，用于处理窗口滚动事件。if (window.scrollY > 50) setShow(true)：如果窗口的垂直滚动位置超过 50 像素，调用 setShow(true) 来设置 show 状态为 true。else setShow(false)：否则，调用 setShow(false) 将 show 状态设置为 false。
  //window.addEventListener('scroll', handleWindowScroll)：添加一个滚动事件监听器，当窗口滚动时会调用 handleWindowScroll 函数。return () => window.removeEventListener('scroll', handleWindowScroll)：在 useEffect 返回的清理函数中移除滚动事件监听器。这确保了当组件卸载或在依赖项更改时，事件监听器会被正确清理，防止内存泄漏或不必要的事件处理。[]：这个空数组作为 useEffect 的依赖项列表，表示这个副作用只在组件挂载和卸载时运行一次。
  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  //handleScrollTop 函数用于滚动到页面顶部。
  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView()
  }
  //handleScrollToComment 函数用于滚动到页面中的评论部分，假定评论部分的元素 ID 为 comment。
  //const handleScrollToComment = () => { ... }：定义了一个箭头函数 handleScrollToComment。document.getElementById('comment')：使用 document.getElementById 方法获取页面上 ID 为 comment 的元素。该方法返回具有指定 ID 的元素对象，如果没有找到则返回 null。?.（可选链操作符）：在获取到元素对象后，使用可选链操作符 ?.，这确保了只有在 getElementById 不为 null 的情况下才会调用后续的方法。如果 getElementById 返回 null，可选链操作符会使整个表达式短路，并返回 undefined，避免抛出错误。.scrollIntoView()：如果找到了元素，则调用该元素的 scrollIntoView 方法，该方法会滚动页面使得元素进入视口。   当调用这个函数时，会尝试滚动页面，使 ID 为 comment 的元素进入视口。如果没有找到该元素，则不会进行任何操作。就是说找到了view scroll过去
  return (
    <div
      className={`fixed bottom-8 right-8 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
    >
      {siteMetadata.comments?.provider && (
        <button
          aria-label="Scroll To Comment"
          onClick={handleScrollToComment}
          className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <button
        aria-label="Scroll To Top"
        onClick={handleScrollTop}
        className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
  //返回一个包含两个按钮的 div 元素。使用 Tailwind CSS 类设置样式：当 show 为 true 时，显示按钮；否则，隐藏按钮。
  //如果 siteMetadata.comments.provider 存在，则显示“滚动到评论”按钮。使用 SVG 图标表示按钮内容。
  //始终显示“滚动到顶部”按钮。使用 SVG 图标表示按钮内容。
  //return (：函数返回的 JSX 结构。<div className={fixed bottom-8 right-8 hidden flex-col gap-3 ${show ? 'md' : 'md'}}>：一个 div 元素，其类名是一个动态字符串，使用模板字符串 ${} 根据 show 状态确定是 'md:flex' 还是 'md:hidden'，控制该元素在中等及以上屏幕尺寸下的显示和隐藏。此外，该 div 具有固定定位，位于页面底部和右侧，具有一定的间隙。{siteMetadata.comments?.provider && (：如果 siteMetadata.comments 存在且 provider 属性为真，则渲染内部的按钮。
  //<button aria-label="Scroll To Comment" onClick={handleScrollToComment} className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300  dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">：一个按钮元素，用于滚动到评论部分。该按钮具有 aria-label 属性以提供无障碍支持，onClick 事件触发 handleScrollToComment 函数，并且具有一系列的 Tailwind CSS 类名来控制样式和交互效果。
  //<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">：一个 SVG 图标，大小为 5x5，显示为当前颜色。
  //<path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />：SVG 图标的路径定义。
  //</button>：关闭按钮元素。
  //{siteMetadata.comments?.provider && ( ... )}：条件渲染包含滚动到评论部分按钮的代码块。<button aria-label="Scroll To Top" onClick={handleScrollTop} className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">：另一个按钮元素，用于滚动到页面顶部，类似样式和属性。
  //<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">：SVG 图标，表示向上的箭头。
  //<path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />：SVG 图标的路径定义，表示向上的箭头。
  //</button>：关闭按钮元素。</div>：关闭 div 元素。
}

export default ScrollTopAndComment
//导出 ScrollTopAndComment 组件作为默认导出。
