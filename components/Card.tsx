//定义一个卡片组件，通常用于显示博客文章预览、用户信息、产品信息等。可能包含标题、图片、简短描述等。
import Image from './Image'
import Link from './Link'
//导入模块,Image: 一个用于显示图片的组件。Link: 一个用于创建链接的组件。

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)
//属性说明-title: 卡片的标题。description: 卡片的描述。imgSrc: 图片的来源 URL。href: 链接地址。
//组件结构外层容器 (<div> 元素): 设置了最大宽度和内边距。内容容器 (<div> 元素): 根据是否有图片，设置 h-full 类名，定义溢出隐藏、圆角、边框样式。
//图片部分:如果有 imgSrc，则显示图片。如果有 href，图片会被包裹在链接中。使用 Image 组件显示图片，设置了宽度、高度和样式。
//文本部分:标题 (<h2> 元素): 如果有 href，标题会被包裹在链接中。描述 (<p> 元素): 显示描述文本，应用了一些样式。链接 (<Link> 元素): 如果有 href，显示 "Learn more" 链接。

export default Card
