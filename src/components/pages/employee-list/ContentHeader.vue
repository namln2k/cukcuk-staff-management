<template>
  <div class="content-item content-header">
    <div class="content-item-left">
      <div class="table-name" v-tooltip.top-center="{content: 'Trường này không được phép để trống'}">Danh sách nhân viên</div>
    </div>
    <div class="content-item-right">
      <IconButton icon="add.png" text="Thêm nhân viên" @click.native="showForm()" />
    </div>
  </div>
</template>
<script>
import IconButton from "../../common/IconButton.vue";
import {EventBus} from "@/js/EventBus";
export default {
  name: "ContentHeader",
  components: {
    IconButton,
  },
  methods: {
    showForm() {
      EventBus.$emit("showForm", "");
    }
  }
};
</script>
<style scoped>
@import "../../../css/employee-list/content.css";
</style>