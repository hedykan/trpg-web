<template>
  <a-page-header title="跑团页面" sub-title="在这里你可以尝试游玩你的团" />
  <a-list :grid="{ gutter: 16, column: 4 }">
    <a-list-item
      v-for="(item, index) in list"
      :key="index"
      style="text-align: center"
    >
      <a-card>
        <a-row>
          <a-col :span="16">
            {{ item.Val }}
          </a-col>
          <a-col :span="8">
            <a-button type="primary" @click="node_return(item.Id)">
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
            <a-button
              type="primary"
              v-for="(item, index) in now.Output"
              :key="index"
              @click="step(item.Id)"
            >
              {{ item.Val }}
            </a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-list-item>
  </a-list>
</template>

<script>
import axios from "axios";
import { reactive, toRefs } from "@vue/reactivity";
export default {
  setup() {
    axios.defaults.baseURL = "http://127.0.0.1:12345/";
    var res = reactive({
      list: [],
      now: [],
    });
    var get_list = function () {
      axios.get("run/now_record_list").then(function (response) {
        res.list = response.data.data;
        console.log(response);
      });
    };
    var get_node = function () {
      axios.get("run/now_node_get").then(function (response) {
        res.now = response.data.data;
        console.log(response);
      });
    };
    var step = function (id) {
      axios.get("run/step" + "?id=" + id).then(function () {
        get_list();
        get_node();
      });
    };
    var node_return = function (id) {
      axios.get("run/return" + "?id=" + id).then(function () {
        get_list();
        get_node();
      });
    };
    get_list();
    get_node();

    return {
      ...toRefs(res),
      step,
      node_return,
    };
  },
};
</script>