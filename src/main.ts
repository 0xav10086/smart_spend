import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css' // 确保这一行在 Element 样式之后或之前均可，v4 处理冲突很聪明
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')