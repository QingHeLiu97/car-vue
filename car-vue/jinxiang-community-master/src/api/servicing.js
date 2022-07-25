import request from "@src/plugins/request"

// 列表
export const getServicingList = function (data){
    return request({
        url:'/servicing/pages',
        method:"GET",
        params:data,
    })
}
// 添加
export const getServicingInsert = function (data){
    return request({
        url:'/servicing/insert',
        method:"POST",
        // headers:{
        //     "Content-type":"multipart/form-data"
        // },
        data,
    })
}
// 更新
export const getServicingUpdate = function (data){
    return request({
        url:'/servicing/update',
        method:"POST",
        data,
    })
}
// 删除
export const getServicingDelete = function (data){
    return request({
        url:'/servicing/delete',
        method:"GET",
        params:data,
    })
}