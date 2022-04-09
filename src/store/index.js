import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex)

const actions = {
  // 删除选中的商品
  deleteArrshop(context){
    // console.log(context);
    // 通过context拿到commit,state里的数据
    let shop = context.state.quantityAll
    for (let i = shop.length - 1; i >= 0; i--) {
      shop[i].isChecked == true ? context.commit('DELETESHOP', shop[i].id) : ''
    }
  }
}
const mutations = {
  // 商品id、添加到购物车的数量
  GATADDCART(state, obj) {
    // 如果是第一次添加商品
    let id = obj.id + ''
    if (state.ids.indexOf(id) == -1) {
      state.ids.push(id)
      state.quantityAll.push({ id, num: obj.num, stock_quantity: obj.stock_quantity - obj.num, sell_price: obj.sell_price, isChecked: obj.isChecked})
      let arr = state.quantityAll
      // 排序数组
      for (let i = 0; i < state.quantityAll.length - 1; i++) {
        for (let k = i + 1; k < state.quantityAll.length; k++){
          if (arr[k].id < arr[i].id) {
            let a = arr[k]
            arr[k] = arr[i]
            arr[i] = a
          }     
        }
      }
    } else {
      // 如果是同一商品则数量+= 总量-=
      state.quantityAll.filter(item => {
        // id相同
        if (item.id == obj.id) {
          return { num: item.num += obj.num, stock_quantity: item.stock_quantity -= obj.num }
        }
      })
    }
  },
  // 商品的+ -
  GetNUM(state, obj){
    state.quantityAll.forEach(item => {
      if (item.id == obj.id) {
       item.num += obj.num
       item.stock_quantity -= obj.num

      }
    });
  },
  // 复选框属性的变化
  GETISCHECKED(state, id){
    state.quantityAll.forEach(item=>{
      if (item.id == id) {
        console.log(item.id);
        item.isChecked = !item.isChecked
      }
    })
  },
  // 全选复选框
  UPDATECHECKED(state, isCheckeds){
    state.quantityAll.forEach(item=>{
      item.isChecked = !isCheckeds
    })
  },
  // 删除单个的商品信息
  DELETESHOP(state, id){
    let a = id + ''
    state.quantityAll = state.quantityAll.filter(item=>item.id != id)
    let i = state.ids.indexOf(a)
    state.ids.splice(i, 1)
  },
}
const state = {
  ids: [],
  quantityAll: [],
}

// vuex本地化存储
import createPersistedState from "vuex-persistedstate"
export default new Vuex.Store({
  // ...
  state,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      //...
      reducer(val) {
        return {
          // 只储存state中的count
          ids: val.ids,
          quantityAll: val.quantityAll
        }
      }
    })
  ]
})