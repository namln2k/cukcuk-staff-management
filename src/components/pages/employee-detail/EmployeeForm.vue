<template>
  <div class="modal-background">
    <FormContent></FormContent>
  </div>
</template>
<script>
import FormContent from "./FormContent.vue";

export default {
  name: "EmployeeForm",
  components: {
    FormContent,
  },
};
</script>
<style scoped>
@import "../../../css/common/modal.css";
</style>