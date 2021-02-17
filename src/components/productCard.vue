<template>
  <v-card
    class="mx-4">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="product.photo"
      >
    </v-img>

    <v-card-title class="pb-0 truncate d-block text-decoration-underline cursor-pointer"
      @click="onClick(product)">
      {{product.name}}
    </v-card-title>

    <v-card-text class="text--primary">
      <div>
        ${{product.price | currency}}
      </div>
    </v-card-text>

    <v-card-actions>

      <v-btn icon @click.prevent="changeAmount(-1)">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      {{amount}}
      <v-btn icon @click="changeAmount(1)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn icon @click="addToCart(product, amount)">
        <v-icon>mdi-cart</v-icon>
      </v-btn>

    </v-card-actions>

  </v-card>

</template>

<script>
  export default {
    name  : 'productCard',
    props : {
      product:{required:true}
    },
    data() {
      return {
        amountLimit : this.$store.getters.amountLimit,
        amount      : 1
      }
    },
    methods:{
      /**
       * Emite evento al escoger un producto mediante Click
       * @param {Object} - Producto a mostrar en dialog
       */
      onClick(product){
        this.$emit("showDetail", product);
      },

      /**
       * Cambia cantidad de productos para agregar a carrito
       * @param {Number} num - cantidad a modificar, puede ser negativo
      */
      changeAmount(num){
        if(this.amount + num <= this.amountLimit && this.amount + num > 0){
          this.amount += num;
        }
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
<style>
.cursor-pointer{
  cursor: pointer;
}
</style>
