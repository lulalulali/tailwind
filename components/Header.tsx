//定义网站的页头组件，通常包含导航菜单、Logo、搜索按钮等。 实现了一个网站的头部导航栏，包含网站的 Logo、标题、导航链接、搜索按钮、主题切换按钮以及移动端导航菜单。
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
//导入模块：导入 siteMetadata 和 headerNavLinks 用于获取站点元数据和导航链接数据。导入 Logo SVG 组件显示网站标志。导入 Link、MobileNav、ThemeSwitch 和 SearchButton 组件，用于实现导航链接、移动端导航、主题切换和搜索功能。

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
  //组件结构-<header className="flex items-center justify-between py-10">：设置 header 容器为 Flexbox 布局，使其子元素在水平方向上对齐和分布。使用 py-10 设置垂直内边距。Logo 和标题：   <Link href="/" aria-label={siteMetadata.headerTitle}>：使用 Link 组件创建指向主页的链接，并设置 aria-label 为站点标题。   Logo：使用 Logo 组件显示网站标志。    标题：检查 siteMetadata.headerTitle 是否为字符串。如果是，则在较大的屏幕上显示标题（隐藏在小屏幕上）。如果不是字符串，则直接渲染标题。
  //导航链接和按钮：导航链接：使用 headerNavLinks 过滤掉指向主页的链接，并为每个剩余的链接创建一个 Link 组件。这些链接在较大的屏幕上显示（隐藏在小屏幕上）。    搜索按钮、主题切换按钮、移动端导航：使用 SearchButton 组件添加搜索功能。使用 ThemeSwitch 组件添加主题切换功能。使用 MobileNav 组件添加移动端导航功能。
  //headerNavLinks.filter((link) => link.href !== '/')：这一行代码使用 filter 方法来筛选 headerNavLinks 数组中的元素，条件是 link.href 不等于 '/'，即过滤掉指向主页的链接。
  //.map((link) => ( ... ))：过滤后的数组将通过 map 方法遍历，每个元素 link 会被映射成一个 Link 组件。<Link key={link.title} href={link.href} className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block">：key={link.title}：每个 Link 组件都有一个唯一的 key 属性，这里使用 link.title 作为 key。    href={link.href}：Link 组件的 href 属性设置为当前遍历元素的 href，指向导航链接的目标地址。   className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"：为 Link 组件设置样式类：hidden：默认隐藏。font-medium：设置字体为中等粗细。text-gray-900 dark:text-gray-100：在浅色模式下设置文字颜色为深灰色，在深色模式下设置文字颜色为浅灰色。sm:block：在屏幕尺寸为 sm (小屏幕) 及以上时，显示该元素。{link.title}：Link 组件的子元素，设置为当前遍历元素的 title，即导航链接的文本。

  //假设 headerNavLinks 数据如下：
  // const headerNavLinks = [
  //   { title: 'Home', href: '/' },
  //   { title: 'About', href: '/about' },
  //   { title: 'Blog', href: '/blog' },
  //   { title: 'Contact', href: '/contact' }
  // ];
  // 过滤和映射后的结果将会渲染出三个 Link 组件（排除 Home 链接）：
  // <Link key="About" href="/about" className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block">About</Link>
  // <Link key="Blog" href="/blog" className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block">Blog</Link>
  // <Link key="Contact" href="/contact" className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block">Contact</Link>
  // 这样在较小屏幕上这些链接将隐藏，仅在屏幕尺寸达到 sm 及以上时显示。
}

export default Header
