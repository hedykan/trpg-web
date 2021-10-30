<template>
  <a-form v-bind="formItemLayoutWithOutLabel">
    <a-form-item label="节点内容" v-bind="formItemLayout">
      <a-textarea
        v-model:value="link.val"
        placeholder="请输入描述"
        style="width: 60%; margin-right: 8px"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      :label="'输入节点'"
      :rules="{
        required: true,
        message: 'input can not be null',
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="link.input.val"
        placeholder="请输入描述"
        style="width: 28%; margin-right: 8px"
      />
      <a-input
        v-model:value="link.input.id"
        placeholder="请输入节点"
        style="width: 30%; margin-right: 8px"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      :label="'输入节点'"
      :rules="{
        required: true,
        message: 'input can not be null',
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="link.output.val"
        placeholder="请输入描述"
        style="width: 28%; margin-right: 8px"
      />
      <a-input
        v-model:value="link.output.id"
        placeholder="请输入节点"
        style="width: 30%; margin-right: 8px"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="primary" @click="link_node(link.val, link.input, link.output)">链接</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { reactive, toRefs, inject } from "vue";
import axios from "axios";
export default {
  setup() {
    var formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 4,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 20,
        },
      },
    };
    var formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };
    var get_list = inject("edit_get_list");
    var res = reactive({
      link: {
        val: null,
        input: {id:null, val:null},
        output: {id:null, val:null},
      },
    });
    var clear_link = function () {
      res.link.val = null;
      res.link.input = {id:null, val:null};
      res.link.output = {id:null, val:null};
    };
    var link_node = function (val, input, output) {
      input.id = parseInt(input.id);
      output.id = parseInt(output.id);
      if (isNaN(input.id) || isNaN(output.id)) {
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
      formItemLayout,
      formItemLayoutWithOutLabel,
      ...toRefs(res),
      link_node,
    };
  },
};
</script>