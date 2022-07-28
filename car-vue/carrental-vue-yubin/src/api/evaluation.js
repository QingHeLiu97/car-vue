import request from '@src/plugins/request'

export const getEvaluationList = function (data) {
    return request({
        url: '/evaluation/list',
        method: 'POST',
        data
    })
}
export const insetEvaluation = function (data) {
    return request({
        url: '/evaluation/inserts',
        method: 'POST',
        data
    })
}
export const deleteEvaluation = function (data) {
    return request({
        url: '/evaluation/delete',
        method: 'POST',
        data
    })
}
export const updateEvaluation = function (data) {
    return request({
        url: '/evaluation/update',
        method: 'POST',
        data
    })
}
