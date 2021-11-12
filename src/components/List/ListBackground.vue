<template>
  <a-card title="背景">
    <p>{{ res.background }}</p>
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
      background: {},
    });
    var get_background = function (room_id) {
      axios
        .get("run/story_background_get?roomId=" + room_id)
        .then(function (response) {
          res.background = response.data.data.Background;
        });
    };
    get_background(props.room_id);
    console.log(res);
    return {
      ...toRefs(props),
      res,
    };
  },
};
</script>