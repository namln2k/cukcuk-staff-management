<template>
  <div>
    <div>
      {{ inputLabel }}
      <span v-show="required">(<span style="color: #f00">*</span>)</span>
    </div>
    <input
      v-tooltip.top="!isValidate && tooltipContent"
      :maxlength="inputSize"
      type="text"
      :id="id"
      class="info-uniform text-input"
      :class="{ 'border-red': !isValidate }"
      @input="validate($event)"
      @blur="validate($event)"
      tabindex="1"
      :value="content"
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
    content: String,
  },
  methods: {
    validate(event) {
      var val = event.target.value;
      this.$emit("changeValue", this.id, val);

      if (this.required) {
        this.isValidate = val != "" && val != null;
        this.tooltipContent = "Trường này không được để trống";
      }

      if (this.id == "email") {
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.isValidate = emailRegex.test(String(val).toLowerCase());
        if (val != "") {
          this.tooltipContent = "Email sai định dạng";
        }
      } else if (this.id == "phone-number") {
        const phoneNumberRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        this.isValidate = phoneNumberRegex.test(String(val).toLowerCase());
        if (val != "") {
          this.tooltipContent = "Số điện thoại sai định dạng";
        }
      }
    },
  },
  data() {
    return {
      tooltipContent: "",
      isValidate: true,
      inputSize: 100,
    };
  },
  created: function () {
    if (this.id == "employee-code") {
      this.inputSize = 20;
    } else if (this.id == "identity-number") {
      this.inputSize = 25;
    } else if (this.id == "identity-place") {
      this.inputSize = 255;
    } else if (this.id == "email") {
      this.inputSize = 22;
    } else if (this.id == "phone-number") {
      this.inputSize = 10;
    } else if (this.id == "personal-tax-code") {
      this.inputSize = 25;
    } else if (this.id == "salary") {
      this.inputSize = 22;
    }
  },
  computed: {},
};
</script>
<style scoped>
@import "../../css/common/info-input.css";
</style>