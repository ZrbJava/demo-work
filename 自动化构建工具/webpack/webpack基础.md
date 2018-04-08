

webpack基础
===

<!-- TOC -->

- [webpack](#webpack)
  - [什么是webpack](#什么是webpack)
  - [为什么需要webpack](#为什么需要webpack)
  - [webpack安装](#webpack安装)

<!-- /TOC -->

## webpack

### 什么是webpack

  webpack 是一个现代 JavaScript 应用程序的模块打包器(module bundler)，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。

  ![webpack是什么](./img/day03/webpack是什么.png)

### 为什么需要webpack

现在的前端，越来越复杂，特别是SPA（single page web application）流行之后，一个应用程序往往会依赖很多其他的模块，或者编译scss、less、stylus等，如果仅仅是靠人来管理是不可能的，这个时候我们必须依赖于webpack来解决。

现在最流行的三个SPA的框架，都于webpack紧密相连。
* React.js + webpack
* Vue.js + webpack
* Angular.js + webpack

学习webpack有4个重点内容：
* 入口(entry)
* 输出(output)
* 加载器(loader)
* 插件(plugins)

### webpack安装

注意：请先安装node环境

```npm install webpack -g```

建议大家这样操作(随时切换镜像源)：
  1. npm install nrm -g // 安装nrm
  2. nrm ls // 查看镜像源
  3. nrm use taobao // 选择淘宝镜像，也可以选择cnpm

### 使用webpack

#### 01-webpack-cli

使用命令：`webpack 输入文件路径 打包后文件路径`将一个文件打包成另外一个文件

#### 02-webpack-config

1. 配置webpack.config.js
2. 运行`webpack`

  ```js
  var path = require('path')

  module.exports = {
    // 入口文件配置
    entry: "./src/app.js",

    // 出口文件配置项
    output: {
      // 输出的路径，webpack2起就规定必须是绝对路径
      path: path.join(__dirname, 'dist'),
      // 输出文件名字
      filename: "bundle.js"
    }
  }
  ```

#### 03-webpack-dev-server

默认为--inline模式

1. 安装：`npm install webpack-dev-server -g`
2. 运行：`webpack-dev-server --inline`
3. 运行：`npm init -y`
4. 配置script：`"dev": "webpack-dev-server --inline --hot --open --port 8090"`
5. `npm i webpack-dev-server webpack -D`
6. `npm run dev`

```js
  var path = require('path')

  module.exports = {
    // 入口文件配置
    entry: "./src/app.js",

    // 输出配置
    output: {
      // 输出的路径
      path: path.join(__dirname, 'dist'),
      // 静态资源在服务器上运行时的访问路径，可以直接http://localhost:8080/dist/bundle.js访问到服务器中的bundle.js文件
      publicPath: '/dist',
      // 输出文件名字
      filename: "bundle.js"
    }
  }
```

#### 04-webpack-css

1. 安装`npm install css-loader style-loader --save-dev`

```js
  module: {
    rules: [
      // 配置的是用来解析.css文件的loader(style-loader和css-loader)
      {
        // 1.0 用正则匹配当前访问的文件的后缀名是  .css
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
      }
    ]
  }
```

#### 05-webpack-less&webpack-sass

`npm install less less-loader sass-loader node-sass --save-dev`

```js
{
    test: /\.less$/,
    use: [{
        loader: 'style-loader'
    }, {
        loader: 'css-loader'
    }, {
        loader: 'less-loader'
    }]
},
```

```js
{
    test: /\.scss$/,
    use: [{
        loader: 'style-loader'
    }, {
        loader: 'css-loader'
    }, {
        loader: 'sass-loader'
    }]
}
```


#### 06-webpack-图片&字体

1. `npm install file-loader url-loader --save-dev`

```js
{
    test: /\.(png|jpg|gif)/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 50000
        }
    }]
}
```

#### 07-webpack-html

1. `npm install html-webpack-plugin --save-dev`

2. 如果添加了title，需要在模板中添加`<%= htmlWebpackPlugin.options.title %>`

```js
// 注意需要注释掉publicPath，不然会冲突

var HtmlWebpackPlugin = require('html-webpack-plugin')

plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'template.html'
    })
]
```

#### 08-webpack-babel

1. `npm install babel-core  babel-loader babel-preset-env --save-dev`

注意：

webpack 1.x | babel-loader <= 6.x  

webpack 2.x | babel-loader >= 7.x (推荐) (^6.2.10 也能用, 但是会出现不推荐使用的警告)

webpack 3.x | babel-loader >= 7.1

```js
    {
      test: /\.js$/,
      // Webpack2建议尽量避免exclude，更倾向于使用include
      // exclude: /(node_modules)/, // node_modules下面的.js文件会被排除
      include: [path.resolve(__dirname, 'src')]
      use: {
        loader: 'babel-loader',
        // options里面的东西可以放到.babelrc文件中去
        options: {
          presets: ['env']
        }
      }
    }

// .babelrc文件内的配置
{
  "presets":["env"]
}
```

#### 09-webpack-vue

1. `npm install vue-loader vue-template-compiler --save-dev`
2. `npm install vue --save`

```js
{
    test: /\.vue$/,
    loader: 'vue-loader'
}

// 如果使用的是webpack1.x，还需要安装 `babel-plugin-transform-runtime`,并添加一下配置；如果是webpack2.x以上请忽略一下配置
{
  test: /\.js$/,
  exclude: /(node_modules)/, // node_modules下面的.js文件会被排除
  use: {
    loader: 'babel-loader',
    // options里面的东西可以放到.babelrc文件中去
    options: {
      presets: ['env'],
      plugins: ['transform-runtime'] 
    }
  }
}

```

使用vue文件创建vue组件

```html

<!-- App.vue -->
<template>
  <div>{{msg}}</div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'hello world'
    }
  }
}
</script>
<style>
  div {
    color: red;
  }
</style>
```
```js
// app.js
import Vue from 'vue'
import App from './App.vue'

new Vue({
    el: '#app',
    render: h=> h(App)
})
```

### vue-router

```js
// app.js
import Vue from 'vue'
import App from './App.vue'

import Login from './Login.vue'

// 1. 引入vue-router
import VueRouter from 'vue-router'

// 2. 表示使用路由插件
Vue.use(VueRouter)

//3. 配置路由规则
var router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login }
  ]
})

new Vue({
  el: '#app',
  // 挂载路由
  router,
  // 这是个渲染函数，指定渲染组件
  render: h => h(App)
})
```


### vue-cli

vue-cli是官方的一个脚手架工具，所谓脚手架呢就是一个架子，什么架子呢？项目结构的架子，里面有一些最基本的结构配置。利用vue-cli呢，我们可以生成这样的一个脚手架，所以呢它就被称为vue脚手架工具。

`npm install vue-cli -g`

`vue init webpack admin`

### element-ui使用简介

安装：`npm i element-ui -S`
[element-ui使用](http://element-cn.eleme.io/2.0/#/zh-CN/component/quickstart)