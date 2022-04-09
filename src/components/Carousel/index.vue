<template>
  <div>
    <!-- banner -->
    <mt-swipe class="banner" :auto="3000">
      <mt-swipe-item v-for="img in swiper" :key="img.id">
        <img :src="img.img" alt="" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
    name:'Carousel',
    props:['swiper']
};
</script>

<style scoped>
.banner {
  height: 250px;
  width: 100vw;
  text-align: center;
}
.banner img {
  width: 100%;
  height: 100%;
}
</style>