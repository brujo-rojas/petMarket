import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl        : "http://sva.talana.com:8000/api/",
    productsInCart : [],
    categories     : [],
    products       : [],
  },

  getters:{
    baseUrl        : state => state.baseUrl,
    productsInCart : state => state.productsInCart,
    products       : state => state.products,
    categories     : state => state.categories,
    categoryById   : state => (id) => {
      return state.categories.find(category => category.id === id)
    },
  },

  mutations: {
    /**
    * Agrega productos al carrito
    * @param {Object} productAndAmount - objeto con producto y cantidad
    * @param {Object} productAndAmount.product - producto para agregar al carrito
    * @param {Object} productAndAmounti.amount - cantidad del producto agregado al carrito 
    */
    addProductInCart(state, productAndAmount){
      state.productsInCart.push( productAndAmount );
    },

    /**
    * Guarda lista de categorias
    * @param {Array} categories - lista de categorias
    */
    setCategories(state, categories){
      state.categories = categories;
    },

    /**
    * Guarda lista de productos
    * @param {Array} productos - lista de productos
    */
    setProducts(state, products){
      state.products = products;
    }
  },
  actions: {
  }
})
