<template>
  <div class="content-item content-header">
    <div class="content-item-left">
      <div class="table-name">Danh sách nhân viên</div>
    </div>
    <div class="content-item-right">
      <IconButton icon="add.png" text="Thêm nhân viên" @click="showNewForm(null)"></IconButton>
    </div>
  </div>
</template>
<script>
import IconButton from "../../common/IconButton.vue";
export default {
  name: "ContentHeader",
  components: {
    IconButton,
  },
  methods: {
    showNewForm(employeeId) {
      this.$emit('showBlankForm', employeeId);
    }
  }
};
</script>
<style scoped>
@import "../../../css/employee-list/content.css";
</style>