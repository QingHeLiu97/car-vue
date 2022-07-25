import layout from '@src/layout'
import admin from './modules/admin'
import custom from './modules/custom'
import system from './modules/system'
import servicing from './modules/servicing'
import contribution from './modules/contribution'
const loginIn = [
    {
      path: '/',
      name: 'root',
      component: layout,
      redirect: '/home',
      children: [
        {
            path: '/index',
            name: 'index',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            meta: {
              title: '首页',
              auth: true
            },
            component: () => import('@view/home')
        }
      ]
    },
    admin,
    custom,
    system,
    servicing,
    contribution

]

const loginOut = [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('@view/common/login')
    }
]

// 错误页面
const errorPage = [
  {
    path: '/403',
    name: '403',
    meta: {
      title: '403'
    },
    component: () => import('@view/status/error/403')
  },

  {
    path: '/500',
    name: '500',
    meta: {
      title: '500'
    },
    component: () => import('@view/status/error/500')
  },
  {
    path: '*',
    component: () => import('@view/status/error/404')
  }
]

export default [
    ...loginIn,
    ...loginOut,
    ...errorPage
]
