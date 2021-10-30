<template>
  <a-button type="primary" @click="show_edit_drawer">编辑</a-button>
  <a-drawer
    title="节点编辑"
    placement="left"
    :closable="false"
    v-model:visible="edit_visible"
  >
    <a-row>
      <a-col :span="24">
        <p>节点号：{{ res.Id }}</p>
      </a-col>
      <a-col :span="24">
        <p>内容：</p>
        <a-input v-model:value="res.Val" />
      </a-col>
      <a-col :span="24">
        <p>输入节点：</p>
        <a-input
          v-for="(value, index) in res.Input"
          :key="index"
          v-model:value="value.Val"
        ></a-input>
      </a-col>
      <a-col :span="24">
        <p>输出节点：</p>
        <a-input
          v-for="(value, index) in res.Output"
          :key="index"
          v-model:value="value.Val"
        ></a-input>
      </a-col>
      <a-col :span="24">
        <a-button
          type="primary"
          @click="edit_node(res.Id, res.Val, res.Input, res.Output)"
        >
          确认修改
        </a-button>
      </a-col>
    </a-row>
  </a-drawer>
</template>
<script>
import { reactive, ref, inject } from "vue";
import axios from "axios";
export default {
  props: {
    data: Object,
  },
  setup(props) {
    var get_list = inject("edit_get_list");
    var res = reactive({
      Id: props.data.Id,
      Val: props.data.Val,
      Input: props.data.Input,
      Output: props.data.Output,
    });
    const edit_visible = ref(false);
    const show_edit_drawer = function () {
      edit_visible.value = true;
    };
    var edit_node = function (id, val, input, output) {
      console.log(id, val, input, output);
      edit_visible.value = false;
      axios
        .post("story/node_edit", {
          id: id,
          val: val,
          input: input,
          output: output,
        })
        .then(function (response) {
          if (response.data.data === true) {
            alert("编辑成功");
          } else {
            alert("编辑失败");
          }
          get_list();
        });
    };
    return {
      edit_visible,
      show_edit_drawer,
      edit_node,
      res,
    };
  },
};
</script>