<template>
  <div>
    <product-detail-dialog
      ref="productDetailDialog"
      >
    </product-detail-dialog>
    <v-container>


      <v-layout v-if="loadingProducts" justify-center>
        <v-progress-circular
          indeterminate
          color="accent"
          ></v-progress-circular>
      </v-layout>


      <template v-else>
        <v-layout row class="my-4" >
          <v-flex
            v-for="(product, indexProduct) in productsPaginated"
            :key="indexProduct"
            xs6 md3>

            <product-card
              @showDetail="showProductDetail($event)"
              :product="product">
            </product-card>

          </v-flex>

        </v-layout>
        <v-layout row class="justify-center">
          <div class="text-center">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              ></v-pagination>
          </div>

        </v-layout>
      </template>
    </v-container>
  </div>
</template>

<script>

import axios from 'axios';
//import _ from "lodash";
import productCard from '@/components/productCard'
import productDetailDialog from '@/components/productDetailDialog'


export default {
  components : {
    'product-card'          : productCard,
    'product-detail-dialog' : productDetailDialog,
  },
  data(){
    return {
      products        : [],
      page            : 1,
      productsPerPage : 3,
      currentPage     : 1,
      loadingProducts : false,
      baseUrl: this.$store.getters.baseUrl,
    }
  },
  computed:{
    totalPages() {
      return Math.ceil(this.products.length / this.productsPerPage)
    },
    productsPaginated() {
      if (!this.products || this.products.length != this.products.length) {
        return [];
      }
      let index = this.currentPage * this.productsPerPage - this.productsPerPage
      return this.products.slice(index, index + this.productsPerPage)
    }
  },

  watch:{
    '$route' () {
      this.getProducts()
    }
  },

  created(){
    this.getProducts();
  },


  methods:{

    getProducts(){
      //¿ Id categoria ?
      this.loadingProducts = true;
      return axios.get(this.baseUrl + "product/").then(res => {
        this.products = res.data;
        this.loadingProducts = false;
      })
    },

    showProductDetail(product){
      this.$refs.productDetailDialog.show(product);
    },

  }
}
</script>

<style lang="css" scoped>
.option-bar{
  position: sticky;
  top: 48px;
  z-index: 2;
}
</style>
