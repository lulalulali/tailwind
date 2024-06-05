//定义了一个 React 组件 NotFound，用于在用户访问不存在的页面时显示一个友好的 404 错误页面。
import Link from '@/components/Link'
//导入模块\自定义的 Link 组件，用于处理页面导航。

export default function NotFound() {
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>

      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry we couldn't find this page.
        </p>
        <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
        <Link
          href="/"
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
//notfound组件
//样式与布局,即最外层的div.使用了 flex 布局，将内容垂直排列（flex-col）并在大屏幕设备上水平排列（md:flex-row）。items-start 和 justify-start 确保内容在小屏幕设备上从左上角开始排列，在大屏幕设备上居中对齐。响应式设计：通过 md: 前缀的类定义在中等及以上屏幕上的样式，如 md:mt-24、md:space-y-5、md:text-8xl 等。确保页面在不同设备上都能很好地展示。
//第一个div包含404错误代码,h1 标题显示 404，表示页面未找到。使用了多种 Tailwind CSS 类来定义样式，如 text-6xl、font-extrabold、leading-9 等。
//第二个 div 包含错误信息和返回主页的链接：包含两段文本，第一段表示抱歉找不到页面，第二段提示用户可以返回主页找到其他内容。Link 组件用于返回主页，链接指向 /，并包含多个 Tailwind CSS 类来定义按钮样式，如 bg-blue-600、px-4、py-2、text-white 等

//总的来说,提供了一个友好的 404 错误页面，当用户访问不存在的页面时，展示一个明显的 404 错误信息，并提供一个返回主页的按钮。它使用了 Tailwind CSS 进行样式定义，确保了良好的视觉效果和响应式设计。
