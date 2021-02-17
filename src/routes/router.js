import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/product-list/:idCategory',
      name: 'productList',
      component: () => import('@/views/product/productList.vue'),
    },
    { path: '/', redirect: '/product-list' }
  ]
})

export default router;
