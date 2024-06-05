//    - Tailwind CSS 配置文件，用于配置 Tailwind CSS 框架的行为，包括自定义主题、插件等。这个文件是用于配置 Tailwind CSS 框架的:是一个实用类优先的 CSS 框架，允许你通过使用预定义的类来快速构建自定义的设计。
// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
    //content:指定要扫描以生成 Tailwind CSS 的文件路径。这样做是为了让 Tailwind 能够找到并移除未使用的样式，从而减少生成的 CSS 文件的大小.
  ],
  darkMode: 'class',
  //设置暗模式的触发方式。这里使用的是 'class'，表示通过在 HTML 元素上添加 class="dark" 来启用暗模式。
  theme: {
    //用于扩展 Tailwind CSS 的默认主题配置。行高\san字体\自定义颜色\排版插件配置
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.pink,
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  //添加 Tailwind CSS 的插件，这里包括 @tailwindcss/forms 和 @tailwindcss/typography。这些插件分别用于处理表单样式和排版样式。
}
