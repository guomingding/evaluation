import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import qs from 'qs'
import store from './store'

Vue.use(Element)

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

Vue.component('remote-script', {
  render: function (createElement) {
      var self = this;
      return createElement('script', {
          attrs: {
              type: 'text/javascript',
              src: this.src
          },
          on: {
              load: function (event) {
                  self.$emit('load', event);
              },
              error: function (event) {
                  self.$emit('error', event);
              },
              readystatechange: function (event) {
                  if (this.readyState == 'complete') {
                      self.$emit('load', event);
                  }
              }
          }
      });
  },
  props: {
      src: {
          type: String,
          required: true
      }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
