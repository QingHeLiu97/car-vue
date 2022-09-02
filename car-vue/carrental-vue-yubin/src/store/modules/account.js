import { accountAuthLogin } from '@api/account'
import { updateUser } from '@api/user'
import cache from '@src/libs/util.cache.js'
import Setting from '@src/setting'
export default {
    namespaced: true,
    state: {
        token: cache.getSessionStorage(Setting.tokenKey) || '',
        userInfo: cache.getSessionStorage('userInfo') || null,
        role: cache.getSessionStorage('role') || null
    },
    mutations: {
        // 保存token
        setToken (state, token) {
            cache.setSessionStorage(Setting.tokenKey, token)
            state.token = token;
        },
        // 保存用户信息
        setUserInfo (state, userInfo) {
            cache.setSessionStorage('userInfo', userInfo);
            state.userInfo = userInfo;
        },
        // 保存权限
        setRole (state, role) {
            cache.setSessionStorage('role', role);
            state.role = role;
        }
    },
    actions: {

        accountLogin ({ state, commit, dispatch }, { username = '', password = '' }) {
            return new Promise((resolve, reject) => {
                accountAuthLogin({ password, username }).then(async res => {
                    await commit('setRole', res.result.role)
                    await commit('setToken', res.result.token)
                    await commit('setUserInfo', res.result)
                    resolve(res)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })
        },
        /**
         * @description 用户信息修改
         * **/
         accountAuthUpdate ({ state, commit, dispatch }, data) {
            return new Promise((resolve, reject) => {
                updateUser(data).then(async res => {
                    if (data.password) {
                        await dispatch('accountLogout')
                    } else {
                        state.userInfo.name = data.name;
                        state.userInfo.username = data.username;
                        state.userInfo.phone = data.phone;
                        await commit('setUserInfo', state.userInfo)
                    }
                    resolve(res)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })
        },
        /**
         * @description 退出登录
         * @param {String} username 用户名
         * @param {String} pwd 密码
         * @param {String} code 验证码
         * **/
         accountLogout ({ state, commit, dispatch }) {
            return new Promise(async (resolve, reject) => {
                await dispatch('accountClearCache');
                resolve()
            })
        },
        /**
         * @description 清除数据和缓存
         *
         * **/
         accountClearCache ({ state, commit }) {
             return new Promise(async (resolve, reject) => {
                await commit('setToken', '');
                await commit('setUserInfo', {});
                await commit('setRole', '');
                resolve()
             })
         }

    }
}
