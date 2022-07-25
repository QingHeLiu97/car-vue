import layout from "@src/layout"
var per = "contribution-"
export default {
    path:'/contribution',
    name:'contribution',
    redirect:{
        name:`${per}list`
    },
    meta:{
        title:'社区缴费',
    },
    component:layout,
    children:[
        {
            path:'list',
            name:`${per}list`,
            meta:{
                title:'缴费明细',
                auth:true,
            },
            component:()=>import("@view/contribution/list"),  
        },
        {
            path:'customLlist',
            name:`${per}customLlist`,
            meta:{
                title:'缴费明细',
                auth:true,
            },
            component:()=>import("@view/contribution/customLlist"),  
        },
        {
            path:'form',
            name:`${per}form`,
            meta:{
                title:'费用缴纳',
                auth:true,
            },
            component:()=>import("@view/contribution/form"),  
        }
    ]
    
}