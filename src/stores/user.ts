// src/stores/user.ts
// 定义全局共享的 token 状态，并配置自动同步到本地

import { defineStore } form 'pinia'

export const useUserStore = defineStore('user', {
    // 定义状态
    state: () => ({
        token: '',
        userInfo: {}
    }),
    // 定义操作逻辑
    actions: {
        setToken(newToken) {
            this.token = newToken
        },
        clearUserInfo() {
            this.token = ''
            this.userInfo = {}
        }
    },
    // 持久化配置
    persist: true
})