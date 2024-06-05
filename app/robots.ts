//定义了一个用于生成 robots.txt 文件的函数组件 robots。robots.txt 文件用于告知搜索引擎爬虫哪些页面可以抓取，哪些页面不可以抓取。 robots 组件的主要目的是生成 robots.txt 文件，以指导搜索引擎爬虫如何抓取和索引网站内容。通过定义爬虫规则、站点地图和主机名，可以帮助搜索引擎更有效地处理网站。
import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
//导入模块,MetadataRoute：从 next 模块中导入，用于定义路由元数据。siteMetadata：从 @/data/siteMetadata 模块中导入的一个对象，包含站点的元数据，比如站点的 URL。

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
//导出函数组件:  函数声明和导出使用 export default 导出 robots 函数，使其可以在其他文件中被导入和使用。robots 函数的返回类型是 MetadataRoute.Robots，这是一个由 next 模块定义的类型。
//返回robots.txt 配置对象：rules：定义了爬虫的规则。这里允许所有爬虫 (userAgent: '*') 访问整个网站 (allow: '/')。sitemap：指定网站的站点地图 (sitemap.xml) 的 URL。站点地图帮助搜索引擎更好地抓取和索引网站内容。host：指定网站的主机名，这里使用 siteMetadata.siteUrl 中定义的站点 URL。
