export default [
    {
        id: 'user-self',
        path: '/user/self',
        name: '个人信息',
        role: 'user',
        icon: 'el-icon-s-cooperation'
    },
    {
        id: 'user',
        path: '/user',
        name: '汽车列表',
        role: 'user',
        icon: 'el-icon-s-order',
        children: [
            {
                id: 'user-mycar',
                path: '/user/mycar',
                role: 'admin',
                name: '我的车辆'
            },
            {
                id: 'user-carList',
                path: '/user/carList',
                role: 'custom',
                name: '查看车源'
            }
        ]
    },
    {
        id: 'user-appraise',
        path: '/user/appraise',
        name: '我的评价',
        role: 'user',
        icon: 'el-icon-star-on'
    },
    {
        id: 'user-order',
        path: '/user/order',
        name: '我的订单',
        role: 'user',
        icon: 'el-icon-s-tools'
    },
    {
        id: 'user-notice',
        path: '/user/notice',
        name: '查看公告',
        role: 'user',
        icon: 'el-icon-s-order'
    }

]
