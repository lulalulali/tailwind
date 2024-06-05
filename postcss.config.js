module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    //    - PostCSS 配置文件，用于配置 PostCSS 插件和选项，通常用于处理 CSS 文件。这个文件是用来配置 PostCSS 插件的:一个用于将现代 CSS 特性转换为大多数浏览器能够理解的 CSS 的工具.
    //tailwindcss：配置 Tailwind CSS 插件，用于在项目中使用 Tailwind CSS 框架。Tailwind CSS 是一个实用优先的 CSS 框架，提供了大量的类，可以直接在 HTML 中使用这些类来快速创建响应式设计。启用 Tailwind CSS 功能。 autoprefixer：配置 Autoprefixer 插件，用于自动添加不同浏览器的前缀，以确保 CSS 的兼容性。例如，-webkit-、-moz-、-ms- 等前缀会自动添加到需要的 CSS 属性中。插件用于自动添加浏览器前缀，确保 CSS 代码在不同浏览器中的兼容性。
  },
}
