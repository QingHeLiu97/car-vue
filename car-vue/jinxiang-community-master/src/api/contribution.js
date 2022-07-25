import request from "@src/plugins/request"

// 列表
export const getContributionList = function (data){
    return request({
        url:'/contribution/pages',
        method:"GET",
        params:data,
    })
}
// 添加
export const getContributionInsert = function (data){
    return request({
        url:'/contribution/insert',
        method:"POST",
        data,
    })
}
// 更新
export const getContributionUpdate = function (data){
    return request({
        url:'/contribution/update',
        method:"POST",
        data,
    })
}
// 删除
export const getContributionDelete = function (data){
    return request({
        url:'/contribution/delete',
        method:"GET",
        params:data,
    })
}