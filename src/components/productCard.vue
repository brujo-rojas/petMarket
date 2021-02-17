<template>

  <v-card
    class="mx-4"
    @click="onClick(product)"
    >
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
    name: 'productCard',
    props:{
      product:{required:true}
    },
    data: () => ({
      counts:[1, 2, 3, 4, 5],
    }),
    methods:{
      onClick(product){
        this.$emit("showDetail", product);
      },
      addToCart(product, count){
        this.$store.commit('addProductInCart',{product, count})
      }
    }
  }
</script> 
