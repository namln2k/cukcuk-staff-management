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
      autocomplete="none"
      :value="content"
      @input="onInput($event)"
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
    content: String,
  },
  methods: {
    onInput(event) {
      this.$emit("changeValue", this.id, event.target.value);
    },
  }
};
</script>
<style scoped>
@import "../../css/common/info-input.css";
</style>