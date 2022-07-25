import layout from "@src/layout"
var per = "custom-"
export default {
    path:'/custom',
    name:'custom',
    redirect:{
        name:'custom'
    },
    meta:{
        title:'业主管理',
    },
    component:layout,
    children:[
        {
            path:'list',
            name:`${per}list`,
            meta:{
                title:'业主管理',
                auth:true,
            },
            component:()=>import("@view/custom/list"),  
        }
    ]
    
}