//定义了一个 SocialIcon 组件，用于根据社交媒体平台的种类（kind）和链接（href）渲染相应的社交媒体图标。
import {
  Uniqlo,
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  X,
  Mastodon,
  Threads,
  Instagram,
} from './icons'
//包含了一系列社交媒体图标组件，这些组件从 ./icons 文件中导入，并与其对应的键关联。

const components = {
  Uniqlo: Uniqlo,
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  x: X,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}
//SocialIcon 组件的属性类型定义。它包含以下属性：kind: 表示社交媒体平台的类型，必须是 components 对象中的一个键。href: 链接地址，可以是一个字符串或 undefined。size: 图标的大小，是一个可选参数，默认为 8。

// SocialIcon 组件:   输入验证：如果 href 为空，或者 kind 是 'mail' 且 href 不是有效的邮件链接，组件返回 null，不渲染任何内容。      获取图标组件：根据 kind 从 components 对象中获取对应的图标组件。     渲染图标：渲染一个带有图标的链接。链接的 className 设置了一些样式，使图标在悬停时改变颜色。使用 span 标签隐藏图标名称，只对屏幕阅读器可见，以增强可访问性。渲染 SocialSvg 组件，并根据 size 属性设置图标的宽度和高度。
const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 h-${size} w-${size}`}
      />
    </a>
  )
}
//这段代码是 `SocialIcon` 组件中用来渲染社交图标链接的部分。以下是对其的详细解释：
// 链接 (`<a>` 元素)
// 属性说明：
// - `className`: 设置链接的样式类名。
//   - `text-sm`: 使用小号文本尺寸。
//   - `text-gray-500`: 文本颜色为灰色。
//   - `transition`: 添加过渡效果。
//   - `hover:text-gray-600`: 悬停时文本颜色变为较深的灰色。
// - `target="_blank"`: 链接在新标签页中打开。
// - `rel="noopener noreferrer"`:
//   - `noopener`: 在新窗口中打开链接时，防止新的浏览上下文能够通过 `window.opener` 属性获取对原始窗口的引用。这可以防止可能的恶意攻击。
//   - `noreferrer`: 不传递引用信息，进一步提高安全性。
// - `href={href}`: 设置链接地址。

// 隐藏的文本 (`<span>` 元素)
// - `className="sr-only"`: 该类名来自 [Tailwind CSS](https://tailwindcss.com/docs/screen-readers)，表示此元素仅对屏幕阅读器可见，用于提高可访问性。 - `{kind}`: 显示社交平台的名称，屏幕阅读器会读取这个文本，让视障用户知道这个图标的含义。

// 社交图标 (`<SocialSvg>` 元素)
// - `className`: 设置图标的样式类名。
//   - `fill-current`: 使用当前文本颜色填充 SVG。
//   - `text-gray-700`: 图标颜色为较深的灰色。
//   - `hover:text-primary-500`: 悬停时图标颜色变为主色。
//   - `dark:text-gray-200`: 在暗色模式下，图标颜色变为较浅的灰色。
//   - `dark:hover:text-primary-400`: 在暗色模式下悬停时，图标颜色变为较浅的主色。
//   - `h-${size} w-${size}`: 图标的高度和宽度设置为 `size`（默认值为 8）。
// 这段代码实现了一个带有社交图标的链接，提供了基本的样式和交互效果，并确保了良好的可访问性和安全性。

export default SocialIcon
