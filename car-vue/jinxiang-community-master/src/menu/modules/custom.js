export default [
    {
        id: "servicing-form",
        path: '/servicing/form',
        name: '维修申请',
        role:"custom",
        icon:"el-icon-s-cooperation",
    },
    {
        id: "complaint",
        path: '/admin/complaint',
        name: '评价及意见',
        role:"custom",
        icon:"el-icon-star-on",
    },
    {
        id: "contribution",
        path: '/contribution',
        name: '社区缴费',
        role:"custom",
        icon:"el-icon-s-order",
        children:[
            {
                id: "contribution-form",
                path: '/contribution/form',
                role:"admin",
                name: '费用缴纳',
            },
            {
                id: "contribution-customLlist",
                path: '/contribution/customLlist',
                role:"custom",
                name: '缴费明细',
            }
        ]
    }

]