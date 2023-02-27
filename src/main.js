import { createApp } from 'vue'
import App from './App.vue'
import { registerGlobal } from '../global/registerComponents'
import 'ant-design-vue/dist/antd.css'
const app = createApp(App)
registerGlobal(app)
app.mount('#app')
