import Vue from 'vue'

/**
 * Filtro para parsear numeros a formato de precio
 * @return {String} numero formateado como cadena de texto
 */
Vue.filter('currency', function (val) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
});
