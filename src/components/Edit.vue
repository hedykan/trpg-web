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
      <a-menu v-model:selectedKeys="current" mode="horizontal">
        <a-menu-item key="add">添加</a-menu-item>
        <a-menu-item key="link">链接</a-menu-item>
      </a-menu>
      <div v-if="check.add">
        <a-divider orientation="left">添加新节点</a-divider>
        <EditAdd />
      </div>
      <div v-if="check.link">
        <a-divider orientation="left">链接新节点</a-divider>
        <EditLink />
      </div>
    </a-col>
    <a-col :span="1"> </a-col>
  </a-row>
</template>
<script>
import axios from "axios";
import { ref, reactive, toRefs, provide, watch } from "vue";
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
    var current = ref(["add"]);
    var check = reactive({
      add: true,
      link: false,
    });
    watch(current, function () {
      clear_check();
      switch (current.value[0]) {
        case "add":
          check.add = true;
          break;
        case "link":
          check.link = true;
          break;
      }
    });
    var clear_check = function () {
      check.add = false;
      check.link = false;
    };
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
      current,
      ...toRefs(res),
      get_list,
      delete_node,
      check,
    };
  },
};
</script>