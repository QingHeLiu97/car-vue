import Vue from 'vue'
import store from '@src/store'
import VueRouter from 'vue-router'
import routes from './routes'
import Setting from '@src/setting.js'
import { getMenuItem } from '@src/libs/util.js'
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: Setting.routerMode,
  base: Setting.routerBase
});
// 路由跳转之前
router.beforeEach((to, form, next) => {
  // 判断是否需要登录
  if (to.meta && to.meta.auth) {
    const token = store.state.account.token;
    const menuList = store.state.menu.menuList;
    const path = to.path;
    // 判断是否存在token
    if (token != null) {
      if (menuList.length > 0) {
        if (getMenuItem(path, menuList)) {
          next()
        } else if (to.meta.header) {
          next()
        } else {
          next({
            name: '403'
          })
        }
      } else {
        next({
          name: 'login',
          query: {
              redirect: to.fullPath
          }
        });
      }
    } else {
      // 不存在则跳转到登录
      next({
        name: 'login',
        query: {
            redirect: to.fullPath
        }
      });
    }
  } else {
    next()
  }
});
export default router
