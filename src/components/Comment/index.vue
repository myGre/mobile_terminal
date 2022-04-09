<template>
  <div class="content">
    <!-- 发表评论 -->
    <div class="addComment">
      <h4>发表评论：</h4>
      <textarea
        placeholder="请输入不大于（120）字的评论"
        type="text"
        cols="30"
        rows="7"
        maxlength="120"
        v-model="meg"
      >
      </textarea>
      <mt-button class="btn" @click="addComment" type="primary" size="large"
        >发表评论</mt-button
      >
    </div>
    <!-- 评论区 -->
    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
      <li
        class="mui-table-view-cell"
        v-for="(comment, index) in commentList"
        :key="index"
      >
        <div class="mui-table">
          <div class="mui-table-cell mui-col-xs-10">
            <h5>评论人:{{ comment.user_name }}</h5>
            <p class="mui-h6 mui-ellipsis">
              {{ comment.content }}
            </p>
            <p class="mui-h5">
              时间：{{ comment.add_time | formatDate("YYYY-MM-DD hh:mm:ss") }}
            </p>
          </div>
        </div>
      </li>
      <mt-button class="btn" type="primary" size="large" @click="getMore" >加载更多</mt-button>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: "Comment",
  data() {
    return {
      commentList: [],
      meg: "",
      page:1
    };
  },
  props: ["id"],
  mounted() {
    this.getRequestComment();
  },
  methods: {
    // 获取评论区列表
    async getRequestComment() {
      let id = this.$route.params.id;
      try {
        let resolt = await this.$axios({
          url: `/api/getcomments/${Number(id)}?pageindex=${this.page}`,
          method: "get",
        });
        if (resolt.data.status == 0) {
          if (resolt.data.message != 0) {
            this.commentList = this.commentList.concat(resolt.data.message);
          }else{
           if (this.page != 1) {
              // console.log(11);
              Toast('没有更多数据了！')
           }
          }
        }
      } catch (error) {
        alert(error.message);
      }
    },
    // 发表评论
    async addComment() {
      let id = this.$route.params.id;
      let resolt = await this.$axios({
        url: `/api/postcomment/${id}`,
        method: "post",
        data: { content: this.meg.trim() },
      });
      if (resolt.data.status == 0) {
        let cmt = {
          add_time: new Date(),
          user_name: '匿名评论',
          content: this.meg
        }
        this.commentList.unshift(cmt)
        this.meg = ''
        // return console.log("ok");
      }
    },
    // 加载更多
    getMore(){
      this.page++
      this.getRequestComment()
    }
  },
};
</script>

<style scoped>
.content textarea {
  margin: 0;
}
.mui-h5 {
  float: right;
}
.mui-table-view-condensed {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>