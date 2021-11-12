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
            <a-row>
              <a-col :span="24">节点{{ item.Id }}</a-col>
              <a-col :span="24">节点内容:{{ item.Val }}</a-col>
              <a-col :span="12">
                <a-row>
                  <a-col :span="24">输入组:</a-col>
                  <a-col
                    :span="24"
                    v-for="(input_item, input_index) in item.Input"
                    :key="input_index"
                  >
                    {{ input_item }}
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="12">
                <a-row>
                  <a-col :span="24">选项组:</a-col>
                  <a-col
                    :span="20"
                    v-for="(output_item, output_index) in item.Output"
                    :key="output_index"
                  >
                    {{ output_item }}
                    <EditSelecterDelete
                      :data="{ nodeId: item.Id, linkId: output_item.Id }"
                    />
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
            <a-button type="primary" @click="delete_node(item.Id)">
              删除该节点
            </a-button>
            <EditEd :data="item" />
            <EditSelecterAdd :data="item" />
          </a-card>
        </a-list-item>
      </a-list>
    </a-col>
    <a-col :span="2"> </a-col>
    <a-col :span="10">
      <div v-if="check.add">
        <a-divider orientation="left">添加新节点</a-divider>
        <EditAdd />
      </div>
    </a-col>
    <a-col :span="1"> </a-col>
  </a-row>
</template>
<script>
import axios from "axios";
import { ref, reactive, toRefs, provide, watch } from "vue";
import EditAdd from "./EditAdd.vue";
import EditEd from "./EditEd.vue";
import EditSelecterAdd from "./EditSelecterAdd.vue";
import EditSelecterDelete from "./EditSelecterDelete.vue";
import { common } from "../common";
export default {
  components: {
    EditAdd,
    EditEd,
    EditSelecterAdd,
    EditSelecterDelete,
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
    var get_list = function (room_id) {
      axios.get("story/list?roomId=" + room_id).then(function (response) {
        res.list = response.data.data;
      });
    };
    var delete_node = function (id) {
      axios.get("story/node_delete?id=" + id).then(function () {
        get_list();
      });
    };
    get_list(common.room_id);
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