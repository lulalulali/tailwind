//一个 Next.js 页面组件，用于渲染博客文章，并生成相关的元数据。代码主要涉及导入样式文件、设置页面组件、生成元数据和静态路径、以及渲染博客文章
import 'css/prism.css'
import 'katex/dist/katex.css'
//导入Prism（用于语法高亮）和 KaTeX（用于数学公式）的样式文件。

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
//导入包括页面标题组件、MDX 组件、内容层工具函数、生成的博客和作者数据、布局组件、元数据类型定义、站点元数据和 Next.js 导航功能。

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}
//布局为 PostLayout，并提供一个包含所有布局的对象 layouts。

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}
//generateMetadata 函数用于生成页面的元数据，包括 Open Graph 和 Twitter 卡片数据。它从 params 中获取 slug，找到对应的博客文章和作者，生成各种元数据。

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }))

  return paths
}
//generateStaticParams 函数用于生成静态路径，使 Next.js 能够预渲染博客文章页面。

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }
  //获取 `slug` 并查找对应的博客文章:从 params 中获取 slug，将其解码并连接成字符串。对所有博客文章进行排序和过滤，找出 slug 对应的文章索引。如果未找到，则返回 404 页面。

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  //找出当前文章的前一篇和后一篇文章。
  const post = allBlogs.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  //找出对应 slug 的文章和作者列表，并处理作者详细信息
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })
  //获取文章的主要内容，并构建文章的结构化数据，包括作者信息。

  const Layout = layouts[post.layout || defaultLayout]
  //根据文章的布局属性选择合适的布局组件，如果未指定则使用默认布局 PostLayout。

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
  //返回渲染的页面内容，包括 JSON-LD 结构化数据脚本和布局组件，使用 MDXLayoutRenderer 渲染文章内容。
}
