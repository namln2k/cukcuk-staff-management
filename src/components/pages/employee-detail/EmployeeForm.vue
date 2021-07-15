<template>
  <div class="modal-background">
    <FormContent :employeeId="employeeId"></FormContent>
  </div>
</template>
<script>
import FormContent from "./FormContent.vue";

export default {
  name: "EmployeeForm",
  components: {
    FormContent,
  },
  props: {
    employeeId: String,
  }
};
</script>
<style scoped>
@import "../../../css/common/modal.css";
</style>