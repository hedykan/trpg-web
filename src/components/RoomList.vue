<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link to="/">首页</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      <router-link to="/room_list">房间列表</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
  <br />
  <a-row>
    <a-col :span="8" v-for="(item, index) in list" :key="index">
      <a-card :title="'房间' + item.RoomId" style="width: 90%; height: 400px">
        <template #extra>
          <router-link :to="'/room/' + item.RoomId"> 进入房间 </router-link>
        </template>
        <p>{{ item.Background }}</p>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import axios from "axios";
import { reactive, toRefs } from "@vue/reactivity";
export default {
  setup() {
    var res = reactive({
      list: [],
    });
    axios.get("room/list").then(function (response) {
      res.list = response.data.data;
      console.log(response.data.data);
    });
    console.log(res.list);
    return { ...toRefs(res) };
  },
};
</script>