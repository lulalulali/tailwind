//定义了一个函数 sitemap，用于生成站点地图（sitemap），它返回一个包含网站所有页面 URL 和上次修改日期的数组。这个站点地图对于搜索引擎优化（SEO）非常有用，因为它帮助搜索引擎更好地索引网站内容。这对于提高网站在搜索引擎结果页面中的排名非常有帮助。
import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
//导入模块,MetadataRoute：从 next 模块中导入，用于定义元数据路由类型。allBlogs：从 contentlayer/generated 模块中导入，包含所有博客文章的数据。siteMetadata：从 @/data/siteMetadata 模块中导入，包含站点的基本信息，例如站点 URL。

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
//函数sitemap: 获取站点 URL.
//生成博客文章的 URL 和上次修改日期,filter((post) => !post.draft)：过滤掉草稿文章。map((post) => ({ url: ..., lastModified: ... }))：将每篇文章映射为包含 URL 和上次修改日期的对象。
//生成固定页面的 URL 和当前日期,['', 'blog', 'projects', 'tags']：这些是固定页面的路由。map((route) => ({ url: ..., lastModified: ... }))：将每个路由映射为包含 URL 和当前日期（格式化为 YYYY-MM-DD）的对象。
//返回合并后的站点地图,合并固定页面和博客文章的 URL 和上次修改日期，生成最终的站点地图。
