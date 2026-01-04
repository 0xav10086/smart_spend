// src/stores/user.ts
// 定义全局共享的 token 状态，并配置自动同步到本地

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    // 定义状态
    state: () => ({
        // 初始化时尝试从本地读取 token
        token: localStorage.getItem('token') || '',
        userInfo: {}
    }),
    // 定义操作逻辑
    actions: {
        setToken(newToken: string) {
            this.token = newToken
            localStorage.setItem('token', newToken)
        },
        clearUserInfo() {
            this.token = ''
            this.userInfo = {}
            localStorage.removeItem('token')
        }
    },
})