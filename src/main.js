import { createApp } from 'vue'
import App from './App.vue'
import route from './route.js'
import axios from 'axios'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { common } from './common'

let app = createApp(App)

// axios.defaults.baseURL = 'https://trpg-api.juhuan.store/'
axios.defaults.baseURL = 'http://127.0.0.1:12345/'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('trpg-token')
axios.interceptors.response.use(function (response) {
    if (response.data.code !== 200) {
        alert(response.data.msg)
    }
    return response
})
if(localStorage.getItem('trpg-token') === 'null') {
    common.token = null
} else {
    common.token = localStorage.getItem('trpg-token')
}
common.login_status = JSON.parse(localStorage.getItem('trpg-auth-status'))
if(window.innerWidth < 1024) {
    common.mobile_status = true
} else {
    common.mobile_status = false
}

app
    .use(Antd)
    .use(route)
    .mount('#app')
