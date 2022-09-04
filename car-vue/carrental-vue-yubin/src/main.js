import Vue from 'vue'
import App from './App.vue'
// vueRoute
import router from './router'
// veux
import store from './store'
// Axios
import axios from 'axios'
Vue.prototype.$axios = axios
// 混合
import mixinApp from '@src/mixins/app';
// 过滤器
import filters from '@src/filters/index.js'
// md5加密
import md5 from 'md5';

// 图表
import * as echarts from 'echarts'

// 复制插件
import Clipboard from 'v-clipboard'

// 引入公共处理方法
import { getMenuItem, getOpenMenu, setDocumentTitle } from '@src/libs/util.js'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// ElementUI dialog弹框移动 插件
import '@src/plugins/dialog/index.js'
import Setting from './setting'

Vue.config.productionTip = false
Vue.prototype.$md5 = md5;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

// 全局注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.use(ElementUI)

Vue.use(Clipboard)

new Vue({
  router,
  store,
  mixins: [mixinApp],
  render: h => h(App),
  watch: {
    '$route' (to, form) {
      let page = to.matched[to.matched.length - 1];
      const menuList = this.$store.state.menu.menuList;
      let menuItem = getMenuItem(page.path, menuList);
      if (menuItem == void (0)) {
        // 不存在时
        page = to;
        menuItem = getMenuItem(page.path, menuList);
      }
      if (menuItem != undefined) {
        this.$store.commit('menu/setMenuItemAction', menuItem.id, { root: true })
        this.$store.commit('menu/setMenuItemTitle', menuItem.name, { root: true })
        const openMenu = getOpenMenu(page.path, menuList)
        this.$store.commit('menu/setMenuSubOpen', openMenu, { root: true })
        setDocumentTitle(menuItem.name)
      } else {
        const meta = page.meta || {}
        this.$store.commit('menu/setMenuItemAction', '', { root: true })
        this.$store.commit('menu/setMenuItemTitle', meta.title || '', { root: true })
        setDocumentTitle(page.meta.title)
      }
      this.appRouteChange(to, form);
    }
  }
}).$mount('#app')
