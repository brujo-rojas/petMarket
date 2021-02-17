import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl        : "http://sva.talana.com:8000/api/",
    productsInCart : [],
    categories     : [],
    products       : [],
    amountLimit    : 15,
  },

  getters:{
    amountLimit    : state => state.amountLimit,
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
    * Guarda lista de categorias
    * @param {Array} categories - lista de categorias
    */
    setCategories(state, categories){
      state.categories = categories;
    },


    /**
    * Agrega productos al carrito
    * @param {Object} productToCart - objeto con producto y cantidad
    * @param {Object} productToCart.product - producto para agregar al carrito
    * @param {Object} productToCart.amount - cantidad del producto agregado al carrito 
    */
    addProductInCart(state, productToCart){
      let productInCart = state.productsInCart.find(productInCart => {
        return productInCart.product.id == productToCart.product.id;
      });
      if(productInCart){
        if(productInCart.amount + productToCart.amount <= state.amountLimit &&
          productInCart.amount + productToCart.amount > 0){

          productInCart.amount += productToCart.amount;

        }
      }else{
        state.productsInCart.push( productToCart);
      }
    },

    /**
    * Cambia cantidad de producto en el carrito, usand productId
    * @param {Number} productId - Id de producto
    * @param {Number} num - cambio en cantidad en carrito, puede ser negativo
    */
    changeAmountCart(state, {productId, num}){
      let productInCart = state.productsInCart.find( productInCart => {
        return productInCart.product.id == productId;
      });
      if(productInCart){
        if(productInCart.amount + num <= state.amountLimit &&
          productInCart.amount + num > 0){

          productInCart.amount += num;

        }
      }
    },

    /**
    * Elimina producto  del carrito, usand productId
    * @param {Number} productId - Id de producto
    */
    deleteProductInCart(state,productId){
      let index = state.productsInCart.findIndex( productInCart => {
        return productInCart.product.id == productId;
      });
      state.productsInCart.splice(index, 1);
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
