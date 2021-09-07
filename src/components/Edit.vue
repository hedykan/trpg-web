<template>
  <a-page-header title="编辑页面" sub-title="在这里你可以尝试编辑你的团" />
  <a-row>
    <a-col :span="1"> </a-col>
    <a-col :span="10">
      <a-list :grid="{ gutter: 16, column: 4 }">
        <a-list-item
          v-for="(item, index) in list"
          :key="index"
          style="text-align: left"
        >
          <a-card>
            <a-descriptions :title="'故事节点' + item.Id">
              <a-descriptions-item label="节点号">
                {{ item.Id }}
              </a-descriptions-item>
              <a-descriptions-item label="输入节点">
                {{ item.Input }}
              </a-descriptions-item>
              <a-descriptions-item label="输出节点">
                {{ item.Output }}
              </a-descriptions-item>
              <a-descriptions-item label="内容">
                {{ item.Val }}
              </a-descriptions-item>
            </a-descriptions>
            <a-button type="primary" @click="delete_node(item.Id)"
              >删除该节点</a-button
            >
            <EditEd :data="item" />
          </a-card>
        </a-list-item>
      </a-list>
    </a-col>
    <a-col :span="2"> </a-col>
    <a-col :span="10">
      <a-divider orientation="left">添加新节点</a-divider>
      <EditAdd />
      <a-divider orientation="left">链接新节点</a-divider>
      <EditLink />
    </a-col>
    <a-col :span="1"> </a-col>
  </a-row>
</template>
<script>
import axios from "axios";
import { reactive, toRefs, provide } from "vue";
import EditAdd from "./EditAdd.vue";
import EditLink from "./EditLink.vue";
import EditEd from "./EditEd.vue";
export default {
  components: {
    EditAdd,
    EditLink,
    EditEd,
  },
  setup() {
    var res = reactive({
      list: [],
      post: {
        add: {
          val: null,
          input: [],
          output: [],
        },
        link: {
          val: null,
          input: null,
          output: null,
        },
      },
    });
    axios.defaults.baseURL = "http://127.0.0.1:12345/";
    var get_list = function () {
      axios.get("story/list").then(function (response) {
        console.log(response);
        res.list = response.data.data;
      });
    };
    var delete_node = function (id) {
      axios.get("story/node_delete?id=" + id).then(function () {
        get_list();
      });
    };
    get_list();
    provide("edit_get_list", get_list);
    return {
      ...toRefs(res),
      get_list,
      delete_node,
    };
  },
};
</script>