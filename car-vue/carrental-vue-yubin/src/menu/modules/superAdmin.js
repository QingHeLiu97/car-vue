export default [
    {
        id: 'custom',
        path: '/custom/list',
        name: '业主管理',
        role: 'superAdmin',
        icon: 'el-icon-s-custom'
    },
    {
        id: 'servicing-list',
        path: '/servicing/list',
        name: '报修管理',
        role: 'superAdmin',
        icon: 'el-icon-s-cooperation'
    },
    {
        id: 'admin-notice',
        path: '/admin/notice',
        icon: 'el-icon-message-solid',
        role: 'superAdmin',
        name: '公告管理'
    },
    {
        id: 'admin-complaints',
        path: '/admin/complaints',
        icon: 'el-icon-star-on',
        role: 'superAdmin',
        name: '评价信息'
    },
    // {
    //     id: 'payfree',
    //     path: '/admin/payfree',
    //     name: '发布缴费',
    //     role: 'superAdmin',
    //     icon: 'el-icon-message-solid'
    // },
    {
        id: 'contribution',
        path: '/contribution',
        name: '社区缴费',
        role: 'superAdmin',
        icon: 'el-icon-s-order',
        children: [
            // {
            //    id: "contribution-form",
            //    path: '/contribution/form',
            //    role:"superAdmin",
            //    name: '费用缴纳',
            // },
            {
                id: 'contribution-list',
                path: '/contribution/list',
                role: 'superAdmin',
                name: '缴费明细'
            }
        ]
    },
    {
        id: 'admin',
        path: '/admin',
        name: '管理员管理',
        role: 'superAdmin',
        icon: 'el-icon-s-tools',
        children: [
            {
                id: 'admin-list',
                path: '/admin/list',
                role: 'superAdmin',
                name: '管理员'
            }
            // {
            //     id: "admin-type",
            //     path: '/admin/type',
            //     role:"superAdmin",
            //     name: '缴费项目',
            // },
        ]
    }
]
