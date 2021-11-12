<template>
  <a-row>
    <a-col :span="12">
      <EditList :room_id="room_id" />
    </a-col>
    <a-col :span="12">
      <EditAdd :room_id="room_id" />
    </a-col>
  </a-row>
</template>
<script>
import { toRefs } from "@vue/reactivity";
import EditList from "./EditList.vue";
import EditAdd from "./EditAdd.vue";
export default {
  props: {
    room_id: String,
  },
  components: {
    EditList,
    EditAdd,
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
};
</script>