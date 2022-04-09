// 引入路由组件
import Home from '@/components/tabbar/Home'
import Search from '@/components/tabbar/Search'
import ShoppingCarList from '@/components/tabbar/ShoppingCarList'
import User from '@/components/tabbar/User'
import Details from '@/components/tabbar/Home/Details'
import News from '@/components/tabbar/Home/News'
import Picture from '@/components/tabbar/Home/Picture'
import ImageMegs from '@/components/tabbar/Home/Picture/ImageMegs'
import ShoppingList from '@/components/Shopping/ShoppingList'
import GoodsInformation from '@/components/Shopping/GoodsInformation'
import ShoppingMsg from '@/components/Shopping/ShoppingMsg'
export default [
    // 购物车详情
    {
        path: '/home/shoppingmsg/:id',
        name: 'shoppingmsg',
        component: ShoppingMsg
    },
    // 购物车列表
    {
        path: '/home/goodsinformation/:id',
        name: 'goodsinformation',
        component: GoodsInformation
    },
    // 购物车列表
    {
        path: '/home/shoppinglist',
        name: 'shoppinglist',
        component: ShoppingList
    },
    // 图片详情
    {
        path: '/home/picture/imagemegs/:id',
        name: 'imagemegs',
        component: ImageMegs
    },
    // 图片分享
    {
        path: '/home/picture',
        name: 'picture',
        component: Picture
    },
    // 新闻资讯
    {
        path: '/home/details',
        name: 'details',
        component: Details
    },
    // 新闻详情
    {
        path: '/home/news/:id',
        name: 'news',
        component: News
    },
    // 底部导航
    // 首页
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    // 搜索
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    // 购物车
    {
        path: '/shoppingcarlist',
        name: 'shoppingcarlist',
        component: ShoppingCarList
    },
    // 会员
    {
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/',
        redirect: '/home'
    },
]