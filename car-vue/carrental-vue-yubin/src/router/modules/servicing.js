import layout from "@src/layout"
var per = "servicing-"
export default {
    path:'/servicing',
    name:'servicing',
    redirect:{
        name:`${per}list`
    },
    meta:{
        title:'维修',
    },
    component:layout,
    children:[
        {
            path:'list',
            name:`${per}list`,
            meta:{
                title:'报修管理',
                auth:true,
            },
            component:()=>import("@view/servicing/list"),  
        },
        {
            path:'form',
            name:`${per}form`,
            meta:{
                title:'维修申请',
                auth:true,
            },
            component:()=>import("@view/servicing/form"),  
        }
    ]
    
}