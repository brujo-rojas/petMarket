import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl        :"http://sva.talana.com:8000/api/",
    productsInCart : [],
    categories: [],
  },

  getters:{
    baseUrl        : state => state.baseUrl,
    productsInCart : state => state.productsInCart,
    categories     : state => state.categories,
    categoryById   : (state) => (id) => {
      return state.categories.find(category => category.id === id)
    },
  },

  mutations: {
    addProductInCart(state, productAndCount){
      state.productsInCart.push( productAndCount );
    },
    setCategories(state, categories){
      state.categories = categories;
    }
  },
  actions: {
  }
})
