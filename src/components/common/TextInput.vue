<template>
  <div>
    <div>
      {{ inputLabel }}
      <span v-show="required">(<span style="color: #f00">*</span>)</span>
    </div>
    <input
      type="text"
      :id="id"
      class="info-uniform text-input"
      :class="{ 'border-red': !isValidate }"
      @input="validate($event)"
      @blur="validate($event)"
      tabindex="1"
      :value="text"
    />
  </div>
</template>
<script>
export default {
  name: "TextInput",
  props: {
    id: String,
    inputLabel: String,
    required: Boolean,
    text: String,
  },
  methods: {
    validate(event) {
      if (this.required) {
        this.isValidate =
          event.target.value != "" && event.target.value != null;
      }
    },
  },
  data() {
    return {
      isValidate: true,
    };
  },
};
</script>
<style scoped>
@import "../../css/common/info-input.css";
</style>