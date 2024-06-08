//这是一个列表布局文件，通常用于展示文章或项目的列表。它可能包含分页功能、文章标题、摘要、发布时间等。一个列表布局文件，通常用于展示文章或项目的列表。它可能包含分页功能、文章标题、摘要、发布时间等。
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
//引入和类型定义--'use client' 指定这个文件在客户端渲染。引入 useState 和 usePathname 钩子。引入 formatDate 函数，用于格式化日期。引入 CoreContent 类型，和 Blog 类型。引入组件 Link 和 Tag。引入站点元数据 siteMetadata。

interface PaginationProps {
  totalPages: number
  currentPage: number
}
//分页组件--定义了 PaginationProps 接口，包含 totalPages 和 currentPage。Pagination 组件根据当前页和总页数显示 "Previous" 和 "Next" 按钮，并显示当前页码。使用 usePathname 获取当前路径，用于生成分页链接。

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}
//定义了 ListLayoutProps 接口，包含 posts（文章列表）、title（标题）、initialDisplayPosts（初始展示的文章列表，可选）和 pagination（分页属性，可选）。

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages
  //pathname 是当前 URL 的路径部分，比如 /blog/page/2。pathname.split('/') 会将路径按照斜杠 / 分割成一个数组，例如 ['', 'blog', 'page', '2']。pathname.split('/')[1] 取数组的第二个元素（即索引为 1 的元素），在这个例子中就是 'blog'。这样可以得到路径的基本部分 basePath，即 blog。
  //currentPage 是当前页码。currentPage - 1 > 0 用于检查当前页码减去 1 是否大于 0。如果大于 0，prevPage 为 true，表示存在上一页。如果不大于 0，prevPage 为 false，表示不存在上一页（即当前页码为 1 时）。
  //totalPages 是总页数。currentPage + 1 <= totalPages 用于检查当前页码加上 1 是否小于或等于总页数。如果小于或等于总页数，nextPage 为 true，表示存在下一页。如果大于总页数，nextPage 为 false，表示不存在下一页（即当前页码为最后一页时）。

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}
//没有上一页和有上一页botton的句子; 1\2页的句子;有下一页和没有下一页的句子

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  //定义了一个状态 searchValue 和一个过滤后的博客文章数组 filteredBlogPosts。
  //过滤博客文章--使用数组的 filter 方法遍历 posts 数组中的每篇文章，并根据搜索值进行过滤。对于每篇文章，将文章的标题、摘要和标签（如果存在）连接成一个字符串 searchContent。使用 toLowerCase() 方法将 searchContent 和 searchValue 的值转换为小写，以实现不区分大小写的搜索。使用 includes 方法检查 searchContent 是否包含 searchValue，如果包含则返回 true，否则返回 false。最终，filteredBlogPosts 数组只包含与搜索值匹配的博客文章对象。
  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts
  //initialDisplayPosts 是一个初始显示的博客文章数组，可能是在组件加载时传入的。searchValue 是当前搜索框中的值，由 useState 钩子管理。
  //条件运算:initialDisplayPosts.length > 0 && !searchValue:首先检查 initialDisplayPosts 数组是否不为空（长度大于 0）。接着检查 searchValue 是否为空。如果两个条件都为真，说明没有进行搜索，并且存在初始显示的文章列表，此时使用 initialDisplayPosts 作为要显示的文章列表。
  //filteredBlogPosts:如果上述条件不满足，说明已经进行了搜索，或者初始显示的文章列表为空，此时使用 filteredBlogPosts 作为要显示的文章列表。
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">Search articles</span>
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
            </label>
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags } = post
            return (
              <li key={path} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
//使用了 React Fragment (<> </>) 包裹整个返回内容。第一部分是一个 div 元素，包含列表布局的主要内容。第二部分是条件渲染的 Pagination 组件，仅在 pagination 存在且总页数大于 1 且没有搜索值时显示。
//标题和搜索栏--div 元素设置了上下间距，并根据不同屏幕尺寸调整样式。外部容器-使用 Tailwind CSS 类名 divide-y divide-gray-200 dark:divide-gray-700 为子元素之间添加分隔线，并在暗模式下改变分隔线颜色。标题和搜索容器-使用 Tailwind CSS 类名 space-y-2 pb-8 pt-6 md:space-y-5 添加上下内边距和子元素之间的垂直间距。h1 元素显示传入的标题 title,使用 Tailwind CSS 类名为标题设置字体大小、加粗、行高和颜色等样式。
//div 元素包含搜索栏，使用一个 label 元素包裹 input 和 svg 元素。input 元素是搜索框，当输入内容变化时调用 setSearchValue 更新搜索值。搜索框的 input 元素设置了 ARIA 标签、占位符、样式，并绑定了 onChange 事件，用于更新 searchValue 状态。搜索图标--svg 元素显示一个搜索图标。
//文章列表--ul 元素包含文章列表。如果没有匹配的文章，显示 "No posts found."。displayPosts 数组包含要显示的文章，使用 map 方法遍历每个文章对象，生成对应的列表项 li。每个 li 元素包含一个 article，用于显示文章的详细信息，包括发布时间、标题、标签和摘要。使用 Link 组件将文章标题链接到文章的详细页面。
//无序列表容器 ul---没有匹配文章时显示的消息:使用条件渲染，如果 filteredBlogPosts 为空，则显示消息 'No posts found.'。
//遍历 displayPosts 数组:使用 map 方法遍历 displayPosts 数组，生成每篇文章的 li 项。--定义 li 元素--文章容器 article:--定义发布时间 dl:使用 dl 和 dd 标签定义发布时间，使用 time 元素显示格式化的发布日期。--文章标题和标签容器 div:标题 h3: 使用 h3 标签显示文章标题，并包含一个导航链接。标签 div: 使用 map 方法遍历文章的标签数组，并显示每个标签。摘要 div: 使用 div 标签显示文章摘要，应用 prose 类名格式化文本样式。
//该组件显示了一个带有搜索功能的文章列表，并在需要时提供分页导航。通过条件渲染和动态样式，确保组件在不同情况下的显示效果。组件结构清晰，便于维护和扩展。
