import Vue from 'vue'
Vue.filter('currency', function (val) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
});
