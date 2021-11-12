<template>
  <a-list>
    <a-list-item v-for="(item, index) in res.list" :key="index">
      <a-row>
        <a-col :span="24">
          <p>{{ item.Val }}</p>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" shape="round"> 编辑 </a-button>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" shape="round"> 删除此节点 </a-button>
        </a-col>
      </a-row>
    </a-list-item>
  </a-list>
</template>
<script>
import { reactive, toRefs } from "@vue/reactivity";
import axios from "axios";
export default {
  props: {
    room_id: String,
  },
  setup(props) {
    var res = reactive({
      list: {},
    });
    var get_list = function (room_id) {
      axios.get("story/list?roomId=" + room_id).then(function (response) {
        res.list = response.data.data;
      });
    };
    get_list(props.room_id);
    return {
      ...toRefs(props),
      res,
    };
  },
};
</script>