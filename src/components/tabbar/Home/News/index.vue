<template>
  <div class="content">
    <h3>{{ detail.title }}</h3>
    <p>{{ detail.add_time | formatDate("YYYY-MM-DD HH:mm:ss") }}</p>
    <hr />
    <p v-html="detail.content"></p>
    <!-- 发表评论 -->
    <Comment :id="detail.id"></Comment>
  </div>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      detail: {
        
      },
    };
  },
  created() {
    this.getRequest();
  },
  methods: {
    async getRequest() {
      let id = this.$route.params.id;
      let resolt = await this.$axios({
        url: `/api/getnew/${id}`,
        method: "get",
      });
      // console.log(resolt);
      if (resolt.status == 200) {
        this.detail = resolt.data.message[0];
      }
      else {
        Promise(new Error('false'))
      }
    },
  },
};
</script>

<style scoped>
.content {
  overflow: hidden;
}
</style>