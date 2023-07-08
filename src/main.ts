import './assets/main.scss'

// 1. 引入你需要的组件
import {
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  FloatingBubble,
  Badge,
  Toast,
  NavBar,
  Search,
  Collapse,
  CollapseItem,
  Popover,
  Overlay,
  ActionSheet,
  Form,
  Field,
  CellGroup,
  DatePicker,
  Stepper,
  CountDown
} from 'vant'

// 2. 引入组件样式
import 'vant/lib/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import dbInstall from '@/database/dbInstall'

// 初始化indexDB
await dbInstall.install()

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 3. 注册你需要的组件
app.use(Button)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Icon)
app.use(FloatingBubble)
app.use(Badge)
app.use(Toast)
app.use(NavBar)
app.use(Search)
app.use(Collapse)
app.use(CollapseItem)
app.use(Popover)
app.use(Overlay)
app.use(ActionSheet)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.use(DatePicker)
app.use(Stepper)
app.use(CountDown)

app.mount('#app')
