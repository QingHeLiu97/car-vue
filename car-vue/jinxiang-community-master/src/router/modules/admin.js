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
            path: 'type',
            name: `${per}type`,
            meta: {
                title: '缴费项目',
                auth: true
            },
            component: () => import('@view/admin/type')
        },
        {
            path: 'complaint',
            name: `${per}complaint`,
            meta: {
                title: '评价信息',
                auth: true
            },
            component: () => import('@view/admin/complaint')
        },
        {
            path: 'complaints',
            name: `${per}complaints`,
            meta: {
                title: '评价及建议',
                auth: true
            },
            component: () => import('@view/admin/complaints')
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
            path: 'payfree',
            name: `${per}payfree`,
            meta: {
                title: '设置费用',
                auth: true
            },
            component: () => import('@view/admin/payfree')
        }
    ]

}
