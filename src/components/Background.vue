<template>
  <a-col :span="24">
    <a-card title="背景" style="width: 300px">
      <p>{{ data }}</p>
    </a-card>
  </a-col>
</template>
<script>
import { toRefs } from "@vue/reactivity";
export default {
  props: {
    data: String,
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
};
</script>