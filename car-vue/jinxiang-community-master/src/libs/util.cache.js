import Cookies from 'js-cookie';

class cache {
    /**
     * @description 存储 cookie 值
     * @param {String} key cookie key
     * @param {String} value cookie value
     */
    setCookies (key = 'default', value = '') {
        Cookies.set(`admin-${key}`, value);
    }

    /**
     * @description 拿到 cookie 值
     * @param {String} key cookie name
     */
    getCookies (key = 'default') {
        console.log(Cookies.get(`admin-${key}`))
        return Cookies.get(`admin-${key}`);
    };

    /**
     * @description 拿到 cookie 全部的值
     */
    getAllCookies () {
        return Cookies.get();
    };

    /**
     * @description 删除 cookie
     * @param {String} key cookie name
     */
    removeCookies (key = 'default') {
        return Cookies.remove(`admin-${key}`);
    };

    /**
     * @description 设置永久缓存
     * @param {String} key
     * @param {any} value
     * **/
    setLocalStorage (key = 'default', value = '') {
        const data = { value }
        localStorage.setItem(`admin-${key}`, JSON.stringify(data))
    }

    /**
     * @description 获取永久缓存
     * @param {String} key
     * **/
    getLocalStorage (key = 'default') {
        const data = localStorage.getItem(`admin-${key}`)
        if (data) {
            return JSON.parse(data).value
        } else {
            return false;
        }
    }

    /**
     * @description 删除永久缓存
     * @param {String} key
     * **/
    removeLocalStorage (key = 'default') {
        return localStorage.removeItem(`admin-${key}`);
    }

    /**
     * @description 清除永久缓存
     * **/
    clearLocalStorage () {
        return localStorage.clear();
    }

    /**
     * @description 设置页面缓存
     * @param {String} key
     * @param {any} value
     * **/
    setSessionStorage (key = 'default', value = '') {
        const data = { value }
        sessionStorage.setItem(`admin-${key}`, JSON.stringify(data))
    }

    /**
     * @description 获取页面缓存
     * @param {String} key
     * **/
    getSessionStorage (key = 'default') {
        const data = sessionStorage.getItem(`admin-${key}`)
        if (data) {
            return JSON.parse(data).value
        } else {
            return false
        }
    }

    /**
     * @description 删除页面缓存
     * @param {String} key
     * **/
    removeSessionStorage (key = 'default') {
        return sessionStorage.removeItem(`admin-${key}`);
    }

    /**
     * @description 清除页面缓存
     * **/
    clearSessionStorage () {
        return sessionStorage.clear();
    }
}

export default new cache()
