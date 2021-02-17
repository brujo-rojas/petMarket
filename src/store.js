import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl        :"http://sva.talana.com:8000/api/",
    productsInCart : [],
  },

  getters:{
    baseUrl        : state => state.baseUrl,
    productsInCart : state => state.productsInCart,
  },

  mutations: {
    addProductInCart(state, productAndCount){
      state.productsInCart.push( productAndCount );
    }
  },
  actions: {
  }
})
