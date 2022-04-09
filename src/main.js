// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 引入mui
import '@/lib/mui/css/mui.min.css'
import '@/lib/mui/css/icons.css'
// 引入日期格式化插件npm install moment --save
// 定义全局时间戳过滤器
import Moment from 'moment'
Vue.filter('formatDate', function (value, date) {
  return Moment(value).format(date)
})
// 图片懒加载
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

// 缩略图
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})
// 引入vuex
import store from './store'
// 注册全局组件
// 评论
import Comment from '@/components/Comment'
Vue.component(Comment.name, Comment)
// 轮播图
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
// 购物车小球
import Ball from '@/components/Ball'
Vue.component(Ball.name, Ball)
// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://www.liulongbin.top:3005"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  components: { App },
  template: '<App/>',
})
