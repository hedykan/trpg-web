<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link to="/">首页</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      <router-link to="/room_list">房间列表</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>房间{{ room_id }}</a-breadcrumb-item>
  </a-breadcrumb>
  <div>
    <a-menu v-model:selectedKeys="select_key" mode="horizontal">
      <a-menu-item key="list"> 故事 </a-menu-item>
      <a-menu-item key="edit"> 编辑 </a-menu-item>
    </a-menu>
    <ListNew :room_id="room_id" v-if="select_key[0] === 'list'" />
    <EditNew :room_id="room_id" v-if="select_key[0] === 'edit'" />
  </div>
</template>
<script>
// 房间号
// 通过路由获取房间号
import { useRoute } from "vue-router";
import { ref } from "vue";
import ListNew from "./List/ListNew.vue";
import EditNew from "./Edit/EditNew.vue";
export default {
  components: { ListNew, EditNew },
  setup() {
    const select_key = ref(["list"]);
    const route = useRoute();
    var room_id = route.params["room_id"];
    return {
      select_key,
      room_id,
    };
  },
};
</script>