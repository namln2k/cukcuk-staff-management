<template>
  <div>
    <div>
      {{ inputLabel }}
      <span v-show="required">(<span style="color: #f00">*</span>)</span>
    </div>
    <input
      type="date"
      :id="id"
      class="info-uniform date-input"
      tabindex="1"
    />
  </div>
</template>
<script>
export default {
  name: "DateInput",
  props: {
    inputLabel: String,
    required: Boolean,
    id: String,
  },
};
</script>
<style scoped>
@import "../../css/common/info-input.css";
</style>