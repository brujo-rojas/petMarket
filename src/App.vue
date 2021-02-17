<template>
  <v-app>
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

      <v-text-field
        label="Buscar"
        solo-inverted
        dark
        hide-details
        dense
        ></v-text-field>

      <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        
        <v-badge
          color="error"
          left
          :content="productsInCart.length"
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
      <v-list>
        <v-list-item
          two-line
          v-for="(productInCart , index) in productsInCart"
          :key="index"
          >
          <v-item-content>
            <v-list-item-title> ({{ productInCart.count }})  {{ productInCart.product.name }} </v-list-item-title>
            <v-list-item-subtitle>total: {{  productInCart.product.price * productInCart.count }}</v-list-item-subtitle>
          </v-item-content>
        </v-list-item>
      </v-list>
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


export default {
  name: 'App',

  components: {
  },

  data(){
    return {
      loading          : false,
      drawer           : true,
      categorySelected : null,
      categories       : [],
      baseUrl          : this.$store.getters.baseUrl,
    }
  },

  computed:{
    productsInCart(){
      return this.$store.getters.productsInCart;
    }
  },

  created(){
    this.getCategories();
  },
  methods:{
    getCategories(){
      this.loading = true;
      return axios.get(this.baseUrl + "product-category/")
        .then(res => {
          this.categories = _.orderBy(res.data, "order");
          this.selectCategory(_.first(this.categories));
          this.loading = false;
        })
    },
    selectCategory(category){
      this.categorySelected = category;
      this.$router.push({ name: 'productList', params: { idCategory: category.id  } })
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
