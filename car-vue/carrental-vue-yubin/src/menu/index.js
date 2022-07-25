import custom from './modules/custom'
import admin from './modules/admin'
import superAdmin from './modules/superAdmin.js'
export default [
    {
        id: 'home',
        path: '/home',
        icon: 'el-icon-s-home',
        role: 'custom',
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
	...superAdmin,
    ...custom,
    ...admin
]
