//一个博客页面组件 BlogPage，用于在前端展示博客文章列表.通过导入博客文章数据、处理和排序文章内容，设置分页信息，然后使用 ListLayout 布局组件展示文章列表，并包括分页功能。
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
//导入依赖,ListLayout: 布局组件，用于展示博客文章列表，并包含标签功能。allCoreContent 和 sortPosts: 工具函数，用于处理和排序博客文章内容。allBlogs: 所有博客文章的数据。genPageMetadata: SEO 函数，用于生成页面的元数据。

const POSTS_PER_PAGE = 5
//POSTS_PER_PAGE: 每页展示的博客文章数量。

export const metadata = genPageMetadata({ title: 'Blog' })
//使用 genPageMetadata 函数生成页面的元数据，设置标题为 "Blog"。

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  console.log('alltheblog', allBlogs)
  //处理博客文章内容,sortPosts(allBlogs): 对博客文章进行排序。allCoreContent: 提取博客文章的核心内容。
  const pageNumber = 1
  //设置初始页码,设置当前页码为1，即第一页。
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
    //使用 slice 方法获取当前页需要显示的博客文章。posts.slice(start, end)就是说 从start开始(含),到end止(不含),即5*(1-1)到 5*1
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    //计算分页信息,currentPage: 当前页码。totalPages: 总页数，根据博客文章总数和每页显示的文章数计算得出。假设posts数组是12,那么当前页是1,共3页(12/5取顶计算)
  }
  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
  //返回布局组件,ListLayout: 布局组件，用于展示博客文章列表。posts: 所有博客文章内容,传递给 ListLayout 组件的所有博客文章。这里的 posts 是通过 allCoreContent(sortPosts(allBlogs)) 获取并排序后的所有博客文章内容。initialDisplayPosts: 初始显示的博客文章,初始显示的博客文章。使用 slice 方法截取了当前页需要显示的博客文章。pagination: 分页信息,分页信息。包含当前页码和总页数的信息。。title: 页面标题，设置为 "All Posts",页面标题。设置为 "All Posts"，表示该页面展示所有的博客文章。。
}
