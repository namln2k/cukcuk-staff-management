<template>
  <div class="content-item search-module">
    <div class="content-item-left">
      <div class="content-item-left-left searchbox">
        <img class="searchbox-icon" src="../../../assets/icons/search.png" />
        <input
          class="searchbox-textfield"
          placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại"
        />
      </div>
    </div>
    <div class="content-item-right button-refresh" id="button-refresh">
      <img src="../../../assets/icons/refresh.png" />
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchModule",
};
</script>
<style scoped>
@import "../../../css/employee-list/content.css";
</style>