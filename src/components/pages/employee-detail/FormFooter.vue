<template>
  <div class="form-footer">
    <div class="cancel-button" id="button-cancel" @click="closeForm()">Hủy</div>
    <IconButton icon="add.png" text="Lưu" @click.native="saveForm()"/>
  </div>
</template>
<script>
import IconButton from "../../../components/common/IconButton.vue";
import {EventBus} from "@/js/EventBus";
export default {
  name: "FormFooter",
  components: {
    IconButton,
  },
  methods: {
    closeForm() {
      EventBus.$emit("closeForm");
    },
    saveForm() {
      EventBus.$emit("saveForm");
    }
  }
}
</script>
<style scoped>
@import "../../../css/employee-detail/form-footer.css";
</style>