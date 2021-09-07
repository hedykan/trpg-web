<template>
  <a-button type="primary" @click="showDrawer">编辑</a-button>
  <a-drawer
    title="Basic Drawer"
    placement="left"
    :closable="false"
    v-model:visible="visible"
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
        <a-input v-model:value="res.Input"></a-input>
      </a-col>
      <a-col :span="24">
        <p>输出节点：</p>
        <a-input v-model:value="res.Output"></a-input>
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
import { reactive, ref } from "vue";
// import axios from "axios"
export default {
  props: {
    data: Object,
  },
  setup(props) {
    var res = reactive({
      Id: props.data.Id,
      Val: props.data.Val,
      Input: props.data.Input,
      Output: props.data.Output,
    });
    if(res.Input != null) {
      res.Input = res.Input.toString();
    }
    if(res.Output != null) {
      res.Output = res.Output.toString();
    }
    const visible = ref(false);
    const showDrawer = function () {
      visible.value = true;
    };
    var edit_node = function (id, val, input, output) {
      if(input !== '') {
        input = input.split(",").map(Number);
      } else {
        input = null;
      }
      if(output !== '') {
        output = output.split(",").map(Number);
      }else{
        output = null
      }
      console.log(id, val, input, output);
    };
    return {
      visible,
      showDrawer,
      edit_node,
      res,
    };
  },
};
</script>