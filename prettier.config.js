module.exports = {
  //    - Prettier 配置文件，用于配置 Prettier 代码格式化工具的行为和规则。这个文件是用来配置 Prettier 代码格式化工具的行为和规则的。是一个意见很强的代码格式化工具，旨在通过一组一致的规则来格式化代码，从而简化代码风格的维护。
  semi: false, // 代码行末尾不使用分号
  singleQuote: true, // 字符串使用单引号
  printWidth: 100, // 每行的最大长度,超过会换行
  tabWidth: 2, // 一个 tab 键的宽度\空格数
  useTabs: false, // 使用空格而不是 tab 键缩进
  trailingComma: 'es5', // 在 ES5 中有效的地方使用尾逗号（例如对象和数组的最后一个元素后面）。
  bracketSpacing: true, // 在对象字面量的括号之间打印空格（例如 { foo: bar } 而不是 {foo: bar}）。
  plugins: ['prettier-plugin-tailwindcss'], // 使用 Tailwind CSS 插件来优化 Tailwind CSS 类的排序和格式化。
}
