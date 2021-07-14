<template>
  <div class="header" id="page-header">
    <span class="header-item header-item-left">
      <select class="header-dropdown header-left-text">
        <option selected disabled hidden>Nhà hàng Biển Đông</option>
      </select>
    </span>
    <span class="header-item header-item-right">
      <div class="header-item-right-right">
        <img src="../../assets/icons/avatar-default.png" />
      </div>
      <div class="header-item-right-right">Lê Nhật Nam</div>
      <div class="header-item-right-right">
        <img src="../../assets/icons/option.png" />
      </div>
    </span>
  </div>
</template>
<script>
export default {
  name: "ThePageHeader",
};
</script>
<style scoped>
@import "../../css/base/page-header.css";
</style>