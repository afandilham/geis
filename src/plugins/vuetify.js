import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import id from 'vuetify/es5/locale/id';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#162447',
        secondary: '#1f4068',
        accent: '#e43f5a',
        error: '#E40066',
        info: '#3777FF',
        success: '#20FC8F',
        warning: '#FFD447'
      },
    },
  },
  lang: {
    locales: { id },
    current: 'id',
  },
  icons: {
    iconfont: 'md',
  },
});
