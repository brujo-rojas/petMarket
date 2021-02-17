<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="60%"
      scrollable
      class="detail-dialog"
      >
      <v-card v-if="product">

        <v-toolbar color="primary" dark>
          <v-toolbar-title>
            {{ product.name  }}
          </v-toolbar-title>
          <v-spacer>
          </v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        
        <v-card-text>

          <v-container>

            <v-layout>

              <v-flex xs6="">
                <v-img :src="product.photo" width="400">
                </v-img>
              </v-flex>

              <v-flex xs6="">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Nombre: {{product.name}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Codigo: {{product.code}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Precio: ${{product.price | currency}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <div class="ma-4">
                    <v-select
                      hide-details
                      :items="amounts"
                      label="Cantidad"
                      v-model="amountSelected"
                      ></v-select>
                  </div>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Subtotal: ${{product.price * amountSelected| currency}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <p>
                  {{product.description}}
                </p>

              </v-flex>

            </v-layout>



          </v-container>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="addToCart(product, amountSelected)"
            >
            Agregar a Carrito
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'productDetailDialog',
  data: () => ({
    dialog         : false,
    product        : null,
    amounts        : [ 1, 2, 3, 4, 5 ],
    amountSelected : 1
  }),
  methods:{
    /**
     * Despliega Dialog
     * Funcion usada fuera de component, mediante $refs
     * @param {Object} product - Producto para mostrar detalles
     */
    show(product){
      this.product = product;
      this.dialog  = true;
    },

    /**
     * Agrega producto y cantidad al carrito, en Store
     * y cierra dialog
     * @param {Object} product - Producto a guardar en cart
     * @param {Object} amount - cantidad del producto indicado  a guardar en cart
     */
    addToCart(product, amount){
      this.$store.commit('addProductInCart',{product, amount})
      this.dialog = false;
    }
  }
}
</script> 
