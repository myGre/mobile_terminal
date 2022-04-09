<template>
  <div>
    <!-- banner -->
    <Carousel :swiper='swiper'></Carousel>

    <!-- grid -->
    <ul class="mui-table-view mui-grid-view mui-grid-9 mui_list">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/details">
          <img src="@/assets/images/menu01.png" alt="" />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/picture">
          <img src="@/assets/images/menu02.png" alt="" />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/shoppinglist">
          <img src="@/assets/images/menu03.png" alt="" />
          <div class="mui-media-body">购物车</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/images/menu04.png" alt="" />
          <div class="mui-media-body">location</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/images/menu05.png" alt="" />
          <div class="mui-media-body">视频中心</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/images/menu06.png" alt="" />
          <div class="mui-media-body">联系我们</div></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      swiper: [
        {
          id: 1,
          url: "https://m.zztion.com/",
          img: "http://wangxiao.zztion.com/static/course/20200516/fddd41a35418417507afc0a60cc58bed.png",
        },
        {
          id: 2,
          url: "https://m.zztion.com/",
          img: "http://wangxiao.zztion.com/static/course/20200516/75b7e3d68507c95fa725374c1dc560c2.png",
        },
        {
          id: 3,
          url: "https://m.zztion.com/",
          img: "http://wangxiao.zztion.com/static/course/20200516/83eba24f22e2c1426be628984b24dc6a.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.mui_list img {
  width: 50px;
  height: 50px;
}
</style>