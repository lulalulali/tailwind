//定义了一个函数 genPageMetadata，用于生成页面的元数据（Metadata），包括页面的标题、描述、开放图谱（Open Graph）信息和 Twitter 卡片信息。这些元数据有助于在搜索引擎和社交媒体平台上更好地展示页面内容。 genPageMetadata 函数用于动态生成页面的元数据，这些元数据可以帮助搜索引擎和社交媒体更好地理解和展示页面内容。这对于提升网站的 SEO 和社交媒体表现非常有帮助。
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
//导入模块,Metadata：从 next 模块中导入，用于定义元数据的类型。siteMetadata：从 @/data/siteMetadata 模块中导入，包含站点的基本信息，例如标题和描述等。

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
//定义接口,PageSEOProps：定义了一个接口，描述生成页面元数据所需的属性。title：页面的标题，必填。description：页面的描述，可选。image：页面的图片 URL，可选。[key: string]: any：其他任意附加属性。

export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  return {
    title,
    description: description || siteMetadata.description,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  }
}
//函数genpagemetadata:参数{ title, description, image, ...rest }: PageSEOProps：使用对象解构来提取参数。title：页面的标题。description：页面的描述，如果未提供，则使用站点的默认描述。image：页面的图片 URL，如果未提供，则使用站点的默认图片。...rest：其他附加属性。
//返回值:返回一个 Metadata 对象，包含以下属性：title：页面的标题。description：页面的描述，默认使用 siteMetadata 中的描述。openGraph：开放图谱信息，用于在社交媒体平台上展示页面信息。title：开放图谱的标题，格式为 页面标题 | 站点标题。description：开放图谱的描述。url：页面的 URL。siteName：站点名称。images：开放图谱的图片 URL。locale：语言和地区设定。type：内容类型。twitter：Twitter 卡片信息。title：Twitter 卡片的标题，格式为 页面标题 | 站点标题。card：Twitter 卡片类型，这里是 summary_large_image。images：Twitter 卡片的图片 URL。...rest：其他附加属性。
