<template>
  <div class="icon-button">
    <span class="button-icon"><img :src = "require(`../../assets/icons/${icon}`)" /></span>
    <span class="button-text">{{text}}</span>
  </div>
</template>
<script>
export default {
  name: "IconButton",
  props: {
    icon: String,
    text: String,
  },
};
</script>
<style scoped>
@import "../../css/common/button.css";
</style>