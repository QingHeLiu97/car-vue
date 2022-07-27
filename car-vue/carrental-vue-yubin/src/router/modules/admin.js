import layout from '@src/layout'
var per = 'admin-'
export default {
    path: '/admin',
    name: 'admin',
    redirect: {
        name: `${per}list`
    },
    meta: {
        title: '系统设置'
    },
    component: layout,
    children: [
        {
            path: 'list',
            name: `${per}list`,
            meta: {
                title: '管理员',
                auth: true
            },
            component: () => import('@view/admin/list')
        },
        {
            path: 'car',
            name: `${per}car`,
            meta: {
                title: '汽车管理',
                auth: true
            },
            component: () => import('@view/admin/car')
        },
        {
            path: 'evaluation',
            name: `${per}evaluation`,
            meta: {
                title: '评价信息',
                auth: true
            },
            component: () => import('@view/admin/evaluation')
        },
        {
            path: 'user',
            name: `${per}user`,
            meta: {
                title: '用户管理',
                auth: true
            },
            component: () => import('@view/admin/user')
        },
        {
            path: 'notice',
            name: `${per}notice`,
            meta: {
                title: '公告管理',
                auth: true
            },
            component: () => import('@view/admin/notice')
        },
        {
            path: 'order',
            name: `${per}order`,
            meta: {
                title: '订单管理',
                auth: true
            },
            component: () => import('@view/admin/order')
        }
    ]

}
