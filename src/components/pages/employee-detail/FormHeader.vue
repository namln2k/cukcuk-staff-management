<template>
  <div class="form-header">
    <div class="form-title">THÔNG TIN NHÂN VIÊN</div>
    <div class="cancel-button" @click="closeForm()">
      <img src="../../../assets/icons/x.svg" />
    </div>
  </div>
</template>
<script>
import {EventBus} from "@/js/EventBus";

export default {
  name: "FormHeader",
  methods: {
    closeForm() {
      EventBus.$emit("closeForm");
    }
  }
}
</script>
<style scoped>
@import "../../../css/employee-detail/form-header.css";
</style>