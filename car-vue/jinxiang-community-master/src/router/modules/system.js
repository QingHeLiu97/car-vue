import layout from '@src/layout'
const pre = 'system-'
export default {
    path: '/system',
    name: 'system',
    redirect: {
        name: `${pre}userInfo`
    },
    component: layout,
    children: [
        {
            path: 'userInfo',
            name: `${pre}userInfo`,
            meta: {
                title: '个人中心',
                header: true,
                auth: true
            },
            component: () => import('@view/system/userInfo')
        }
    ]
}
