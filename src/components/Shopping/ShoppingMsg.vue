<template>
  <div>
    <h3>{{ goodsMsg.title }}</h3>
    <p v-html="goodsMsg.content"></p>
  </div>
</template>

<script>
export default {
  name: "ShoppingMsg",
  data() {
    return {
      id: this.$route.params.id,
      goodsMsg: {},
    };
  },
  created() {
    this.getGoodsInfo();
  },
  methods: {
    async getGoodsInfo() {
      let result = await this.$axios({
        url: `/api/goods/getdesc/${this.id}`,
        method: "get",
      });
      if (result.data.status == 0) {
        this.goodsMsg = result.data.message[0];
      }
    },
  },
};
</script>

<style>
</style>