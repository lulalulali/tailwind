//这个脚本的目的是生成 RSS feed，包含博客的所有文章以及按标签分类的文章。
import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' assert { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'
//依赖模块和数据的引入--writeFileSync 和 mkdirSync 来自 fs 模块，用于写文件和创建目录。path 模块用于处理和转换文件路径。slug 函数来自 github-slugger，用于生成 URL 友好的字符串。escape 函数来自 pliny/utils/htmlEscaper.js，用于转义 HTML 字符。siteMetadata 包含网站的元数据，比如标题、描述、作者等信息。tagData 包含所有标签的数据。allBlogs 包含所有博客文章的数据。sortPosts 用于对文章进行排序。

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`
//生成 RSS 项目的函数--这个函数生成一个 RSS 项目（<item>），包含博客文章的链接、标题、描述、发布日期、作者和标签。
const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`
//这个函数生成一个完整的 RSS 文件，包含频道信息和所有的 RSS 项目。
async function generateRSS(config, allBlogs, page = 'feed.xml') {
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  // RSS for blog post
  if (publishPosts.length > 0) {
    const rss = generateRss(config, sortPosts(publishPosts))
    writeFileSync(`./public/${page}`, rss)
  }
  //publishPosts 是已发布的文章列表。通过过滤掉草稿文章（post.draft !== true）得到。如果 publishPosts 列表中有文章，才执行下面的代码。
  //调用 generateRss 函数生成 RSS 文件内容。generateRss(config, sortPosts(publishPosts))：config 是站点的配置数据，包含站点的元数据，如标题、链接、描述等。sortPosts(publishPosts) 对已发布文章进行排序。generateRss 函数返回一个字符串，表示 RSS 文件的内容。
  //writeFileSync 是 fs 模块的函数，用于同步写入文件。./public/${page} 是 RSS 文件的路径。默认情况下，page 是 feed.xml，所以文件路径是 ./public/feed.xml。rss 是生成的 RSS 文件内容。
  if (publishPosts.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = allBlogs.filter((post) => post.tags.map((t) => slug(t)).includes(tag))
      const rss = generateRss(config, filteredPosts, `tags/${tag}/${page}`)
      const rssPath = path.join('public', 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, page), rss)
    }
  }
}
//Object.keys(tagData) 返回所有标签的数组。使用 for 循环遍历每一个标签。
//对 allBlogs 列表中的所有文章进行过滤，得到包含当前标签 tag 的文章。post.tags.map((t) => slug(t)) 将文章的所有标签转换为 slug 形式。.includes(tag) 检查文章的标签中是否包含当前标签。
//调用 generateRss 函数生成 RSS 文件内容。generateRss(config, filteredPosts, tags/${tag}/${page})：config 是站点的配置数据，包含站点的元数据，如标题、链接、描述等。filteredPosts 是包含当前标签的文章列表。tags/${tag}/${page} 指定 RSS 文件的路径，page 默认是 feed.xml。
//path.join('public', 'tags', tag) 生成 RSS 文件的目录路径。mkdirSync(rssPath, { recursive: true }) 创建目录，如果目录不存在会递归创建。
//writeFileSync 是 fs 模块的函数，用于同步写入文件。path.join(rssPath, page) 是 RSS 文件的完整路径。rss 是生成的 RSS 文件内容。

//generateRSS 函数首先过滤掉草稿文章（draft !== true）。对于非草稿文章，生成一个包含所有文章的 RSS 文件，并写入 ./public/feed.xml。然后，对于每个标签，生成一个包含该标签下所有文章的 RSS 文件，并写入 ./public/tags/{tag}/feed.xml。

const rss = () => {
  generateRSS(siteMetadata, allBlogs)
  console.log('RSS feed generated...')
}
export default rss
//脚本的主函数--定义一个 rss 函数，调用 generateRSS 函数生成 RSS 文件，并在控制台打印 RSS feed generated...。导出 rss 函数作为默认导出。
