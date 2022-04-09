<template>
  <div class="mui-numbox cart_control" data-numbox-min='1' >
    <!-- "-"按钮，点击可减小当前数值 reduce -->
    <button class="mui-btn mui-numbox-btn-minus" type="button" @click="reduce">
      -
    </button>
    <input
      disabled
      v-if="isShow"
      class="mui-numbox-input"
      type="number"
      @change="changeNum"
      v-model="isNum"
    />
    <input
      v-else
      class="mui-numbox-input"
      type="number"
      @change="changeNum"
      v-model="num"
    />
    <!-- "+"按钮，点击可增大当前数值 -->
    <button class="mui-btn mui-numbox-btn-plus" type="button" @click="add_num">
      +
    </button>
  </div>
</template>

<script>
// import mui from '@/lib/mui/js/mui.min.js'
// 节流函数
import _ from 'lodash'
import { Toast } from "mint-ui";
import {mapState} from 'vuex'
export default {
  name: "CartControl",
  data() {
    return {
      num: 1,
      goodInfo: {},
      isNum:1
    };
  },
  props: ["id", "isShow"],
  computed: {
    // 商品ID
    shopId() {
      let ids = JSON.parse(localStorage.getItem("vuex"));
      if (ids) {
        return ids.quantityAll.filter((item) => item.id == this.id)[0];
      }
      return null;
    },
    ...mapState(['quantityAll']),
    // 库存量
    maxQuantity() {
      // 获取本地存储的数据
      if (this.shopId) {
        // console.log(id);
        return this.goodInfo.stock_quantity - this.shopId.num;
      }
      return this.goodInfo.stock_quantity;
    },
  },
  created() {
    //  初始化数据
    this.goodsInfo();
  },
  mounted() {
    // 商品数量
    this.isNum = this.computedNum()
    this.$store.commit('GetNUM', 1)
  },
  methods: {
    computedNum(){
      return this.quantityAll.filter(item=>{
        if (this.id == item.id) {
          return item;
        }
      })[0].num
    },
    // 初始化数据
    async goodsInfo() {
      // console.log(this.id);
      let result = await this.$axios({
        url: `/api/goods/getinfo/${this.id}`,
        method: "get",
      });
      if (result.data.status == 0) {
        this.goodInfo = result.data.message[0];
      }
    },
    // 减减
    reduce: _.throttle(function(){
        if (this.isShow) {
          if (this.isNum > 1) {
            this.isNum--;
            this.$store.commit('GetNUM', {id: this.id, num: -1})
          }
        } else {
          if (this.num > 1) {
            this.num--;
            this.$store.commit('GetNUM', {id: this.id, num: -1})
          }
        }
      }, 500),
    // 加加
    add_num() {
      setTimeout(() => {
        if (this.isShow) {
          if (this.isNum < this.maxQuantity) {
            this.isNum++;
            this.$store.commit('GetNUM', {id: this.id, num: 1})
          }
        } else {
          if (this.num < this.maxQuantity) {
            this.num++;
            this.$store.commit('GetNUM', {id: this.id, num: 1})
          }
        }
      }, 500);
    },
    // 数量发生改变
    changeNum() {
      if (this.isShow) {
        if (this.isNum < 1) {
          this.isNum = 1;
        } else if (this.isNum > this.maxQuantity) {
          this.isNum = this.maxQuantity;
          Toast("正在补充该商品！");
        } else {
          Math.ceil(isNum);
        }
        this.$emit("quantity", this.isNum);
      } else {
        if (this.num < 1) {
          this.num = 1;
        } else if (this.num > this.maxQuantity) {
          this.num = this.maxQuantity;
          Toast("正在补充该商品！");
        } else {
          Math.ceil(num);
        }
        this.$emit("quantity", this.num);
      }
    },
  },
  watch:{
    maxQuantity(newVal, oldVal){
      // console.log(newVal, oldVal);
      // mui(Selector).numbox().setOption('max',newVal)
    }
  }
};
</script>

<style scoped>
.cart_control {
  /* width: 50vw; */
  margin: 0 50px 10px 20px;
}
</style>