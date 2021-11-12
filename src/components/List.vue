<template>
  <router-link :to="'/room_list'"> 返回房间列表 </router-link>
  <a-page-header title="跑团页面" sub-title="在这里你可以尝试游玩你的团" />
  <a-row>
    <a-col :span="span.other.all">
      <a-row>
        <Background :data="background" :mobile_status="common.mobile_status" />
        <Vote
          ref="vote"
          :mobile_status="common.mobile_status"
          :room_id="common.room_id"
        />
        <Msg :mobile_status="common.mobile_status" />
      </a-row>
    </a-col>
    <a-col :span="span.list.all">
      <a-list :grid="{ gutter: 16, column: 4 }">
        <a-list-item
          v-for="(item, index) in list"
          :key="index"
          style="text-align: center"
        >
          <a-card>
            <a-row>
              <a-col :span="span.list.detail"> {{ item.Val }} </a-col>
              <a-col :span="span.list.buttom">
                <a-button
                  v-if="showStatus"
                  type="primary"
                  @click="node_return(item.Id, common.room_id)"
                >
                  回退
                </a-button>
              </a-col>
            </a-row>
          </a-card>
        </a-list-item>
        <a-list-item style="text-align: center">
          <a-card>
            <a-row>
              <a-col :span="span.list.detail">
                {{ now.Val }}
              </a-col>
              <a-col :span="span.list.buttom">
                <div v-if="showStatus">
                  <a-button
                    type="primary"
                    v-for="(item, index) in now.Output"
                    :key="index"
                    @click="step(item.Id, common.room_id)"
                  >
                    {{ item.Id }}: {{ item.Val }}
                  </a-button>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-list-item>
      </a-list>
    </a-col>
  </a-row>
</template>

<script>
import axios from "axios";
import Background from "./Background.vue";
import Msg from "./Msg.vue";
import Vote from "./Vote.vue";
import { common } from "../common";
import { ref, reactive, toRefs, watch } from "vue";
export default {
  components: { Background, Msg, Vote },
  setup() {
    var res = reactive({
      list: [],
      now: [],
      background: "",
      showStatus: false,
    });
    var span = {
      other: {
        all: 6,
      },
      list: {
        all: 18,
        detail: 16,
        buttom: 8,
      },
    };
    if (common.mobile_status) {
      span.list.all = 24;
      span.list.detail = 24;
      span.list.buttom = 24;
      span.other = 24;
    }
    const vote = ref();
    const vote_get = function (room_id) {
      vote.value.vote_get(room_id);
    };
    const login_status_check = function () {
      if (
        common.login_status != null &&
        common.login_status["OwnRunning"][0]["Role"] === "kp"
      ) {
        res.showStatus = true;
      } else {
        res.showStatus = false;
      }
    };
    login_status_check();
    watch(common, function () {
      login_status_check();
    });
    var selecterShow = ref(true); // 自动显示选项
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
    var get_background = function (room_id) {
      axios
        .get("run/story_background_get?roomId=" + room_id)
        .then(function (response) {
          res.background = response.data.data.Background;
        });
    };
    var step = function (node_id, room_id) {
      axios
        .get("run/step" + "?nodeId=" + node_id + "&roomId=" + room_id)
        .then(function () {
          get_list(room_id);
          get_node(room_id);
          vote_get(room_id);
        });
    };
    var node_return = function (node_id, room_id) {
      axios
        .get("run/return" + "?nodeId=" + node_id + "&roomId=" + room_id)
        .then(function () {
          get_list(room_id);
          get_node(room_id);
          vote_get(room_id);
        });
    };
    get_list(common.room_id);
    get_node(common.room_id);
    get_background(common.room_id);

    return {
      ...toRefs(res),
      step,
      node_return,
      selecterShow,
      vote,
      vote_get,
      common,
      span,
    };
  },
};
</script>