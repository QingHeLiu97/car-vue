//  注册全局过滤器
export default {
    // 文件大小单位转换
    fileSizeUnit (val) {
        var size = Number(val)
        if (size > 1024) { // B=>KB
            size = size / 1024
            if (size > 1024) { // KB=>MB
                size = size / 1024
                return String(size.toFixed(2)) + 'MB'
            } else {
                return String(size.toFixed(2)) + 'KB'
            }
        } else {
            return String(size) + 'B'
        }
    },
    // 创建时间颜色
    createdTimeColor (val) {
        if (!val) {
            return ''
        }
        var date = new Date(val)
        var year = date.getFullYear()
        var mouth = date.getMonth()
        var day = date.getDate()

        var toDate = new Date()
        var toYear = toDate.getFullYear()
        var toMouth = toDate.getMonth()
        var toDay = toDate.getDate()
        if (toYear === year && toMouth === mouth && toDay === day) {
            // return " color:#F56C6C"
            return 'color-red'
        } else {
            return ''
        }
    }
}
