import layout from "@src/layout"
var per = "car-"
export default {
    path:'/car',
    name:'car',
    redirect:{
        name:'car'
    },
    meta:{
        title:'汽车管理',
    },
    component:layout,
    children:[
        {
            path:'list',
            name:`${per}list`,
            meta:{
                title:'汽车管理',
                auth:true,
            },
            component:()=>import("@view/car/list"),
        },
    ]

}
