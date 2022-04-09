<template>
  <div class="content">
    <h4>{{ imagesInfo.title }}</h4>
    <p class="msg">
      <span class="time"
        >时间：{{
          imagesInfo.add_time | formatDate("YYYY-MM-DD HH:mm:ss")
        }}</span
      >
      <span>点击数：{{ imagesInfo.click }}</span>
    </p>
    <hr />
    <div class="thumbs ">
      <vue-preview :slides="slide1" @close="handleClose" class="pc_thumb">
      </vue-preview>
    </div>
    <p class="content_body" v-html="imagesInfo.content"></p>
  </div>
</template>

<script>
export default {
  name: "ImageMegs",
  data() {
    return {
      // 初始化信息
      imagesInfo: {},
      // 缩略图数组
      slide1: [],
    };
  },
  created() {
    this.getImagesInfo();
    this.getRequestImages();
  },
  methods: {
    // 获取图片详情信息
    async getImagesInfo() {
      let id = this.$route.params.id;
      let resolt = await this.$axios({ url: `/api/getimageInfo/${id}` });
      if (resolt.data.status == 0) {
        this.imagesInfo = resolt.data.message[0];
      }
    },
    // 获取缩略图
    async getRequestImages() {
      let id = this.$route.params.id;
      let resolt = await this.$axios({
        url: `/api/getthumimages/${id}`,
        method: "get",
      });
      if (resolt.data.status == 0) {
        this.imagesArr = resolt.data.message;
        resolt.data.message.forEach((element) => {
          // console.log(index);
          let src = element.src;
          let msrc = element.src;
          let w = 600
          let h = 600
          let alt = 'picture1'
          let title = 'Image Caption'
          this.slide1.push({
            src, msrc, w, h, alt, title
          })
        });
      }
    },
    // 点击缩略图
    handleClose() {
      console.log("close event");
    },
  },
};
</script>

<style scoped>
.content {
  text-align: center;
}
.content .content_body {
  text-indent: 2em;
}
.content h4 {
  margin: 10px auto 0;
  width: 220px;
  letter-spacing: 0px;
  font-weight: 600px;
  line-height: 25px;
  color: rgb(63, 182, 182);
  text-align: center;
}
.content .msg {
  margin-top: 10px;
  margin-bottom: -10px;
}
.content .msg span {
  display: inline-block;
}
.content .msg .time {
  margin-right: 20px;
}
.content .thumbs{
  margin: 20px 0;
}
.pc_thumb{
  width: 100vw;
}
.thumbs .pc_thumb >>> .my-gallery{
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
.pc_thumb >>> .my-gallery figure {
      width: 25%;
      margin: 5px;
    }
.pc_thumb >>> .my-gallery figure img{
  width: 100px;
}
</style>
