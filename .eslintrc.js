module.exports = {
  //   - ESLint 配置文件，定义项目的代码质量和风格检查规则。 之后 确保已经安装了所有必要的依赖项.
  root: true,
  parser: '@typescript-eslint/parser',
  //一个根配置文件，ESLint 不会再向上查找配置文件。指定 ESLint 使用 @typescript-eslint/parser 作为解析器，以支持 TypeScript 语法。
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
    //允许浏览器全局变量。允许使用 AMD 规范。允许 Node.js 全局变量和作用域。允许 ES6 语法和全局变量。
  },
  plugins: ['@typescript-eslint'],//用 @typescript-eslint 插件来检查 TypeScript 代码。
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'next',
    'next/core-web-vitals',
    //使用 ESLint 推荐的规则。
    //调整 ESLint 推荐的规则以适应 TypeScript。
    //使用 @typescript-eslint 插件推荐的规则。
    //使用 eslint-plugin-jsx-a11y 推荐的可访问性规则。
    //使用 eslint-plugin-prettier 推荐的规则，集成 Prettier。
    //使用 Next.js 推荐的规则。
    //使用 Next.js 核心 Web Vitals 相关的规则。
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    //启用项目配置模式，需要在项目根目录下有 tsconfig.json 文件。
    // 设置 tsconfig.json 文件的根目录。
  },
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    //将 Prettier 的问题视为错误。
    //关闭 React 在 JSX 作用域中的检查（React 17+ 不再需要）。
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
      //确保链接有效，特别是对于 Next.js 的 Link 组件。
      //将该规则设置为错误级别。如果链接无效，将报告为错误。
      //指定 Link 组件（通常是 Next.js 提供的）需要进行有效性检查。
      //定义需要特别处理的链接属性，通常是用于 Link 组件中的属性。
      //指定需要检查的方面： 检查链接是否包含无效的 href 属性（例如空的或 #） 检查是否有一些链接应该被改为按钮。
    ],
    'react/prop-types': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react/no-unescaped-entities': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    //关闭 prop-types 检查（使用 TypeScript 类型检查）。
    //关闭未使用变量的检查。
    //关闭对未转义实体的检查。
    //关闭显式模块边界类型检查。
    //关闭对 require 语句的检查。
    //关闭对 @ts- 注释的禁止。
  },
}
