import { createApp } from 'vue'
import App from './App.vue'
import route from './route.js'
import axios from 'axios'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

let app = createApp(App)
axios.defaults.baseURL = 'http://127.0.0.1:12345/'

app
.use(Antd)
.use(route)
.mount('#app')
