import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: 'goods',
      component: () => import('./views'),
      children: [
        {
          path: '/goods',
          name: 'goods',
          component: () => import('./views/goods')
        },
        {
          path: '/goodsMother',
          name: 'goodsMother',
          component: () => import('./views/goods_mother')
        },
        {
          path: '/uploadImg',
          name: 'uploadImg',
          component: () => import('./views/upload_img/upload_img')
        },
        {
          path: '/checnkImg/:uuid',
          name: 'uploadImg',
          props: true,
          component: () => import('./views/upload_img/check_image/check_image')
        }
      ]
    },

  ]
})
