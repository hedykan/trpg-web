<template>
  <a-page-header title="跑团页面" sub-title="在这里你可以尝试游玩你的团" />
  <a-row>
    <a-col :span="6">
      <a-row>
        <a-space direction="vertical">
          <Background :data="background" />
          <Vote ref="vote"></Vote>
          <Msg />
        </a-space>
      </a-row>
    </a-col>
    <a-col :span="18">
      <a-list :grid="{ gutter: 16, column: 4 }">
        <a-list-item
          v-for="(item, index) in list"
          :key="index"
          style="text-align: center"
        >
          <a-card>
            <a-row>
              <a-col :span="16"> {{ item.Val }} </a-col>
              <a-col :span="8">
                <a-button
                  v-if="showStatus"
                  type="primary"
                  @click="node_return(item.Id)"
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
              <a-col :span="16">
                {{ now.Val }}
              </a-col>
              <a-col :span="8">
                <div v-if="showStatus">
                  <a-button
                    type="primary"
                    v-for="(item, index) in now.Output"
                    :key="index"
                    @click="step(item.Id)"
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
    const vote = ref();
    const vote_get = function () {
      vote.value.vote_get();
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
    var get_list = function () {
      axios.get("run/now_record_list").then(function (response) {
        res.list = response.data.data;
      });
    };
    var get_node = function () {
      axios.get("run/now_node_get").then(function (response) {
        res.now = response.data.data;
      });
    };
    var get_background = function () {
      axios.get("run/story_background_get").then(function (response) {
        res.background = response.data.data.Background;
      });
    };
    var step = function (id) {
      axios.get("run/step" + "?id=" + id).then(function () {
        get_list();
        get_node();
        vote_get();
      });
    };
    var node_return = function (id) {
      axios.get("run/return" + "?id=" + id).then(function () {
        get_list();
        get_node();
        vote_get();
      });
    };
    get_list();
    get_node();
    get_background();

    return {
      ...toRefs(res),
      step,
      node_return,
      selecterShow,
      vote,
      vote_get,
    };
  },
};
</script>