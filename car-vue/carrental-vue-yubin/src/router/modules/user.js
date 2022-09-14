import layout from "@src/layout"
var per = "user-"
export default {
    path:'/user',
    name:'user',
    redirect:{
        name:'user'
    },
    meta:{
        title:'普通用户',
    },
    component:layout,
    children:[
        {
            path:'self',
            name:`${per}self`,
            meta:{
                title:'个人信息',
                auth:true,
            },
            component:()=>import("@view/system/userInfo"),
        },
        {
            path: 'carList',
            name: `${per}carList`,
            meta: {
                title: '汽车列表',
                auth: true
            },
            component: () => import('@view/car/list')
        },
        {
            path: 'mycar',
            name: `${per}mycar`,
            meta: {
                title: '我的车源',
                auth: true
            },
            component: () => import('@view/mycar/list')
        },
        {
            path: 'myappraise',
            name: `${per}myappraise`,
            meta: {
                title: '我的评价',
                auth: true
            },
            component: () => import('@view/myappraise/list')
        },
        {
            path: 'appraiseList',
            name: `${per}appraiseList`,
            meta: {
                title: '所有评价',
                auth: true
            },
            component: () => import('@view/appraise/list')
        },
        {
            path: 'order',
            name: `${per}order`,
            meta: {
                title: '我的订单',
                auth: true
            },
            component: () => import('@view/order/list')
        },
        {
            path: 'notice',
            name: `${per}notice`,
            meta: {
                title: '查看公告',
                auth: true
            },
            component: () => import('@view/notice/list')
        },
    ]

}
