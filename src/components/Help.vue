<template>
  <a-popover title="说明" trigger="hover">
    <template #content>
      <p>{{ data }}</p>
    </template>
    <a-button>说明</a-button>
  </a-popover>
</template>
<script>
export default {
  props: {
    data: String,
  },
  setup(props) {
    console.log(props);
    return props.data;
  },
};
</script>