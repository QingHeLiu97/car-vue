import request from '@src/plugins/request'

export const getAppraiseList = function (data) {
    return request({
        url: '/appraise/list',
        method: 'POST',
        data
    })
}
export const insetAppraise = function (data) {
    return request({
        url: '/appraise/inserts',
        method: 'POST',
        data
    })
}
export const deleteAppraise = function (data) {
    return request({
        url: '/appraise/delete',
        method: 'POST',
        data
    })
}
export const updateAppraise = function (data) {
    return request({
        url: '/appraise/update',
        method: 'POST',
        data
    })
}
