<template>
  <div :style="{ width: '90%' }">
    <a-col :span="24" v-if="!mobile_status">
      <a-card title="背景">
        <p>{{ data }}</p>
      </a-card>
    </a-col>
  </div>
  <div v-if="mobile_status">
    <a-affix :offset-top="top">
      <a-button type="primary" @click="show_drawer">背景</a-button>
    </a-affix>
    <a-drawer
      title="背景"
      placement="right"
      :closable="false"
      v-model:visible="visible"
    >
      <p>{{ data }}</p>
    </a-drawer>
  </div>
</template>
<script>
import { toRefs, ref } from "@vue/reactivity";
export default {
  props: {
    data: String,
    mobile_status: Boolean,
  },
  setup(props) {
    var visible = ref(false);
    var top = ref(100);
    var show_drawer = function () {
      visible.value = true;
    };
    return {
      ...toRefs(props),
      visible,
      show_drawer,
      top,
    };
  },
};
</script>