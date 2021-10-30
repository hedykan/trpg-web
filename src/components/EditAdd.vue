<template>
  <a-form v-bind="formItemLayoutWithOutLabel">
    <a-form-item label="节点内容" v-bind="formItemLayout">
      <a-textarea
        v-model:value="add.val"
        placeholder="请输入描述"
        style="width: 60%; margin-right: 8px"
      />
    </a-form-item>
    <a-form-item
      v-for="(value, index) in add.input"
      :key="index"
      v-bind="index === 0 ? formItemLayout : {}"
      :label="index === 0 ? '输入节点' : ''"
      :rules="{
        required: true,
        message: 'input can not be null',
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="add.input[index].val"
        placeholder="请输入描述"
        style="width: 28%; margin-right: 8px"
      />
      <a-input
        v-model:value="add.input[index].id"
        placeholder="请输入节点"
        style="width: 30%; margin-right: 8px"
      />

      <a-button
        type="primary"
        v-if="add.input.length > 1"
        class="dynamic-delete-button"
        :disabled="add.input.length === 1"
        @click="delect_selecter(0, index)"
      >
        删除
      </a-button>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="add_selecter(0)">
        添加新节点
      </a-button>
    </a-form-item>
    <a-form-item
      v-for="(value, index) in add.output"
      :key="index"
      v-bind="index === 0 ? formItemLayout : {}"
      :label="index === 0 ? '选项节点' : ''"
      :rules="{
        required: true,
        message: 'input can not be null',
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="value.val"
        placeholder="请输入描述"
        style="width: 28%; margin-right: 8px"
      />
      <a-input
        v-model:value="value.id"
        placeholder="请输入节点"
        style="width: 30%; margin-right: 8px"
      />

      <a-button
        type="primary"
        v-if="add.output.length > 1"
        class="dynamic-delete-button"
        :disabled="add.output.length === 1"
        @click="delect_selecter(1, index)"
      >
        删除
      </a-button>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="add_selecter(1)">
        添加新节点
      </a-button>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="primary" @click="add_node(add.val, add.input, add.output)">新增</a-button>
      <Help :data="'先输入你想描述的故事，选项可以先不加'" />
    </a-form-item>
  </a-form>
</template>

<script>
import { reactive, toRefs, inject } from "vue";
import Help from "./Help.vue";
import axios from "axios";
export default {
  components: {Help},
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
    var res = reactive({
      add: {
        val: null,
        input: [{ val: "", id: null }],
        output: [{ val: "", id: null }],
      },
    });
    var get_list = inject("edit_get_list");
    var clear_add = function () {
      res.add.val = null;
      res.add.input = [{ val: "", id: null }];
      res.add.output = [{ val: "", id: null }];
    };
    var add_selecter = function (type) {
      if (type === 0) {
        res.add.input.push({ val: "", id: null });
      } else if (type === 1) {
        res.add.output.push({ val: "", id: null });
      }
    };
    var delect_selecter = function (type, id) {
      if (type === 0) {
        res.add.input.splice(id, 1);
      } else if (type === 1) {
        res.add.output.splice(id, 1);
      }
    };
    var add_node = function (val, input, output) {
      let i;
      for (i = 0; i < input.length; i++) {
        input[i].id = parseInt(input[i].id)
      }
      for (i = 0; i < output.length; i++) {
        output[i].id = parseInt(output[i].id)
      }
      console.log(val, input, output);
      axios
        .post("story/node_add", { val: val, input: input, output: output })
        .then(function (response) {
          if (response.data.data === false) {
            alert("添加失败，输入或输出节点不存在");
          }
          get_list();
          clear_add();
        });
    };
    return {
      ...toRefs(res),
      add_node,
      formItemLayoutWithOutLabel,
      formItemLayout,
      add_selecter,
      delect_selecter,
    };
  },
};
</script>