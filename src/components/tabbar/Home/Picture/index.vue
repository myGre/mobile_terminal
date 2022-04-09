<template>
  <div class="content">
    <!-- 导航栏 -->
    <div class="swiper" ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="nav in navbar" :key="nav.nav_id">
          <p :class="{ navlist: isId == nav.id }" @click="getByNav(nav.id)">
            {{ nav.title }}
          </p>
        </div>
      </div>
    </div>
    <!-- 图片展示区 -->
    <div class="nav_content" v-for="item in navBody" :key="item.id">
      <h4>{{item.title}}</h4>
      <p>{{item.zhaiyao}}</p>
      <router-link :to="`/home/picture/imagemegs/${item.id}`">
          <img v-lazy="item.img_url" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script>
// swiper插件
import Swiper from "swiper";
// import Swiper and modules styles
import "swiper/swiper.min.css";

export default {
  name: "Picture",
  data() {
    return {
      // 导航栏
      navbar: [],
      // id，默认为17
      isId: 17,
      navBody:[]
    };
  },
  mounted() {
    // 导航栏
    const swiper = new Swiper(this.$refs.swiper, {
      //   loop: true, // 循环模式选项
      autoplay: true, //自动切换
      autoplay: {
        delay: 2000, //自动切换的时间间隔，单位ms
        disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay
      },
      //设置slider容器能够同时显示的slides数量(carousel模式)。
      slidesPerView: 5,
    });
    this.getByInfo();
    this.getByNav(0)
  },
  methods: {
    // 获取点击的导航栏
    async getByNav(id) {
      console.log(id);
      this.isId = id;
      let result = await this.$axios({
        url: `/api/getimages/${this.isId}`,
        method: "get",
      });
      if (result.data.status == 0) {
        this.navBody = result.data.message
      }
    },
    // 获取图片列表
    async getByInfo() {
      try {
        let result = await this.$axios({
          url: "/api/getimgcategory",
          method: "get",
        });
        if (result.data.status == 0) {
          // console.log(resolt.data.message);
          result.data.message.unshift({title:'全部图片', id: 0})
          this.navbar = result.data.message;
        }
      } catch (error) {}
    },
    // 点击图片进入详情
  },
};
</script>

<style scoped>
.content{
    margin-bottom: 50px;
}
.navlist {
  color: rgb(120, 192, 216);
  border-bottom: 2px solid rgb(216, 120, 128);
}
.swiper-slide p {
  margin-top: 10px;
  line-height: 15px;
  font-size: 14px;
  font-weight: 500;
  width: 56px;
}
.nav_content{
    width: 100vw;
    height: 250px;
    position: relative;
}
.nav_content img{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
}
.nav_content h4{
    height: 22px;
    overflow: hidden;
    position: absolute;
    bottom: 50px;
    z-index: 2;
    font-size: 22px;
}
.nav_content p{
    height: 40px;
    overflow: hidden;
    position: absolute;
    bottom: 0px;
    z-index: 2;
    text-indent: 2em;
    font-size: 16px;
    color: #ccc;
    font-weight: 500;
    opacity: .6;
}
</style>