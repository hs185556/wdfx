import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import dbInstall from '@/database/dbInstall'

// 初始化indexDB
await dbInstall.install();

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
