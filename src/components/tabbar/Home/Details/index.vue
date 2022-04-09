<template>
  <div class="content">
    <ul class="mui-table-view mui_list">
      <li
        class="mui-table-view-cell mui-media mui_list"
        v-for="item in detailList"
        :key="item.id"
      >
        <router-link :to="{path:`/home/news/${item.id}`}">
          <img class="mui-media-object mui-pull-right" :src="item.img_url">
          <div class="mui-media-body mui_body">
            {{ item.title }}
            <p class="mui-ellipsis">{{ item.zhaiyao }}</p>
            <p class="mui_items">
              <span>发布时间{{item.add_time | formatDate('YYYY-MM-DD')}}</span>
              <span>点击数：{{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      detailList: [],
      // 获取当前点击的元素id
    };
  },
  created() {
    this.getRequestDetails();
  },
  methods: {
    // 请求详情列表数据
    async getRequestDetails() {
      let resolt = await this.$axios({
        url: "/api/getnewslist",
        method: "get",
      });
      if (resolt.status == 200) {
        this.detailList = resolt.data.message;
      }
      else{
        Promise(new Error('false'))
      }
    },
  },
};
</script>

<style scoped>
.mui_list img{
  margin-top: 10px;
  border-radius: 50%;
}
.content{
  overflow-x: hidden;
}
.mui_list li{
  display: flex;
  justify-content: space-between;
}
.mui_list .mui_body{
  width: 70%;
}
.mui_list .mui_body p{
  font-size: 12px;
  list-style: 28px;
  margin-top: 5px;
}
.mui_list .mui_body .mui_items{
  margin-top: 12px;
  
}
.mui-table-view .mui-media-object{
  line-height: 50px;
  max-width: 55px;
  max-height: 55px;
}
</style>