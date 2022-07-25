import menuList from '@src/menu'
export default {
    namespaced: true,
    state: {
        menuList: menuList, // 左边菜单列表
        menuItemAction: '', // 当前选中项
        menuItemTitle: [], // 当前选中项的标题
        menuSubOpen: [] // 当前展开项
    },
    mutations: {
        // 设置菜单选中项
        setMenuItemAction (state, index) {
            state.menuItemAction = index;
        },
        // 设置菜单选中项标题
        setMenuItemTitle (state, title) {
            state.menuItemTitle = title;
        },
        // 设置菜单展开
        setMenuSubOpen (state, index) {
            const i = state.menuSubOpen.indexOf(index)
            if (i == -1)state.menuSubOpen.push(index);
        },
        // 设置菜单收起
        setMenuSubClose (state, index) {
            const i = state.menuSubOpen.indexOf(index)
            if (i > -1)state.menuSubOpen.splice(i, 1);
        }
    },
}
