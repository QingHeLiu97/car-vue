import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 自动查找模块
const modules = {}
const files = require.context("./modules",false,/\.js$/)
files.keys().forEach(path => {
    const key = path.replace(/(\.\/|\.js)/g,'');
    if(key != 'index'){
        modules[key] = files(path).default
    }
});
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules
})
