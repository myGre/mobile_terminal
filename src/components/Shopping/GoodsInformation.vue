<template>
  <div class="content">
    <div class="mui-card">
      <!-- 轮播 -->
      <div class="mui-card-header">
        <Carousel :swiper="swiper"></Carousel>
      </div>
      <!--内容区-->
      <div class="mui-card-content goods_content">
        <h3>{{ goodInfo.title }}</h3>
        <hr />
        <div class="item_content">
          <div class="price_content">
            <p>
              市场价：<i class="price1">{{ goodInfo.market_price }}.00</i>
            </p>
            <p>
              促销价：<span class="price2">{{ goodInfo.sell_price }}.00</span>
            </p>
          </div>
          <p ref="add">购买数量：</p>
          <!-- 加减号组件 -->
          <CartControl ref="quantity" :isShow="isShow" :id="id"></CartControl>

          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="addCart($event)"
            >加入购物车</mt-button
          >
        </div>
        <h4>商品参数</h4>
        <p>商品货号：{{ goodInfo.goods_no }}</p>
        <p>商品库存：{{ maxQuantity }}</p>
        <p>上架时间：{{ goodInfo.add_time }}</p>
        <router-link class="msg" :to="`/home/shoppingmsg/${id}`"
          >详情>>></router-link
        >
      </div>
      <div class="mui-card-footer">
        <!-- 评论 -->
        <Comment :id="id"></Comment>
      </div>
    </div>
    <!-- 小球 -->
    <Ball ref="xiaoQiu" :ball='ball'></Ball>
  </div>
</template>

<script>
import CartControl from "@/components/Shopping/CartControl";
import { mapState } from "vuex";
export default {
  name: "GoodsInformation",
  components: {
    CartControl,
  },
  data() {
    return {
      isShow: false,
      id: this.$route.params.id,
      goodInfo: {},
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
      // 小球的起点
      ball: {
        x: "",
        y: "",
      },
    };
  },
  computed: {
    ...mapState({
      infoMsg: (state) => {
        return state.quantityAll;
      },
    }),
    // 库存量
    maxQuantity() {
      let result = this.infoMsg.find((item) => item.id == this.id);
      if (result) {
        return result.stock_quantity;
      } else {
        return this.goodInfo.stock_quantity;
      }
    },
  },
  created() {
    // 初始化数据
    this.goodsInfo();
  },
  methods: {
    // 初始化数据
    async goodsInfo() {
      let result = await this.$axios({
        url: `/api/goods/getinfo/${this.id}`,
        method: "get",
      });
      if (result.data.status == 0) {
        this.goodInfo = result.data.message[0];
      }
    },
    // 加入购物车
    async addCart(el) {
      let quantity = this.$refs.quantity;
      this.$store.commit("GATADDCART", {
        id: this.id,
        num: quantity.num,
        stock_quantity: this.goodInfo.stock_quantity,
        sell_price: this.goodInfo.sell_price,
        isChecked: true,
      });
      this.$refs.xiaoQiu.balls.flag = true
      // getBoundingClientRect()获取小球相对于视窗的位置，屏幕左上角坐标为0，0
      //获取商品的位置。也就是小球运动开始的位置
      let rect = this.$refs.add.getBoundingClientRect();
      this.ball.x = rect.x;
      this.ball.y = rect.y;
    },
  },
};
</script>

<style scoped>
.content {
  margin-bottom: 50px;
  position: relative;
}
.content .goods_content {
  margin: 0px 20px 20px;
}
.content .goods_content h3 {
  font-size: 24px;
  font-weight: 600px;
  text-align: center;
  line-height: 30px;
  padding: 10px 20px;
  color: rgb(73, 157, 230);
}
.content .goods_content h4 {
  width: 100vw;
  padding: 20px 0;
  border-bottom: 2px dashed #ccc;
}
.content .goods_content .item_content {
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
}
.item_content .price_content {
  display: flex;
  justify-content: space-between;
}
.item_content .price_content p {
  width: 40vw;
}
.item_content .price_content .price1 {
  text-decoration: line-through rgb(255, 73, 73);
  color: #000;
  font-weight: 800;
}
.item_content .price_content .price2 {
  color: rgb(255, 73, 73);
}
.msg {
  margin-left: 82%;
  color: rgb(255, 73, 73);
}
</style>