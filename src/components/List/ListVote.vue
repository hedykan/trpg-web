<template>
  <a-card title="投票">
    <p v-for="(item, index) in res.vote.VoteStatus" :key="index">{{ item.Val }}: {{ item.Status.Num }}</p>
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
      vote: {},
    });
    const get_vote = function (room_id) {
      axios.get("run/now_vote_get?roomId=" + room_id).then(function (response) {
        res.vote = response.data.data;
      });
    };
    get_vote(props.room_id);
    console.log(res);
    return {
      ...toRefs(props),
      res,
    };
  },
};
</script>