//  存储项目数据，可能包含多个项目的名称、描述、链接等信息。定义了一个 TypeScript 接口 Project 和一个包含多个项目数据的数组 projectsData。
interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}
//接口定义--title：项目的标题，类型为 string。description：项目的描述，类型为 tring。href：可选的项目链接，类型为 string。href 属性前的 ? 表示这个属性是可选的。imgSrc：可选的项目图片路径，类型为 string。

const projectsData: Project[] = [
  {
    title: 'A Search Engine',
    description: `What if you could look up any information in the world? Webpages, images, videos
    and more. Google has many features to help you find exactly what you're looking
    for.`,
    imgSrc: '/static/images/google.png',
    href: 'https://www.google.com',
  },
  {
    title: 'The Time Machine',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]
//项目数据数组--projectsData 是一个包含多个项目对象的数组，每个对象都符合 Project 接口的定义。每个项目对象包括：title：项目的标题。description：项目的描述。imgSrc：项目图片的路径。href：项目的链接。
//项目1: "A Search Engine"---title: 'A Search Engine'description: 描述了一个搜索引擎的功能，可以查找各种信息，如网页、图片、视频等。imgSrc: '/static/images/google.png'，指向Google的标志图片。href: 'https://www.google.com'，指向Google的官网链接。
//项目2: "The Time Machine"---title: 'The Time Machine'description: 描述了一个时间机器的功能，可以让用户穿越到过去或未来。imgSrc: '/static/images/time-machine.jpg'，指向时间机器的图片。href: '/blog/the-time-machine'，指向相关博客文章的链接。

export default projectsData
//导出项目数据,这行代码将 projectsData 数组作为默认导出，使其可以在其他文件中被导入和使用。
//定义了一个项目数据结构，并提供了两个示例项目。这些数据可以用于显示在项目展示页面或组件中，展示项目信息、图片和链接。
