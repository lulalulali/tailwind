//这个文件在列表布局的基础上增加了标签功能。除了展示文章列表之外，它还可能展示每篇文章的标签，并允许用户根据标签进行筛选。  定义了一个带有标签功能的列表布局组件，用于展示博客文章列表并允许用户根据标签进行筛选。组件使用了多个辅助函数和组件来实现标签的排序、分页和文章展示。
/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

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
//分页组件定义--使用 usePathname 获取当前路径。计算上一页和下一页的存在性，并相应地渲染按钮和链接。显示当前页数和总页数。

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
  //获取路径名--usePathname 是 next/navigation 提供的钩子，用于获取当前页面的路径名。这对于决定当前页面以及构建导航链接非常有用。
  //处理标签数据--将 tagData 转换为一个记录对象，其中键是标签，值是该标签的计数。这一步确保我们可以使用标签数据来生成标签列表。
  //获取所有标签的键，这些键是标签名称。
  //排序标签--根据每个标签的计数对标签进行降序排序，以确保标签列表中最常用的标签排在前面。
  //决定显示哪些文章--如果 initialDisplayPosts 不为空，则显示 initialDisplayPosts；否则显示 posts。这一步确保我们可以根据初始显示的文章或者全部文章来渲染列表。
  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {pathname.split('/tags/')[1] === slug(t) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
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
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
//主组件定义--使用 usePathname 获取当前路径。从 tagData 中获取标签计数，并对标签进行排序。根据 initialDisplayPosts 和 posts 确定要显示的文章。渲染标题、标签列表和文章列表。如果启用了分页，则渲染分页组件。   标签列表:根据当前路径和标签数据渲染标签列表。每个标签链接到相应的标签页面。  文章列表:遍历 displayPosts 数组，生成每篇文章的列表项。显示文章的发布日期、标题、标签和摘要。
//第一个div是title
//第二个分两部分
//第一部分--定义了一个侧边栏，它显示了所有的标签，并允许用户通过点击标签来过滤文章。
//容器设置：hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex：hidden：默认情况下隐藏。h-full：高度填满父容器。max-h-screen：最大高度为屏幕高度。min-w-[280px] max-w-[280px]：设置宽度为280px。flex-wrap overflow-auto：启用自动滚动。rounded：圆角边框。bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40：设置背景色和阴影效果，支持暗模式。sm:flex：在较大屏幕上显示为flex布局。
//内部内容：px-6 py-4：内部内容的内边距。pathname.startsWith('/blog') ? (...) : (...)：检查当前路径是否以/blog开头。如果是，显示All Posts标题。否则，显示一个链接，点击后跳转到/blog路径。
//标签列表：sortedTags.map((t) => {...})：遍历排序后的标签列表。每个标签项：key={t}：设置唯一键值。my-3：垂直外边距。如果当前路径与标签匹配，显示标签名称和计数。否则，显示一个链接，点击后跳转到对应标签页。

//第二部分--用于展示博客文章列表，每篇文章包含标题、发布日期、摘要和标签。它还包括分页功能，以便在文章较多时进行导航。
//文章列表容器：<div>：外层容器，用于包裹整个文章列表和分页组件。
//文章列表：<ul>：无序列表，用于包裹所有文章项。displayPosts.map((post) => {...})：遍历所有要展示的文章，每篇文章生成一个列表项。const { path, date, title, summary, tags } = post：解构每篇文章的属性。<li key={path} className="py-5">：每篇文章的列表项，设置唯一键和垂直内边距。<article className="flex flex-col space-y-2 xl:space-y-0">：文章内容容器，使用flex布局和间距。<dl>：定义列表，用于描述文章的发布日期。<dt className="sr-only">Published on</dt>：屏幕阅读器专用文本，描述发布日期。<dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">：发布日期样式。<time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>：格式化并显示日期。<div className="space-y-3">：内容容器，设置垂直间距。<h2 className="text-2xl font-bold leading-8 tracking-tight">：文章标题样式。<Link href={/${path}} className="text-gray-900 dark:text-gray-100">：链接到文章详情页。<div className="flex flex-wrap">：标签容器，使用flex布局。{tags?.map((tag) => <Tag key={tag} text={tag} />)}：遍历并显示每个标签。<div className="prose max-w-none text-gray-500 dark:text-gray-400">：文章摘要样式。
//分页组件：{pagination && pagination.totalPages > 1 && (...)}检查是否需要显示分页组件（总页数大于1）。<Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />：分页组件，传递当前页数和总页数。
