import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入 Element Plus+ 组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import '@/assets/css/elvar.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// elem中文语言包
import zhCn from 'element-plus/dist/locale/zh-cn.js'
// import lang from 'element-plus/lib/locale/lang/zh-cn.js'
import 'dayjs/locale/zh-cn.js'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import { useUserStore } from '@renderer/stores/loginStore/user.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 注册 Element Plus+ 组件库
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 设置 Element Plus+ 组件库语言为中文
app.use(ElementPlus, {
  locale: zhCn
})
// 设置全局颜色变量
app.config.globalProperties.$color = {
  primary: '#34b2f7',
  success: '#1aaf8b',
  warning: '#f5bc16',
  danger: '#fe4500',
  info: '#909399'
}

axios.defaults.baseURL = 'https://api.ihmeng.cn'

app.directive('permission', {
  mounted: (el, binding) => {
    const userStore = useUserStore()
    const { value } = binding
    if (value[0]) {
      if (value[1] === 'remove') {
        if (!userStore.userData.permission.includes(value[0])) {
          el.style.display = 'none'
        }
      }
    }
  }
})
app.mount('#app')
