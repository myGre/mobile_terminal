import Vue from 'vue'
import Router from 'vue-router'

import routes from './router'

Vue.use(Router)

const router = new Router({
  routes,
  // 点击跳转某个页面时的样式
  linkActiveClass: 'mui-active',
  // 页面跳转
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { x: 0, y: 0 }
  },
})
// 路由守卫
// router.afterEach(()=>{
//   // console.log(window.scrollTop(0,  0));
//   document.body.scrollTo(0, 0)
// })

export default router