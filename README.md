### 1.如何使用
#### 1.1 安装依赖
````
yarn
````
yarn是一款新型的Node包管理工具，提供更完美的包管理，并且能够通过缓存包的方式解决模块包下载慢的问题。  
如果你正在使用npm或者cnpm，请使用以下命令进行依赖安装
````
npm install
或
cnpm install(不推荐!)
````
由于cnpm多次出现在docker自动化部署中出现不知名错误，因此推荐使用yarn或者npm，对于node-sass报错的问题，请全局安装window-build-tool模块

#### 1.2 配置前端代理
本项目基于Vue-cli3 + Webpack4，因此前端代理配置与Vue-cli2有所不同，在vue.config.js文件中进行配置，配置部分代码如下
````
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.osharp.org'
      }
    }
  }
```` 

#### 1.3 运行调试
由于Vue-cli3是一个全新版本，因此不再使用之前的命令
````
yarn run serve
````

#### 1.4 正式构建
````
yarn run build
````
构建完成之后文件将在./dist目录下面，请勿直接使用file://打开，将无法正常浏览。
