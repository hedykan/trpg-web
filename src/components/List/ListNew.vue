<template>
  <a-row>
    <a-col :span="6">
      <div :style="{ width: '90%' }">
        <ListBackground :room_id="room_id" />
        <ListVote :room_id="room_id" />
      </div>
    </a-col>
    <a-col :span="18">
      <ListStory :room_id="room_id" />
    </a-col>
  </a-row>
</template>
<script>
import { toRefs } from "@vue/reactivity";
import ListStory from "./ListStory.vue";
import ListBackground from "./ListBackground.vue";
import ListVote from "./ListVote.vue";
export default {
  props: {
    room_id: String,
  },
  components: {
    ListStory,
    ListBackground,
    ListVote,
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
};
</script>