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
      :class="{'redborder' : !isValidate}"
      @input="validate($event)"
      @click="validate($event)"
      tabindex="1"
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
  },
  methods: {
    validate(event) {
      if (this.required) {
        this.isValidate = (event.target.value != "") && (event.target.value != null);
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