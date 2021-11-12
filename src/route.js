import { createRouter,createWebHashHistory } from "vue-router";

import List from './components/List.vue'
import Edit from './components/Edit.vue'
import Home from './components/Home.vue'
import Room from './components/Room.vue'
import RoomList from './components/RoomList.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {path: '/', component: Home},
        {path: '/list', component: List},
        {path: '/edit', component: Edit},
        {path: '/room/:room_id', component: Room},
        {path: '/room_list', component: RoomList}
    ]
})

export default router