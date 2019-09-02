import Vue from 'vue';
import VueRouter from 'vue-router';
import * as type from '../store/mutation-types'
import { routers } from './route';
import { Loading } from 'element-ui';
import { setTitle } from 'src/assets/js/util';
import str from 'good-storage'

Vue.use(VueRouter);

const routerConfig = {
  mode: 'history',
  linkActiveClass: 'active',
  routes: routers
};

const router = new VueRouter(routerConfig);

let loading;
// router.beforeEach((to, form, next) => {
//   loading = Loading.service({
//     // fullscreen: true,
//     target: '.content-wrapper',
//     text: '跳转中...'
//   });
  
//   // 设置window.document.title 的名称
//   setTitle(to.meta.title);
  
//   if (!to.matched.length) {
//     next({
//       path: '/error/404',
//       replace: true
//     });
//   } else {
//     next();
//   }
// });

router.beforeEach((toRoute, fromRoute, next) => {
  // //to and from are Route Object,next() must be called to resolve the hook}
  loading = Loading.service({
    // fullscreen: true,
    target: '.content-wrapper',
    text: '跳转中...'
  });
  setTitle(toRoute.meta.title);
  if (toRoute.meta.requireAuth) {
    if (store.getters.token) {
      next()
    } else {
      str.clear()
      store.commit(type.SET_TOKEN_0, '')
      store.commit(type.SET_USER_INFO, '')
      next('/login')
    }
  }
  next()
})

router.afterEach((to, from) => {
  // 解决某些情况下loading无法关闭的情况
  setTimeout(() => {
    loading.close();
  }, 0)
});

export default router;
