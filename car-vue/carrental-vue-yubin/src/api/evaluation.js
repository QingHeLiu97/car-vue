import request from '@src/plugins/request'

export const getEvaluationList = function (data) {
    return request({
        url: '/evaluation/list',
        method: 'POST',
        data
    })
}
