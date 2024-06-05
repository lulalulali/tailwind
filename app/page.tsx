//定义了一个名为 Page 的异步函数组件，用于在 Next.js 项目中渲染一个包含博客文章的页面。  展示了如何在 Next.js 中使用异步函数组件来处理和展示数据。通过 sortPosts 和 allCoreContent 函数，博客文章数据得到了排序和提取，并传递给 Main 组件进行渲染。这种结构清晰地分离了数据处理逻辑和展示逻辑，使代码更易于维护和扩展。
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
//导入模块,sortPosts 和 allCoreContent：从 pliny/utils/contentlayer 模块导入的两个函数，用于对博客文章进行排序和提取核心内容。allBlogs：从 contentlayer/generated 模块导入的一个对象，包含所有博客文章的数据。Main：从当前目录导入的一个 React 组件，用于渲染主内容区域。

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
//异步函数组件Page .Page 组件的主要目的是获取、处理并展示博客文章数据。它首先对 allBlogs 数据进行排序，然后提取核心内容，最终将处理后的数据传递给 Main 组件进行渲染。
//函数声明和导出,使用 export default 导出 Page 函数，使其可以在其他文件中被导入和使用。使用 async 关键字声明这是一个异步函数。
//获取和处理博客文章和数据,sortPosts(allBlogs)：调用 sortPosts 函数，对 allBlogs 中的博客文章进行排序。allBlogs 包含了所有博客文章的数据。allCoreContent(sortedPosts)：调用 allCoreContent 函数，从 sortedPosts 中提取博客文章的核心内容。
//返回渲染的组件,返回 Main 组件，并将处理后的博客文章数据作为 posts 属性传递给它。Main 组件将使用这些数据来渲染页面内容。
