<template>
  <a-row>
    <a-col :span="24">
      <a-textarea placeholder="请输入故事内容" v-model:value="link.val" />
    </a-col>
    <a-col :span="12">
      <a-textarea
        placeholder="请输入输入节点，用逗号分隔"
        v-model:value="link.input"
      />
    </a-col>
    <a-col :span="12">
      <a-textarea
        placeholder="请输入输出节点，用逗号分隔"
        v-model:value="link.output"
      />
    </a-col>
    <a-col :span="24">
      <a-button
        type="primary"
        @click="link_node(link.val, link.input, link.output)"
        style="width: 100%"
      >
        链接
      </a-button>
    </a-col>
  </a-row>
</template>

<script>
import { reactive, toRefs, inject } from "vue";
import axios from "axios";
export default {
  setup() {
    axios.defaults.baseURL = "http://127.0.0.1:12345/";
    var get_list = inject("edit_get_list");
    var res = reactive({
      link: {
        val: null,
        input: null,
        output: null,
      },
    });
    var clear_link = function () {
      res.link.val = null;
      res.link.input = null;
      res.link.output = null;
    };
    var link_node = function (val, input, output) {
      input = parseInt(input);
      output = parseInt(output);
      if (isNaN(input) || isNaN(output)) {
        alert("输入/输出节点请输入整数！！！");
      } else {
        console.log(val, input, output);
        axios
          .post("story/node_link", { val: val, input: input, output: output })
          .then(function (response) {
            if (response.data.data === false) {
              alert("链接失败，输入或输出节点不存在");
            }
            get_list();
            clear_link();
          });
      }
    };
    return {
      ...toRefs(res),
      link_node,
    };
  },
};
</script>