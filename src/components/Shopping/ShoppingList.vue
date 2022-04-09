<template>
  <div class="comtent">
    <!-- 商品列表 -->
    <div
      class="goods_comtent"
      v-for="(shopping, index) in goodInfo"
      :key="shopping.id"
    >
      <router-link :to="`/home/goodsinformation/${shopping.id}`">
        <img :src="shopping.img_url" />
      </router-link>
      <h3 ref="tittle">{{ shopping.title }}</h3>
      <p class="goods_item">
        <em class="price1">￥{{ shopping.market_price }}.00</em>
        <span class="price2">￥{{ shopping.sell_price }}.00</span>
      </p>
      <div class="goods_data">
        <h3>剩余：{{ shopping.stock_quantity }}</h3>
        <span
          class="mui-icon mui-icon-extra mui-icon-extra-cart shopping"
          @click="addCart(index, shopping.id)"
        ></span>
      </div>
    </div>
    <!-- 加载更多 -->
    <mt-button class="btn" type="primary" size="large" @click="getMore"
      >加载更多</mt-button
    >
    <!-- 小球 -->
    <Ball ref="xiaoQiu" :ball='ball'></Ball>
    <!-- <transition
      @before-enter="before_enter"
      @enter="enter"
      @after-enter="after_enter"
    >
      <div
        @transitionend="finishHandle"
        class="goods"
        v-show="balls.flag"
        ref="globule"
      ></div>
    </transition> -->
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapState } from "vuex";
export default {
  name: "ShoppingList",
  data() {
    return {
      isMore:false,
      // 初始数据
      goodInfo: [],
      num: 1,
      // 小球的运动之前的位置
      ball: {
        x: "",
        y: "",
      },
    };
  },
  computed: {
    ...mapState(["quantityAll"]),
  },
  created() {
    this.getShoppingList();
  },
  methods: {
    // 获取商品列表数据
    getShoppingList() {
      this.$axios({
        url: `/api/getgoods?pageindex=${this.num}`,
        method: "get",
      }).then((result) => {
        //
        if (result.data.message.length != 0) {
          let ck = [];
          let getList = []
          // 如果是加载更多则合并数组
          if (this.isMore) {
            getList = this.goodInfo.concat(result.data.message);
            this.isMore = false
          }else{
            // 正常请求
            getList = result.data.message;
          }
          // 处理数据
          getList.forEach((item) => {
            let data = item;
            // 仓库里的数量等于传过来的数量
            ck = this.quantityAll.filter((items) => data.id == items.id);
            if (ck.length != 0) {
              data.stock_quantity = ck[0].stock_quantity;
            }
          });
          // 获取数据
          this.goodInfo = getList;
        } else {
          if (this.num != 1) {
            Toast("没有数据！");
          }
        }
      });
    },
    // 加载更多
    getMore() {
      this.num++;
      this.isMore = true
      this.getShoppingList();
    },
    // 加入购物车
    async addCart(index, id) {
      this.$store.commit("GATADDCART", {
        id,
        num: 1,
        stock_quantity: this.goodInfo[index].stock_quantity,
        sell_price: this.goodInfo[index].sell_price,
        isChecked: true,
      });
      // 重新加载
      this.getShoppingList()
      this.$refs.xiaoQiu.balls.flag = true;
      //获取商品的位置。也就是小球运动开始的位置
      let rect = this.$refs.tittle[index].getBoundingClientRect();
      this.ball.x = rect.x;
      this.ball.y = rect.y;
    },
  },
};
</script>

<style scoped>
.comtent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 50px;
  margin: 10px 15px 50px;
}
.comtent .goods_comtent {
  width: 47%;
  margin-bottom: 10px;
  /* background-color: pink; */
  box-shadow: 2px 2px 2px rgb(196, 196, 196);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
}
.comtent .goods_comtent h3 {
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 24px;
}
.comtent .goods_comtent .goods_item .price1 {
  text-decoration: line-through rgb(255, 81, 81);
  color: #000;
  font-weight: bold;
}
.comtent .goods_comtent .goods_item .price2 {
  color: rgb(255, 81, 81);
}
.goods_data {
  display: flex;
  justify-content: space-between;
}
.goods_data .shopping {
  /* width: 40px; */
  line-height: 30px;
  color: rgb(255, 81, 81);
}
/* 小球 */
.goods {
  width: 20px;
  height: 20px;
  background-color: pink;
  border-radius: 50%;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 1s cubic-bezier(0.8, -0.3, 1, 0.6);
}
</style>