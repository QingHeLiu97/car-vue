import user from './modules/user.js'
import admin from './modules/admin.js'
export default [
    {
        id: 'home',
        path: '/home',
        icon: 'el-icon-s-home',
        role: 'user',
        name: '首页'
    },
    {
        id: 'home',
        path: '/home',
        icon: 'el-icon-s-home',
        role: 'superAdmin',
        name: '首页'
    },
    {
        id: 'home',
        path: '/home',
        icon: 'el-icon-s-home',
        role: 'admin',
        name: '首页'
    },
    ...admin,
    ...user
]
