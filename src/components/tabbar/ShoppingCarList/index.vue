<template>
  <div class="content">
    <!-- 商品栏 -->
    <div class="content_list">
      <div
        class="mui-input-row mui-checkbox mui_list"
        v-for="(cart, index) in cartList"
        :key="cart.id"
      >
        <label>
          <img :src="cart.thumb_path" alt="" />
          <div class="nature">
            <h3>{{ cart.title }}</h3>
            <!-- <spen>加减号</spen> -->
            <CartControl
              :id="cart.id"
              :isShow="isShow"
            ></CartControl>
            <button @click="deleteShop(cart.id, index)">删除</button>
            <span class="price">￥{{ num[index] * cart.sell_price }}.00</span>
          </div>
        </label>
        <input
          name="checkbox1"
          class="checkbox_style"
          value="Item 1"
          type="checkbox"
          :checked="isChecked[index]"
          @change="Checked(index, cart.id)"
        />
      </div>
    </div>
    <!-- 功能 -->
    <div v-if="ids.length" class="mui-input-row mui-checkbox mui_list mui_site">
      <label class="item">
        <div class="nature list_funtion">
          <div class="totai">
            <h3>总计</h3>
            <p>
              <a
                >数量：<span>{{ addSum }}</span></a
              >
              <a
                >总价：<span class="price">￥{{ priceSum }}.00</span></a
              >
            </p>
            <p class="function">
              <span class="checkbox_span">
                <input
                  name="checkbox1"
                  class="checkbox_style"
                  value="Item 1"
                  type="checkbox"
                  :checked="isCheckeds"
                  @change="updateChecked"
                />
              </span>
              <button @click="deleteArrshop" >删除选中的商品</button>
            </p>
          </div>
        </div>
        <button type="button" class="mui-btn mui-btn-success">结算</button>
      </label>
    </div>
  </div>
</template>

<script>
import CartControl from "../../Shopping/CartControl.vue";
import { mapState } from "vuex";
export default {
  components: { CartControl },
  name: "ShoppingCarList",
  data() {
    return {
      isShow: true,
      cartList: [],
    };
  },
  computed: {
    ...mapState(["quantityAll", "ids"]),
    // 每个商品的数量
    num(){
       let numArr = []
       this.quantityAll.forEach(item =>numArr.push(item.num))
       return numArr
    },
    // 总数
    addSum() {
      let sum = 0;
      this.quantityAll.forEach((item) => {
        if (item.isChecked) {
          sum += item.num;
        }
      });
      return sum;
    },
    // 总价
    priceSum() {
      let sum = 0;
      this.quantityAll.forEach((item) => {
        if (item.isChecked) {
          sum += item.num * item.sell_price;
        }
      });
      return sum;
    },
    // 每个商品的复选框
    isChecked() {
      let checked = [];
      this.quantityAll.forEach((item) => {
        checked.push(item.isChecked);
      });
      return checked;
    },
    // 全选
    isCheckeds() {
      return this.quantityAll.every((item) => item.isChecked == true);
    },
  },
  created() {
    // 初始化列表数据
    this.getCartList();
  },
  methods: {
    // 获取购物车列表信息
    async getCartList() {
      // 获取ids字符串
      let ids = JSON.parse(localStorage.getItem("vuex")).ids.join(",");
      let result = await this.$axios({
        url: `/api/goods/getshopcarlist/${ids}`,
        method: "get",
      });
      if (result.data.status == 0) {
        this.cartList = result.data.message;
      }
    },
    // 选中状态
    Checked(index, id) {
      this.$store.commit("GETISCHECKED", id);
    },
    // 全选状态的更新
    updateChecked() {
      this.$store.commit("UPDATECHECKED", this.isCheckeds);
    },
    // 删除单件商品
    deleteShop(id, index) {
      this.cartList.splice(index, 1)
      this.$store.commit("DELETESHOP", id);
    },
    // 删除全部选中的
    deleteArrshop(){
      for (let i = this.isChecked.length - 1; i >= 0; i--) {
        if (this.isChecked[i]) {
          this.cartList.splice(i, 1)
          let id =  this.quantityAll[i].id
          this.$store.commit("DELETESHOP", id);
        }
        
      }
      // this.$store.dispatch("deleteArrshop");
    }
  },
};
</script>

<style scoped>
.content .content_list {
  margin-bottom: 50px;
  height: 62vh;
  overflow: auto;
}
.mui_list {
  margin: 10px;
  box-shadow: 3px 3px 3px rgb(134, 134, 134);
  background-color: #fff;
}
.mui_list label {
  display: flex;
  /* justify-content: space-between; */
}
.mui_list label .nature {
  margin-left: 20px;
}
.mui_list label h3 {
  width: 50vw;
  height: 30px;
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mui_list img {
  width: 60px;
  height: 60px;
}
.list_msg span {
  display: inline-block;
  margin-left: 5px;
}
.mui_list .checkbox_style {
  height: 70px;
  line-height: 70px;
}
.list_funtion {
  display: flex;
  justify-content: space-around;
}
.content .mui-checkbox .totai {
  display: flex;
  flex-direction: column;
}
.price {
  color: rgb(243, 102, 102);
}
.content .mui-checkbox .totai a {
  color: #000;
  font-weight: 400;
}
.content .mui-checkbox .item {
  padding-right: 0;
}
.content .mui-checkbox .item .function button {
  margin: 2px 7px;
}
.mui-input-row .mui-btn {
  width: 18%;
  height: 45px;
  border-radius: 15%;
  margin-top: 70px;
  margin-left: 70px;
}
.mui_site {
  position: fixed;
  top: 70%;
}
</style>