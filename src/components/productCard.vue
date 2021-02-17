<template>
  <v-card
    class="mx-4"
    @click="onClick(product)">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="product.photo"
      >
    </v-img>

    <v-card-title class="pb-0 truncate d-block">
      {{product.name}}
    </v-card-title>

    <v-card-text class="text--primary">
      <div>
        ${{product.price | currency}}
      </div>
    </v-card-text>

  </v-card>

</template>

<script>
  export default {
    name  : 'productCard',
    props : {
      product:{required:true}
    },
    data: () => ({
      amounts :[1, 2, 3, 4, 5],
    }),
    methods:{
      /**
       * Emite evento al escoger un producto mediante Click
       * @param {Object} - Producto a mostrar en dialog
       */
      onClick(product){
        this.$emit("showDetail", product);
      },

      /**
       * Agrega producto y cantidad al carrito, en Store
       * @param {Object} product - Producto a guardar en cart
       * @param {Object} amount - cantidad del producto indicado  a guardar en cart
       */
      addToCart(product, amount){
        this.$store.commit('addProductInCart',{product, amount})
      }
    }
  }
</script> 
