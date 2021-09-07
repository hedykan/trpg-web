import { createRouter,createWebHashHistory } from "vue-router";

import List from './components/List.vue'
import Edit from './components/Edit.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {path: '/', component: List},
        {path: '/edit', component: Edit},
    ]
})

export default router