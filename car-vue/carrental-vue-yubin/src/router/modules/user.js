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
            path:'list',
            name:`${per}list`,
            meta:{
                title:'普通用户',
                auth:true,
            },
            component:()=>import("@view/user/list"),
        }
    ]

}
