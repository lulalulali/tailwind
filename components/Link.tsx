/* eslint-disable jsx-a11y/anchor-has-content */
//封装了 Next.js 的 Link 组件，可能添加了一些自定义的样式或功能。定义了一个 CustomLink 组件，用于处理不同类型的链接，包括内部链接、锚点链接和外部链接，并根据链接类型选择合适的 HTML 元素和属性。
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
//导入模块,next/link：从 Next.js 导入的 Link 组件，用于处理客户端路由跳转。LinkProps：Next.js Link 组件的属性类型。AnchorHTMLAttributes：React 提供的类型，用于定义 <a> 标签的标准属性。eslint-disable jsx-a11y/anchor-has-content ：注释语句,禁用 ESLint 规则 jsx-a11y/anchor-has-content，这是因为 next/link 组件会处理内容渲染。jsx-a11y/anchor-has-content 是 ESLint 插件 eslint-plugin-jsx-a11y 中的一条规则。它确保所有的 <a> 标签都有内容（即，必须包含文本或嵌套的元素），以提高可访问性。如果一个 <a> 标签没有内容，屏幕阅读器用户可能无法理解其用途。 /* eslint-disable jsx-a11y/anchor-has-content */ 注释，你可以在文件范围内禁用这条规则。这在某些情况下很有用，例如当你使用 next/link 组件时，内容由 Link 组件内部处理，而 ESLint 可能错误地认为 <a> 标签没有内容。

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return <Link href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}
//属性解构-{ href, ...rest }：从传递给组件的属性中解构出 href 属性，剩余的属性存储在 rest 对象中。LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>：定义了组件接受的属性类型，既包含 Link 组件的属性，也包含标准 <a> 标签的属性。链接类型判断isInternalLink：检查 href 是否以 / 开头，即是否为站内链接。isAnchorLink：检查 href 是否以 # 开头，即是否为页面内的锚点链接。
//根据链接类型渲染不同的元素-内部链接：使用 Next.js 的 Link 组件处理内部链接。锚点链接：使用标准: <a> 标签处理页面内的锚点链接。
//外部链接：对于所有其他情况，假定链接是外部链接，并使用标准 <a> 标签。添加 target="_blank" 和 rel="noopener noreferrer" 属性，以便在新标签页中打开链接并提高安全性。</a>
//<a：开始一个 <a> 标签，用于创建一个超链接。target="_blank"：target 是一个属性，指定超链接的打开方式。_blank 是 target 属性的值，表示在新窗口或新标签页中打开链接。
//rel="noopener noreferrer"：rel 是一个属性，用于指定当前文档与被链接文档之间的关系。noopener 是 rel 属性的一个值，表示新窗口不应具有对原始窗口的访问权限（提高安全性）。noreferrer 是 rel 属性的另一个值，表示不应向被链接文档发送 HTTP 引荐来源（提高隐私性）。
//href={href}：href 是一个属性，指定链接的目标 URL。{href} 是 JSX 语法，表示引用一个名为 href 的变量的值，作为链接的目标 URL。
//{...rest}：{...rest} 是 JavaScript 的展开运算符语法，用于将 rest 对象中的所有剩余属性展开并添加到 <a> 标签中。rest 是一个包含剩余属性的对象。这些属性是除去 href 之外的其他属性，通过组件的 props 传递进来。/>：结束 <a> 标签的自闭合写法。表示这个标签不包含任何子元素或内容。
//完整解释-这句代码创建了一个 <a> 标签，该标签的目标 URL 由 href 变量决定，并将在新窗口或新标签页中打开。为了提高安全性和隐私性，它还添加了 rel="noopener noreferrer" 属性。此外，它将所有传递给组件的其他属性（通过 ...rest）展开并添加到 <a> 标签中。

export default CustomLink
//导出 CustomLink 组件，以便在其他文件中导入和使用。
