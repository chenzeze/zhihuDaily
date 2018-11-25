<<<<<<< HEAD
# vue 2.0 知乎日报
=======
# 知乎日报
>>>>>>> cfd57272765c11204ecd4470ae92fae3b2f76d6a

> A Vue.js (vue-cli, vue-router, axios, vuex) + nodejs  project

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


日报项目是一个简单的单页小应用，使用路由和大规模状态管理插件 Vuex，在工程上并不算复杂，比较适合刚入手 Vue 的练习项目。虽然看似简单，但它覆盖了业务中很多场景，对代码进行了组织和模块化，很接近真实的生产项目。项目对代码维护和扩展性也有考虑，比如通用工具函数的提取、组件的解糯等，这些细节都是在实际项目中要考虑的。

它由 3 部分组成左侧是菜单，分为“每日推荐”和“主题日报”两个类型，中间是文章列表，右侧是文章正文和评论。

1.每日推荐按日期排列，比如图中显示为 5 月 2 日的推荐文章，中间栏滚动至底部时，自动加载前一天的推荐内容。
（监听滚动事件，当$list 的scrollTop +  clientHeight >= scrollHeight 时，判断到达底部）

2.主题日报有“日常心理学”等 10 多个子分类，分类列表默认是收起的，点击“主题日报”菜
单时切换展开和收起的状态。该类目知乎接口数据获取不到，暂不实现，子分类从static/mock/themes.json 模拟数据读取

知乎日报的接口地址前缀为 http://news-at.zhihu.com/api/4/，
图片地址前缀为https://picl/zhimg.com ，由于两者都开启了跨域限制，无法在前端直接调用，因此要开发一个代理 。

日报应用效果

![Image text](https://raw.githubusercontent.com/chenzeze/zhihuDaily/master/src/assets/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5%E6%95%88%E6%9E%9C%E5%9B%BE.png)

使用了代理 ，配置在 /config/index.js proxyTable变量中

其中接口 /api,最终改变为 /
和图片 /img


## Build Setup

``` bash

# run node service
node node-file.js

# 如果希望改变node-file.js中代码时无需重新运行，可用 supervisor
# 用法: npm i supervisor
#      supervisor node-file.js

# if success, there will be a log as below
Your application is running here: http://localhost:8080

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# then open localhost:8080 to see the fruit

# 改变vue试图，无需刷新，会自动编译
```
