import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views'),
      children: [
        {
          path: '/goods',
          name: 'goods',
          component: () => import('./views/goods')
        },
        {
          path: '/uploadImg',
          name: 'uploadImg',
          component: () => import('./views/upload_img/upload_img')
        },
        {
          path: '/checkImg/:uuid',
          props: true,
          component: () => import('./views/upload_img/check_image/check_image')
        }
      ]
    },

  ]
})
