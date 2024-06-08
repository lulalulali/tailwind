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
  //函数名称：generateMetadata.函数类型：异步函数，返回 Promise<Metadata | undefined> .参数：params，包含 slug 属性，该属性是一个字符串数组 slug: string[]

  const slug = decodeURI(params.slug.join('/'))
  //如果 params.slug 是 ['blog', 'my-first-post']，那么 params.slug.join('/') 将返回 'blog/my-first-post'。
  const post = allBlogs.find((p) => p.slug === slug)
  //解码 slug：使用 decodeURI 函数将 params.slug 数组连接成字符串，并进行 URI 解码.  查找文章：在 allBlogs 中查找 slug 对应的文章，并将其赋值给 post

  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  //作者列表：从 post 中获取作者列表 authors，如果不存在则使用默认作者 ['default'] .查找作者信息：遍历 authorList\  在 allAuthors 中查找每个作者的详细信息\使用 coreContent 提取作者的核心内容并返回作者详情列表 authorDetails

  if (!post) {
    return
    //检查文章：如果 post 不存在（即未找到对应的博客文章），则返回 undefined
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  //格式化发布时间：将 post.date 转换为 ISO 格式字符串并赋值给 publishedAt.修改时间：将 post.lastmod 或 post.date 转换为 ISO 格式字符串并赋值给 modifiedAt

  const authors = authorDetails.map((author) => author.name)
  //获取作者姓名：从 authorDetails 中提取每个作者的姓名，并将其存储在 authors 数组中

  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
    //typeof post.images === 'string': 这个条件判断 post.images 的类型是否是字符串。? [post.images]: 如果 post.images 是字符串，将其包裹在数组中，生成一个包含这个字符串的数组。: post.images: 如果 post.images 已经是一个数组，则直接使用这个数组。
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
      //遍历 imageList 中的每个图片路径。如果路径已经是完整的 URL，则直接使用它。否则，将站点的基本 URL 与路径拼接，生成完整的 URL。最终返回一个包含这些 URL 的对象数组。
    }
  })
  //处理文章图片,图片列表：默认使用站点的社交横幅图片 siteMetadata.socialBanner. 检查文章图片：如果文章中有图片 post.images，则将其添加到 imageList 中. 格式化图片 URL：将 imageList 中的每个图片 URL 格式化为完整的 URL，并存储在 ogImages 中.

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
      //如果 authors 数组中有作者信息，则使用该数组中的作者信息。如果 authors 数组为空，则使用站点元数据 (siteMetadata) 中的默认作者信息。
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
    //生成元数据对象,元数据对象：包含页面标题、描述、Open Graph 和 Twitter 元数据.
    //Open Graph 数据：title：文章标题description：文章摘要siteName：站点名称locale：语言区域type：内容类型（文章）publishedTime：发布时间modifiedTime：修改时间url：当前页面的相对 URLimages：格式化后的图片列表authors：作者姓名列表，如果为空则使用站点作者
    //Twitter 数据：card：卡片类型（大图）title：文章标题description：文章摘要images：图片列表
  }
}
//generateMetadata 函数用于生成页面的元数据，包括 Open Graph 和 Twitter 卡片数据。它从 params 中获取 slug，找到对应的博客文章和作者，生成各种元数据。

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }))
  //allBlogs：这是一个包含所有博客文章的数组。  allBlogs.map((p) => ({ ... }))：对 allBlogs 数组中的每个元素执行映射操作，将每个元素 p 转换为一个新对象。  p.slug.split('/')：将每个博客文章的 slug 属性（通常是一个字符串，如 'path/to/post'）按照 '/' 分隔符拆分成一个数组（如 ['path', 'to', 'post']）。  ({ slug: p.slug.split('/') })：将分割后的数组赋值给对象的 slug 属性，生成的对象形式如 { slug: ['path', 'to', 'post'] }
  return paths
}
//generateStaticParams 函数用于生成静态路径，它将在静态生成阶段被调用，用于生成路径参数,使 Next.js 能够预渲染博客文章页面。

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production,表示在生产环境中过滤掉草稿文章。
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  //sortPosts(allBlogs): 调用 sortPosts 函数对所有博客文章 (allBlogs) 进行排序。allCoreContent(sortedPosts): 调用 allCoreContent 函数提取排序后的博客文章的核心内容，存储在 sortedCoreContents 变量中。使用 findIndex 方法在 sortedCoreContents 中查找与 slug 匹配的文章，返回该文章的索引，存储在 postIndex 变量中。p 表示 sortedCoreContents 中的每一篇文章对象，p.slug 表示该文章的 slug。
  if (postIndex === -1) {
    return notFound()
  }
  //获取 `slug` 并查找对应的博客文章:从 params 中获取 slug，将其解码并连接成字符串。对所有博客文章进行排序和过滤，找出 slug 对应的文章索引。如果未找到，则返回 404 页面。

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  //找出当前文章的前一篇和后一篇文章。

  const post = allBlogs.find((p) => p.slug === slug) as Blog
  //使用 find 方法在 allBlogs 中查找与 slug 匹配的文章对象。p 表示 allBlogs 中的每一篇文章对象，p.slug 表示该文章的 slug。将找到的文章对象赋值给 post 变量，并将其类型断言为 Blog。
  const authorList = post?.authors || ['default']
  //检查 post 对象是否存在，并获取其 authors 属性。如果 post 对象不存在或者 authors 属性为 undefined，则使用 ['default'] 作为 authorList 的默认值。
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
    //使用 map 方法遍历 authorList 中的每一个 author，并为每个 author 执行以下操作：const authorResults = allAuthors.find((p) => p.slug === author):在 allAuthors 中查找与 author 匹配的作者对象。p 表示 allAuthors 中的每一个作者对象，p.slug 表示该作者的 slug。将找到的作者对象赋值给 authorResults 变量。return coreContent(authorResults as Authors):将 authorResults 变量类型断言为 Authors。调用 coreContent 函数提取作者对象的核心内容。将提取的核心内容作为返回值，形成一个 authorDetails 数组。
  })
  //在所有博客文章中查找与给定 slug 相匹配的文章。获取该文章的作者列表。如果没有找到文章或者文章没有指定作者，则使用 ['default'] 作为默认作者列表。遍历作者列表，为每个作者查找其详细信息，并提取核心内容，形成一个包含作者详细信息的数组 authorDetails。

  const mainContent = coreContent(post)
  //调用 coreContent 函数，传入 post 对象，提取文章的核心内容。coreContent 函数通常用于提取对象中的重要信息，过滤掉不必要的细节。将提取的核心内容赋值给 mainContent 变量。
  const jsonLd = post.structuredData
  //获取 post 对象的 structuredData 属性，并赋值给 jsonLd 变量。structuredData 通常是文章的结构化数据，用于搜索引擎优化（SEO），使搜索引擎更好地理解页面内容。
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
      //遍历 authorDetails 数组中的每一个 author 对象，为每个作者执行以下操作：return { '@type': 'Person', name: author.name }:创建一个包含作者类型和姓名的对象，符合 JSON-LD 格式。@type 是 JSON-LD 规范中的属性，用于定义数据的类型。在这里，作者类型是 Person。name 是作者的姓名，从 author 对象中获取。将生成的 JSON-LD 格式的作者对象数组赋值给 jsonLd['author']。
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
  //一个异步的 React 组件 Page，用于渲染博客文章页面。返回渲染的页面内容：包括 JSON-LD 结构化数据脚本。使用选择的布局组件 Layout 渲染页面内容。MDXLayoutRenderer 渲染文章内容，传入 post.body.code 和 components 以及文章的目录 toc。 \  将 JSON-LD 结构化数据嵌入到页面中，以提高搜索引擎的可见性和 SEO 。渲染博客文章的布局组件 Layout，并传递文章的核心内容、作者详细信息、下一篇和上一篇文章的内容。使用 MDXLayoutRenderer 组件渲染文章的 MDX 内容。
  //type="application/ld+json":指定脚本的 MIME 类型为 JSON-LD，这是结构化数据的标准格式。dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}:使用 dangerouslySetInnerHTML 属性直接将 JSON-LD 数据插入到脚本标签中。这是 React 提供的一种方式，用于在 JSX 中嵌入原始 HTML 内容。JSON.stringify(jsonLd) 将 jsonLd 对象转换为 JSON 字符串。
  //渲染一个布局组件，并传递以下属性：content={mainContent}:传递文章的核心内容。authorDetails={authorDetails}:传递作者的详细信息。next={next}:传递下一篇文章的内容。prev={prev}:传递上一篇文章的内容。在布局组件内部，使用 MDXLayoutRenderer 组件渲染文章的 MDX 内容。code={post.body.code}:传递 MDX 代码，通常是博客文章的主体内容。components={components}:传递自定义组件，用于替换 MDX 内容中的默认组件。toc={post.toc}:传递文章的目录（Table of Contents），如果有的话。
}
