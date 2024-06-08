//定义网站的页脚组件，通常包含版权信息、社交媒体链接、站点地图等。用于显示社交媒体图标、版权信息和站点的相关链接.
import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
//导入模块,Link: 自定义链接组件，用于导航。siteMetadata: 包含站点元数据的文件。SocialIcon: 社交媒体图标组件，用于显示不同的社交媒体图标。

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="x" href={siteMetadata.x} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
  //组件结构:外层 footer 标签：包裹整个页脚内容。div 标签（整体容器）：类名 mt-16 flex flex-col items-center：用于设置外边距、布局方向和对齐方式。
  //社交媒体图标:SocialIcon 组件用于显示不同社交媒体的图标。kind 属性表示图标类型，href 属性表示链接地址，size 属性表示图标大小。
  //SocialIcon 组件：这是一个自定义组件，用于显示社交媒体图标。kind="mail"：表示要显示的图标类型是邮件。href={mailto:${siteMetadata.email}}：设置邮件图标的链接地址，siteMetadata.email 是从站点元数据中获取的电子邮件地址，通过 mailto: 生成邮件链接。size={6}：设置图标的大小为 6（Tailwind CSS 单位）。
  //插入? <SocialIcon kind="uniqlo" href={siteMetadata.uniqlo} size={6} />
  //版权信息:显示站点作者、当前年份和站点标题。
  //<div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">：mb-2：设置底部外边距为 2（Tailwind CSS 单位）。flex：应用 Flexbox 布局。space-x-2：设置子元素之间的水平间距为 2（Tailwind CSS 单位）。text-sm：设置文本大小为小号。text-gray-500 和 dark:text-gray-400：在普通模式下文本颜色为灰色 500，在暗模式下文本颜色为灰色 400。     <div>{siteMetadata.author}</div>：显示作者信息，来自 siteMetadata.author。         <div>{ • }</div>：显示分隔符 “•”。      <div>{© ${new Date().getFullYear()}}</div>：显示版权符号和当前年份。使用 JavaScript 获取当前年份：new Date().getFullYear()。         <Link href="/">{siteMetadata.title}</Link>：显示站点标题，并将其作为链接，链接到站点的主页。站点标题来自 siteMetadata.title。
  //主题链接:提供一个链接到 Tailwind Nextjs Theme 的 GitHub 仓库。
}
