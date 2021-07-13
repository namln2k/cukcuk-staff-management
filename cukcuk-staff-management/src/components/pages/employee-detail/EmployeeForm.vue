<template>
  <div class="form-hidden">
    <Modal>
      <FormContent></FormContent>
    </Modal>
  </div>
</template>
<script>
import Modal from "../../common/Modal.vue";
import FormContent from "./FormContent.vue";

export default {
  name: "EmployeeForm",
  components: {
    Modal,
    FormContent,
  },
};
</script>
<style scoped>
</style>