<template>
  <a-col :span="24">
    <a-card title="投票" style="width: 300px">
      <div v-for="(item, index) in vote.VoteStatus" :key="index">
        <a-statistic
          :title="item.Val"
          :value="item.Status.Num"
          style="margin-right: 50px"
        />
        <a-button type="link" @click="vote_add(item.Status.SelecterId)">
          投票{{ item.Status.SelecterId }}
        </a-button>
      </div>
    </a-card>
  </a-col>
</template>
<script>
import axios from "axios";
import { reactive, toRefs } from "vue";
export default {
  name:"vote",
  setup() {
    var res = reactive({
      vote: {},
    });
    var vote_add = function (id) {
      console.log(id);
      axios.get("run/vote_add?id=" + id).then(function (response) {
        if (response.data.data === true) {
          vote_get();
        } else {
          alert("已投过票，无法投票");
        }
      });
    };
    const vote_get = function () {
      axios.get("run/now_vote_get").then(function (response) {
        res.vote = response.data.data;
      });
    };
    vote_get();
    return {
      ...toRefs(res),
      vote_add,
      vote_get,
    };
  },
};
</script>