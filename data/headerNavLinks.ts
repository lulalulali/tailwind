//定义了一个 headerNavLinks 数组，其中包含网站导航栏的链接信息。每个链接都是一个对象，包含 href 和 title 属性。
const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
  { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' },
]
//这是一个包含多个导航链接对象的数组。每个对象代表一个导航链接。导航链接对象：每个对象有两个属性：href：链接的目标 URL。例如，'/' 表示网站的主页，'/blog' 表示博客页面。title：链接的显示文本。例如，'Home'、'Blog' 等。export default：将 headerNavLinks 数组导出为默认模块，这样它可以在其他文件中被导入和使用。

export default headerNavLinks
