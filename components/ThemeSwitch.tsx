//定义主题切换组件，允许用户在浅色和深色主题之间切换。  定义了一个主题切换组件 ThemeSwitch，允许用户在浅色和深色主题之间切换。组件使用了 next-themes 来管理主题，并使用 @headlessui/react 提供的 Menu 和 RadioGroup 组件来创建一个下拉菜单。 就是调节白昼模式的下拉框.
'use client'

import { Fragment, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Menu, RadioGroup, Transition } from '@headlessui/react'
//use client 表明这个组件在客户端渲染。导入 React 的 Fragment, useEffect, useState。导入 next-themes 中的 useTheme 钩子，用于管理主题。导入 @headlessui/react 中的 Menu, RadioGroup, Transition 组件，用于创建下拉菜单。

const Sun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-6 w-6 text-gray-900 dark:text-gray-100"
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
)
const Moon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-6 w-6 text-gray-900 dark:text-gray-100"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
)
const Monitor = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="h-6 w-6 text-gray-900 dark:text-gray-100"
  >
    <rect x="3" y="3" width="14" height="10" rx="2" ry="2"></rect>
    <line x1="7" y1="17" x2="13" y2="17"></line>
    <line x1="10" y1="13" x2="10" y2="17"></line>
  </svg>
)
//定义了三个 SVG 图标组件 Sun, Moon, 和 Monitor，分别表示太阳（浅色主题）、月亮（深色主题）和显示器（系统主题）。

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  //使用 useState 钩子初始化一个 mounted 状态，以确定组件是否挂载。使用 useTheme 钩子从 next-themes 获取当前的主题、设置主题的函数 setTheme 以及解析后的主题 resolvedTheme。
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])
  //使用 useEffect 钩子在组件挂载后将 mounted 状态设置为 true。

  return (
    <div className="mr-5">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>{resolvedTheme === 'dark' ? <Moon /> : <Sun />}</Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
            <RadioGroup value={theme} onChange={setTheme}>
              <div className="p-1">
                <RadioGroup.Option value="light">
                  <Menu.Item>
                    <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm">
                      <div className="mr-2">
                        <Sun />
                      </div>
                      Light
                    </button>
                  </Menu.Item>
                </RadioGroup.Option>
                <RadioGroup.Option value="dark">
                  <Menu.Item>
                    <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm">
                      <div className="mr-2">
                        <Moon />
                      </div>
                      Dark
                    </button>
                  </Menu.Item>
                </RadioGroup.Option>
                <RadioGroup.Option value="system">
                  <Menu.Item>
                    <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm">
                      <div className="mr-2">
                        <Monitor />
                      </div>
                      System
                    </button>
                  </Menu.Item>
                </RadioGroup.Option>
              </div>
            </RadioGroup>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
//返回的 JSX 中包含一个 Menu 组件，它是一个下拉菜单，允许用户选择不同的主题。Menu.Button 根据当前的 resolvedTheme 显示相应的图标（太阳或月亮）。
//Transition 组件处理菜单的过渡效果。as={Fragment}as 属性指定渲染的元素类型。在这里，Fragment 表示过渡效果将不产生额外的 DOM 元素。enter定义元素进入时的过渡类，transition ease-out duration-100 表示过渡效果使用了 ease-out 缓动函数，持续时间为 100 毫秒。enterFrom定义元素进入时的初始状态类，transform opacity-0 scale-95 表示元素在开始时的透明度为 0，缩放为 95%。enterTo定义元素进入时的结束状态类，opacity-100 scale-100 表示元素在结束时的透明度为 100%，缩放为 100%。leave定义元素离开时的过渡类，transition ease-in duration-75 表示过渡效果使用了 ease-in 缓动函数，持续时间为 75 毫秒。leaveFrom定义元素离开时的初始状态类，opacity-100 scale-100 表示元素在开始离开时的透明度为 100%，缩放为 100%。leaveTo定义元素离开时的结束状态类，opacity-0 scale-95 表示元素在结束离开时的透明度为 0，缩放为 95%。  即--当菜单项显示时：元素从 opacity-0 scale-95 过渡到 opacity-100 scale-100，即从不透明度为 0 和缩放为 95% 逐渐变为不透明度为 100% 和缩放为 100%。当菜单项隐藏时：元素从 opacity-100 scale-100 过渡到 opacity-0 scale-95，即从不透明度为 100% 和缩放为 100% 逐渐变为不透明度为 0 和缩放为 95%。  -----这种过渡效果让菜单在打开和关闭时显得更加平滑和自然。
//Menu.Items 包含一个 RadioGroup，用于实现单选按钮组，用户可以选择 Light、Dark 或 System 主题。每个 RadioGroup.Option 对应一个主题选项，通过 onClick 事件调用 setTheme 设置相应的主题。
//Menu.Items
//1.className 属性absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800：这些类用于定位菜单项、添加样式和阴影效果，以及在深色模式下应用不同的背景颜色。
//2. RadioGroupvalue={theme}：设置当前选中的主题。onChange={setTheme}：当用户选择不同的主题时调用 setTheme 函数来更新主题。
//3. RadioGroup.Option  value="light"：设置选项值为 light。value="dark"：设置选项值为 dark。value="system"：设置选项值为 system。
//4. Menu.Item包裹在 RadioGroup.Option 内部，每个选项都包含一个 Menu.Item。
//5. buttonclassName 属性group flex w-full items-center rounded-md px-2 py-2 text-sm：这些类用于设置按钮样式，使其充满整个菜单项，并添加间距、圆角和小字体。
//6. 图标组件<Sun />、<Moon /> 和 <Monitor />：分别显示浅色主题、深色主题和系统默认主题的图标。这些图标组件放置在按钮的 div 元素中，并且有一个 mr-2 类，用于在图标和文字之间添加右侧边距。
//7. 菜单项内容"Light"、"Dark" 和 "System"：分别表示不同的主题选项。

//ThemeSwitch 组件使用了 useTheme 钩子从 next-themes 中获取当前的主题以及用于设置主题的 setTheme 函数。
//使用 useEffect 钩子在组件挂载后将 mounted 状态设置为 true。
//返回的 JSX 中包含一个 Menu 组件，当点击按钮时，会显示一个下拉菜单，菜单中有三个选项：Light，Dark，和 System。点击不同的选项会调用 setTheme 函数设置相应的主题。Transition 组件用于处理菜单的过渡效果。RadioGroup 组件用于实现单选按钮组的功能，每个 RadioGroup.Option 组件对应一个主题选项。

export default ThemeSwitch
//实现了一个功能完整的主题切换组件，用户可以通过点击图标按钮在浅色、深色和系统主题之间进行切换。
