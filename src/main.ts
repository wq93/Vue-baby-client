import Vue from 'vue'
import iView from 'iview'
import App from './App.vue'
import router from './router'
import store from './store'
import {$post, $uploadFile, $put, $delete, $get} from './common/fetch/fetch'
import {errorAlert} from './common/application/config'
import 'iview/dist/styles/iview.css'

Vue.prototype.$post = $post;
Vue.prototype.$uploadFile = $uploadFile;
Vue.prototype.$put = $put;
Vue.prototype.$delete = $delete;
Vue.prototype.$get = $get;
Vue.prototype.$errorAlert = errorAlert;

Vue.config.productionTip = false
Vue.use(iView);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
