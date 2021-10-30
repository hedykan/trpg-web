<template>
  <a-button type="primary" @click="story_selecter_delete()"> 删除 </a-button>
</template>
<script>
import axios from "axios";
import { inject } from "vue";
export default {
  props: {
    data: Object,
  },
  setup(props) {
    var get_list = inject("edit_get_list");
    var story_selecter_delete = function () {
      axios
        .post("story/selecter_delete", {
          nodeId: props.data.nodeId,
          linkId: props.data.linkId,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.data) {
            get_list();
          }
        });
    };
    return {
      story_selecter_delete,
    };
  },
};
</script>