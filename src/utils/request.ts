// scr/utils/request.ts
// 统一为请求加上“身份证”，并统一处理“身份过期”的报错。

import axios from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const service = axios.create({
    baseURL: '/api', // 接口前缀
    timeout: 5000    // 超时时间
})

// 1. 请求拦截器：出门办事带上证件
service.interceptors.request.use(config => {
    const userStore = useUserStore()
    if (userStore.token) {
        // 按照后端约定的格式携带 Token
        config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
}, error => Promise.reject(error))

// 2. 响应拦截器：检查证件是否被吊销
service.interceptors.response.use(response => {
    return response.data // 简化返回层级
}, error => {
    if (error.response?.status === 401) {
        const userStore = useUserStore()
        userStore.clearUserInfo() // 清理档案
        // 跳转到登录页，并记录当前位置以便“原地复活”
        router.push(`/login?redirect=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(error)
})

export default service