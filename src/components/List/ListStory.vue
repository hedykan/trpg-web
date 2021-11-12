<template>
  <a-card title="故事">
    <p>{{ res.now.Val }}</p>
    <p v-for="(item, index) in res.list" :key="index">{{ item.Val }}</p>
  </a-card>
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
      list: [],
      now: {},
    });
    var get_list = function (room_id) {
      axios
        .get("run/now_record_list?roomId=" + room_id)
        .then(function (response) {
          res.list = response.data.data;
        });
    };
    var get_node = function (room_id) {
      axios.get("run/now_node_get?roomId=" + room_id).then(function (response) {
        res.now = response.data.data;
      });
    };
    get_list(props.room_id);
    get_node(props.room_id);
    console.log(res);
    return {
      ...toRefs(props),
      res,
    };
  },
};
</script>