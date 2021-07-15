<template>
  <div class="form-content">
    <FormHeader></FormHeader>
    <FormBody :employeeId="employeeId"></FormBody>
    <FormFooter></FormFooter>
  </div>
</template>
<script>
import FormHeader from "./FormHeader.vue";
import FormBody from "./FormBody.vue";
import FormFooter from "./FormFooter.vue";

export default {
  name: "FormContent",
  components: {
    FormHeader,
    FormBody,
    FormFooter,
  },
  props: {
    employeeId: String,
  }
};
</script>
<style>
@import "../../../css/employee-detail/form-content.css";
</style>