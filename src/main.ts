import Vue from 'vue'
import iView from 'iview'
import App from './App.vue'
import router from './router'
import store from './store'
import 'iview/dist/styles/iview.css'
import {$post, $uploadFile, $put, $delete, $get} from './common/js/fetch'

Vue.prototype.$post = $post;
Vue.prototype.$uploadFile = $uploadFile;
Vue.prototype.$put = $put;
Vue.prototype.$delete = $delete;
Vue.prototype.$get = $get;

Vue.config.productionTip = false
Vue.use(iView);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
