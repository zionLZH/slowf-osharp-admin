slowf-osharp-admin 是一款基于element-ui + slowf开发的，支持osharp后端的后台框架，对于本框架用到的相关组件/工具请通过以下俩处查看相关文档    

Element-ui: http://element-cn.eleme.io/#/zh-CN/component/installation   
Slowf: https://github.com/zionLZH/slowf-project/wiki    


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

## 更新日志
#### 2020-08-18
````
修复搜索的时候pageIndex不会重置的问题
````
#### 2020-08-15
````
更新src/config/ajax中关于刷新Token的逻辑，修复Token刷新失败之后无弹窗的问题
````
#### 2020-08-10
````
更新Header组件逻辑，修复在获取不到用户信息的情况下导致无法退出登陆的问题
````
#### 2020-06-16
````
紧急更新slowf为最新版，修复所有的filter类型都强制为like的问题
````
#### 2020-06-08
````
修复多级菜单嵌套下出现的渲染错误(有父无子)
调整权限验证方案，在没有模块信息的情况下默认全Pass
````
#### 更早
````
创建项目，更新基础版本
````
