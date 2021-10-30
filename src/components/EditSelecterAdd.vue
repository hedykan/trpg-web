<template>
  <a-button type="primary" @click="show_selecter_edit_drawer">
    新增链接
  </a-button>
  <a-drawer
    title="新增链接"
    placement="left"
    :closable="false"
    v-model:visible="edit_selecter_visible"
  >
    <a-input
      v-model:value="add.link_id"
      placeholder="请输入节点号"
      style="width: 100%; margin-right: 8px"
    />
    <br>
    <a-input
      v-model:value="add.val"
      placeholder="请输入描述"
      style="width: 100%; margin-right: 8px"
    />
    <br>
    <a-button type="primary" @click="story_selecter_add(add.link_id, add.val)">新增</a-button>
  </a-drawer>
</template>
<script>
import { ref, inject, reactive } from "vue";
import axios from "axios";
export default {
  props: {
    data: Object,
  },
  setup(props) {
    var get_list = inject("edit_get_list");
    var edit_selecter_visible = ref(false);
    var show_selecter_edit_drawer = function () {
      edit_selecter_visible.value = true;
    };
    var add = reactive({
      link_id: null,
      val: null,
    });
    var story_selecter_add = function (link_id, val) {
      axios
        .post("story/selecter_add", {
          nodeId: props.data.Id,
          linkId: parseInt(link_id),
          val: val,
        })
        .then(function () {
          get_list();
          add.link_id = null;
          add.val = null;
          edit_selecter_visible.value = false;
          alert("新增成功")
        });
    };
    return {
      get_list,
      edit_selecter_visible,
      add,
      show_selecter_edit_drawer,
      story_selecter_add,
    };
  },
};
</script>