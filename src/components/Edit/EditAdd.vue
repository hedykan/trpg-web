<template>
  <br />
  <a-form :model="form" v-bind="layoutWithOutLabel">
    <a-form-item label="节点内容" v-bind="layout">
      <a-input v-model:value="form.val" placeholder="请输入内容" />
    </a-form-item>
    <a-form-item
      v-for="(item, index) in form.input"
      :key="index"
      v-bind="index === 0 ? layout : {}"
      :label="index === 0 ? '输入节点' : ''"
    >
      <a-space>
        <a-input placeholder="请输入描述" />
        <a-input placeholder="请输入节点号" />
        <a-button type="link" v-if="form.input.length > 1" @click="delete_input()">删除</a-button>
      </a-space>
    </a-form-item>
    <a-form-item v-bind="layoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="add_input()"> 新增节点 </a-button>
    </a-form-item>
    <a-form-item label="选择节点"> </a-form-item>
  </a-form>
</template>
<script>
import { reactive, toRefs } from "@vue/reactivity";
export default {
  props: {
    room_id: String,
  },
  setup(props) {
    const form = reactive({
      val: null,
      input: [
        {
          val: "",
          id: null,
        },
      ],
      output: [
        {
          val: "",
          id: null,
        },
      ],
    });
    const layout = {
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

    const layoutWithOutLabel = {
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

    const add_input = function () {
      form.input.push({
        val: "",
        id: null,
      });
    };
    const delete_input = function(id) {
        form.input.splice(id, 1);
    }

    return {
      ...toRefs(props),
      form,
      layout,
      layoutWithOutLabel,
      add_input,
      delete_input,
    };
  },
};
</script>