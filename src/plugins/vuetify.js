import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi' // https://materialdesignicons.com/
  },
    theme: {
    themes: {
      light: {
        primary   : colors.green.darken2,
        secondary : colors.green,
        accent    : colors.pink.darken2,
        error     : colors.red.accent3,
      },
    },
  }
});
