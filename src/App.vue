<template>
  <v-app>

    <product-detail-dialog ref="productDetailDialog">
    </product-detail-dialog>

    <v-app-bar
      clipped-left
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="mr-4">
        Pet Market
      </v-toolbar-title>

      <v-progress-circular
        indeterminate
        v-show="loading"
        color="white"
        ></v-progress-circular>



      <v-spacer></v-spacer>

      <v-autocomplete
        :items="products"
        color="white"
        :search-input.sync="searchInputValue"
        light
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="name"
        label="Buscar"
        solo
        >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Producto no encontrado
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item @click="showProduct(item)">
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.code"></v-list-item-subtitle>
          </v-list-item-content>
          </v-list-item>
        </template>
      </v-autocomplete>

      <v-spacer></v-spacer>

    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        
        <v-badge
          color="error"
          left
          :content="productsInCart.length"
          :value="productsInCart.length"
          overlap
          >
          <v-btn icon
                 v-bind="attrs"
                 v-on="on"
                 >
                 <v-icon>
                   mdi-cart
                 </v-icon>
          </v-btn>

        </v-badge>

      </template>

      <v-card class="elevation-3 pa-3" width="500">

        <v-card-title>
          <span class="text-h6">Resumen de la compra</span>
        </v-card-title>

        <v-card-text>

          <v-list v-if="productsInCart.length > 0">
            <v-list-item
              two-line
              v-for="(productInCart , index) in productsInCart"
              :key="index"
              >
              <v-list-item-content>
                <v-list-item-title> ({{ productInCart.amount }})  {{ productInCart.product.name }} </v-list-item-title>
                <v-list-item-subtitle>total: ${{  productInCart.product.price * productInCart.amount | currency }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <div>
                  <v-btn icon @click="changeAmountCart(productInCart, 1)">
                    <v-icon>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                  <v-btn icon @click="changeAmountCart(productInCart, -1)">
                    <v-icon>
                      mdi-minus
                    </v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteProductInCart(productInCart)">
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>





          <div v-else="">

            <span class="grey--text italic">no hay productos en el carrito</span>
          </div>

        </v-card-text>

      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
          >
            Realizar Compra
          </v-btn>
        </v-card-actions>

      </v-card>


    </v-menu>


    </v-app-bar>




    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      absolute
      bottom
      >
      <v-list
        nav
        dense
        >
        <v-list-item
          v-for="( category , indexCategory) in categories"
          :key="indexCategory"
          @click="selectCategory(category)">
          <v-list-item-title>
            {{ category.name  }}
          </v-list-item-title>
          <v-list-item-icon>
            <v-icon v-if="category === categorySelected">
              mdi-chevron-right
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>





    <v-main>
          <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import axios from 'axios';
import _ from "lodash";
import productDetailDialog from '@/components/productDetailDialog'


export default {
  name: 'App',

  components: {
    'product-detail-dialog' : productDetailDialog,
  },

  data(){
    return {
      loading          : false,
      drawer           : true,
      categorySelected : null,
      categories       : [],
      searchInputValue : "",
      searchResult     : [],
      baseUrl          : this.$store.getters.baseUrl,
    }
  },

  computed:{
    productsInCart(){
      return this.$store.getters.productsInCart;
    },
    products(){
      return this.$store.getters.products;
    },
  },

  created(){
    this.getCategories();
    this.getAllProducts();
  },

  methods:{
    /**
     * Obtiene categorias, para usar en sidebar y 
     * controlar la id de categoria en rutas
     * @return {Promise} promesa de peticion Get product-category/
    */
    getCategories(){
      this.loading = true;
      return axios.get(this.baseUrl + "product-category/")
        .then(res => {
          this.categories = _.orderBy(res.data, "order");
          this.$store.commit('setCategories',this.categories);
          this.selectCategory(_.first(this.categories));
          this.loading = false;
        })
    },

    /**
    * Obtiene productos para barra de busqueda 
    * 
    * deberia tener todos los productos, 
    * usado para busqueda, pero deberia funcionar de manera asincrona 
    * @return {Promise} promesa de peticion Get product/
    */
    getAllProducts(){
      return axios.get(this.baseUrl + "product/").then(res => {
        this.$store.commit('setProducts',res.data);
      })
    },


    /**
    * Selecciona categoria para redirigir ruta
    * para mostrar en la pagina principal
    * @param {Object} category - categoria para mostrar productos
    */
    selectCategory(category){
      this.categorySelected = category;
      this.$router.push({ name: 'productList', params: { idCategory: category.id  } })
    },

    /**
    * Muestra producto en dialog
     * @param {Object} product - producto para mostrar
    */
    showProduct(product){
      this.$refs.productDetailDialog.show(product);
    },

    /**
    * Cambia cantidad de producto en carrito
     * @param {Object} productInCart - producto en el carrito
     * @param {Number} num - cambio en cantidad en carrito, puede ser negativo
    */
    changeAmountCart(productInCart, num){
      this.$store.commit('changeAmountCart',{productId : productInCart.product.id, num});
    },

    /**
    * Quita producto de carrito
     * @param {Object} productInCart - producto en el carrito
    */
    deleteProductInCart(productInCart){
      this.$store.commit('deleteProductInCart',productInCart.product.id);
    }

  }

};
</script>
<style>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
