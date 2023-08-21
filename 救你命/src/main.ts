import { createApp } from 'vue'
import '@/style/reset.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import top from './components/top/index.vue'
import bottom from '@/components/bottom/index.vue'
import login from '@/components/login/index.vue'
import router from '@/router'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from '@/store'
import patient from '@/components/patient/index.vue'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './permission'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.component('top',top)
app.component('bottom',bottom)
app.component('login',login)
app.component('patient',patient)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia);
app.mount('#app')
