<template>
  <div v-if="!mobile_status" :style="{width: '90%'}">
    <a-card title="投票">
      <div v-for="(item, index) in vote.VoteStatus" :key="index">
        <a-statistic
          :title="item.Val"
          :value="item.Status.Num"
          style="margin-right: 50px"
        />
        <a-button type="link" @click="vote_add(item.Status.SelecterId, room_id)">
          投票{{ item.Status.SelecterId }}
        </a-button>
      </div>
    </a-card>
  </div>
  <div v-if="mobile_status">
    <a-affix :offset-top="top">
      <a-button type="primary" @click="show_drawer">投票</a-button>
    </a-affix>
    <a-drawer
      title="投票"
      placement="right"
      :closable="false"
      v-model:visible="visible"
    >
      <div v-for="(item, index) in vote.VoteStatus" :key="index">
        <a-statistic
          :title="item.Val"
          :value="item.Status.Num"
          style="margin-right: 50px"
        />
        <a-button type="link" @click="vote_add(item.Status.SelecterId, room_id)">
          投票{{ item.Status.SelecterId }}
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import axios from "axios";
import { reactive, toRefs, ref } from "vue";
export default {
  props: {
    mobile_status: Boolean,
    room_id: Object,
  },
  name: "vote",
  setup(props) {
    var res = reactive({
      vote: {},
    });
    var visible = ref(false);
    var top = ref(100);
    var show_drawer = function () {
      visible.value = true;
    };
    var vote_add = function (node_id, room_id) {
      console.log(node_id, room_id);
      axios
        .get("run/vote_add?nodeId=" + node_id + "&roomId=" + room_id)
        .then(function (response) {
          console.log(response.data.data);
          if (response.data.data === true) {
            vote_get(room_id);
          } else {
            alert("已投过票，无法投票");
          }
        });
    };
    const vote_get = function (room_id) {
      axios.get("run/now_vote_get?roomId=" + room_id).then(function (response) {
        res.vote = response.data.data;
      });
    };
    vote_get(props.room_id);
    return {
      ...toRefs(res),
      vote_add,
      vote_get,
      ...toRefs(props),
      visible,
      show_drawer,
      top,
    };
  },
};
</script>