import Clipboard from 'clipboard'
export default function copyText({el,text,success,fail}) {
    const clipboard = new Clipboard(el.target,{text:() => text});
    clipboard.on('success', () => {
        success&&success()
        // 释放内存
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        // 不支持复制
        fail&&fail()
        // 释放内存
        clipboard.destroy()
    })
}