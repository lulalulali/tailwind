//处理页面或文章下方的评论部分。可能集成第三方评论系统（如 Disqus 或自定义评论系统）。
'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
//'use client': 表明该组件在客户端渲染。CommentsComponent: 从 pliny/comments 模块导入的评论组件。useState: React 的状态钩子，用于管理组件的本地状态。siteMetadata: 从本地数据文件导入的站点元数据

//属性说明-slug: 当前页面或文章的标识符，用于加载对应的评论。
export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)
  //状态声明:const [loadComments, setLoadComments] = useState(false)loadComments: 一个布尔值状态，表示是否加载评论组件。setLoadComments: 用于更新 loadComments 状态的函数。
  if (!siteMetadata.comments?.provider) {
    return null
  }
  //评论提供者检查:if (!siteMetadata.comments?.provider) {return null}检查站点元数据中是否配置了评论提供者，如果没有配置，则返回 null，不渲染任何内容。

  //条件渲染:return ()   根据 loadComments 状态决定渲染内容：如果 loadComments 为 true，则渲染 CommentsComponent 组件，传入 commentsConfig 和 slug 作为属性。如果 loadComments 为 false，则渲染一个按钮，点击按钮会将 loadComments 状态设置为 true，从而触发评论组件的加载。
  return (
    <>
      {loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
    </>
  )
}
