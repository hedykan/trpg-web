<template>
  <EditList :room_id="room_id"/>
</template>
<script>
import { toRefs } from "@vue/reactivity";
import EditList from "./EdiList.vue"
export default {
  props: {
    room_id: String,
  },
  components: {
    EditList,
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
};
</script>