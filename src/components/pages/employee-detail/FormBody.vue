<template>
  <div class="form-body">
    <div class="body-left">
      <img class="avatar" src="../../../assets/imgs/default-avatar.jpg" />
      <div class="text">
        (Vui lòng chọn ảnh có định dạng <br />
        .jpg, .jpeg, .png, .gif.)
      </div>
    </div>
    <BodyRight :employeeId="employeeId"></BodyRight>
  </div>
</template>
<script>
import BodyRight from "../../pages/employee-detail/BodyRight.vue"

export default {
  name: "FormBody",
  components: {
    BodyRight,
  },
  props: {
    employeeId: String,
  }
}
</script>
<style scoped>
@import "../../../css/employee-detail/form-body.css";
</style>