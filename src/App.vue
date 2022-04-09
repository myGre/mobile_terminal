<template>
  <div id="app">
    <!-- header -->
    <mt-header title="移动端小项目">
      <a slot="left">
        <mt-button icon="back" @click="history" >返回</mt-button>
      </a>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <transition name="router">
      <router-view />
    </transition>
    <!-- footer -->
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item" href="#tabbar">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link
        to="/shoppingcarlist"
        class="mui-tab-item"
        href="#tabbar-with-chat"
      >
        <span ref="shopping" class="mui-icon mui-icon-extra mui-icon-extra-cart">
        <span class="mui-badge" v-if="sum">{{sum}}</span>
        <span class="mui-badge" v-else>0</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/user" class="mui-tab-item" href="#tabbar-with-contact">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to="/search" class="mui-tab-item" href="#tabbar-with-map">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import "animate.css";
import { mapState } from 'vuex';
export default {
  name: "App",
  methods: {
    history(){
      history.go(-1)
    }
  },
  computed:{
    ...mapState(['quantityAll']),
    sum(){
      let num = null
      this.quantityAll.forEach(item => {
        num += item.num
      });
      return num 
    }
  },
  mounted() {
    this.$bus.$emit('shoppingCart', this.$refs.shopping)
  },
};
</script>

<style>
body{scroll-behavior: smooth;}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 40px; */
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  position: relative;
}
.router-enter {
  opacity: 0;
  transform: translateX(100vw);
}
.router-leave-to {
  opacity: 0;
  position: absolute;
  transform: translateX(-100vw);
}
.router-enter-to,
.router-leave {
  opacity: 1;
  /* position: absolute; */
}
.router-enter-active,
.router-leave-active {
  transition: all 0.7s;
}
</style>
