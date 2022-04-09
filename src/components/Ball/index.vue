<template>
  <transition
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
  </transition>
</template>

<script>
export default {
  name: "Ball",
  data() {
    return {
      // 控制显示
      balls: {
        show: false,
        flag: false,
      },
      // 购物车的位置
      cartObj: {
        x: "",
        y: "",
      },
    };
  },
  props:['ball'],
  mounted() {
    // 初始化购物车的位置
    this.getShopping()
  },
  methods: {
    // 获取购物车节点
    getShopping() {
      // 小球运动结束的位置
      this.$bus.$on("shoppingCart", (shoppingCart) => {
        let rect = shoppingCart.getBoundingClientRect();
        this.cartObj.x = rect.x;
        this.cartObj.y = rect.y;
      });
    },
    // 获取购物车节点
    getShopping() {
      // 小球运动结束的位置
      this.$bus.$on("shoppingCart", (shoppingCart) => {
        let rect = shoppingCart.getBoundingClientRect();
        this.cartObj.x = rect.x;
        this.cartObj.y = rect.y;
        // console.log(rect);
      });
    },
    // 动画开始之前
    before_enter(el) {
      if (this.balls.show) return false;
      this.balls.show = true;
      // 初始化运动状态
      let x = this.ball.x;
      let y = this.ball.y;
      // console.log(x, y);
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.transform = "translate(0, 0)";
    },
    // 动画开始
    enter(el, done) {
      // 强制运动
      el.offsetWidth;
      //运动中
      let left = this.cartObj.x || 129 - this.ball.x;
      let top = this.cartObj.y || 622 - this.ball.y;
      // console.log(left, top);
      el.style.transform = `translate(${left}px, ${top}px)`;
      // 执行完后调用
      done();
    },
    // 动画结束
    after_enter(el) {
      this.balls.flag = !this.balls.flag;
    },
    // 过渡完成
    finishHandle() {
      // console.log("完成了");
      this.balls.show = false;
    },
  },
};
</script>

<style>
/* 小球 */
.content .goods {
  width: 20px;
  height: 20px;
  background-color: pink;
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 1s cubic-bezier(0.8, -0.3, 1, 0.6);
}
</style>