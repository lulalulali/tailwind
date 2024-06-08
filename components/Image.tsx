//处理图片渲染的组件，可能包含响应式图片、懒加载等功能。一个自定义的 Image 组件，它基于 next/image 模块。这个自定义组件主要是为了简化或进一步封装 NextImage 组件，使其在使用时更加方便和统一。
import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => <NextImage {...rest} />

export default Image

//从 next/image 模块导入默认导出的 NextImage 组件，以及 ImageProps 类型。NextImage 是 Next.js 提供的用于优化图像加载的组件，ImageProps 则是该组件接受的属性类型。
//定义了一个名为 Image 的函数组件，该组件接受所有 ImageProps 类型的属性，并将这些属性传递给 NextImage 组件。({ ...rest }: ImageProps)：使用对象展开运算符 ...rest 获取所有传入的属性，并确保它们符合 ImageProps 类型。<NextImage {...rest} />：将所有属性传递给 NextImage 组件进行渲染。这种写法相当于直接使用 NextImage 组件，但通过这个自定义组件可以在未来根据需要对 NextImage 进行进一步的封装或修改，而不需要在每个使用 Image 的地方做变更。
//将自定义的 Image 组件导出，以便在其他文件中使用。
