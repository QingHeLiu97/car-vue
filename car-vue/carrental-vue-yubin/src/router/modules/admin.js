import layout from '@src/layout'
var per = 'admin-'
export default {
    path: '/admin',
    name: 'admin',
    redirect: {
        name: `${per}list`
    },
    meta: {
        title: '数据管理'
    },
    component: layout,
    children: [
        {
            path: 'list',
            name: `${per}list`,
            meta: {
                title: '用户管理',
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
            component: () => import('@view/car/list')
        },
        {
            path: 'appraise',
            name: `${per}appraise`,
            meta: {
                title: '评价信息',
                auth: true
            },
            component: () => import('@view/appraise/list')
        },
        {
            path: 'notice',
            name: `${per}notice`,
            meta: {
                title: '公告管理',
                auth: true
            },
            component: () => import('@view/notice/list')
        },
        {
            path: 'order',
            name: `${per}order`,
            meta: {
                title: '订单管理',
                auth: true
            },
            component: () => import('@view/order/list')
        }
    ]

}
