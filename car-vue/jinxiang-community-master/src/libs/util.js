import Setting from "@src/setting.js"
/**
 * 根据当前路由查询当前菜单项
 * @param {String} path     当前路径
 * @param {Array} menuList  菜单列表
 * **/
export const getMenuItem = function(path,menuList){
    var allMenu = []
    menuList.forEach((item,index) => {
        const menus = transferMenu(item)
        allMenu.push({id:item.id,path:item.path,name:item.name})
        menus.forEach(menu => allMenu.push({id:menu.id,path:menu.path,name:menu.name}))
    });
    return allMenu.find(item => item.path == path );
}


/**
 * 根据当前路由查询当前打开的菜单
 * @param {String} path     当前路径
 * @param {Array} menuList  菜单列表
 * **/
 export const getOpenMenu = function(path,menuList){
    var openMenu = ""
    menuList.forEach((item,index) => {
        if(item.children&&item.children.length){
            const menus = transferMenu(item)
            const list =  menus.filter(menu => menu.path == path)
            if(list.length){
                openMenu = item.id
            }
        }
    });
    return openMenu
}


function transferMenu(menu){
    if(menu.children && menu.children.length){
        return menu.children.reduce((all,item)=>{
            all.push({
                id:item.id,
                path:item.path,
                name:item.name,
            })
            const childrenMenu = transferMenu(item);
            return all.concat(childrenMenu)
        },[])
    }else{
        return []
    }
}


/**
 * @description 设置页面标题
 * **/
export const setDocumentTitle = function(title){
    if(title){
        window.document.title = Setting.titleSuffix + '-' + title
    }else{
        window.document.title = Setting.titleSuffix
    }
}






