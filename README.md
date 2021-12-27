# React Native Boilerplate

[![React Native](https://img.shields.io/badge/React%20Native-v0.66.0-green.svg)](https://facebook.github.io/react-native/)
[![React Navigation V6](https://img.shields.io/badge/React%20Navigation-v6.0-blue.svg)](https://reactnavigation.org/)

一个开箱即用的 React Native 工程脚手架

## Features

- [Typescript](https://www.typescriptlang.org/) 支持
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Query](https://react-query.tanstack.com) 管理异步请求数据状态&缓存 🚀
- **Swagger Api Codegen** Api 接口 ts 代码生成，可更好结合 react-query 使用，不写请求代码
- [Zustand](https://github.com/pmndrs/zustand) 基于 hooks 的状态管理
- [React Navigation](https://reactnavigation.org/) 支持 [Authentication flow（身份验证流程）](https://reactnavigation.org/docs/auth-flow)和主题
- [React Native Gesture Handler](https://github.com/kmagiera/react-native-gesture-handler)
- [NativeBase](https://github.com/GeekyAnts/nativebase/) UI 组件库
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [Jest](https://facebook.github.io/jest/)
- [Eslint](http://eslint.org/) ([Airbnb config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb))

## How this looks

  <img height="720" src="https://user-images.githubusercontent.com/15869386/136666124-76a50fc3-8320-4a79-8256-354334ce7685.gif" />
  
## Prerequisites

- [Node](https://nodejs.org) v12+
- [Yarn](https://yarnpkg.com/)
- 更多看[官方环境介绍](https://facebook.github.io/react-native/docs/getting-started.html)

## Folder structure

```shell
├── src
    ├── assets          # 本地静态资源
    ├── components      # 业务通用组件
    ├── config          # 配置,包含icon,styles等
    ├── hooks           # hooks
    ├── lib             # 封装工具类lib，或第三方lib，区别于utils
    ├── navigation      # 路由导航
    ├── rh              # @roothub/cli api 生成文件夹，包含网络请求和生成的接口定义类
    ├── screens         # 业务页面
    ├── services        # 服务封装，auth 或 react-query等
    ├── store           # zustand 状态管理文件
    └── utils           # 工具函数库，通用函数

```

## Getting Started

> 根目录 `.env.[environment]` 文件，代表对应环境下的环境变量配置

1. 克隆项目, `git clone https://github.com/RootLinkFE/react-native-template.git <your project name>`
2. 切换到项目根目录, `cd <your project name>`
3. 删除 `.git` 文件夹, `rm -rf .git`
4. 使用插件 [React Native Rename](https://github.com/junedomingo/react-native-rename) 重命名项目名称 `$ npx react-native-rename <newName>`，也可以快速修改 bundleId
5. 执行 `yarn` 安装依赖
6. 如果是 ios，执行 `yarn pod`
7. 执行 `yarn start` 启动 packager
8. 链接你的手机（或者虚拟机启动）

- On Android:
  - 执行 `yarn android` 或 在 Android Studio 中启动
- On iOS:
  - 执行`yarn ios` 使用 Xcode `ios/YourReactProject.xcworkspace`打开，点击 `Run`

9. 完毕!!!

更多查看 [更多文档](./doc.md)

## TODO

- [x] 主题切换
- [ ] 一些常用组件
- [ ] 组件测试用例
- [ ] Swagger api 接口代码生成，改进成配置化，更新配置和执行配置命令就可以同步更新创建接口定义代码

## Contributing

欢迎 PR 共建
