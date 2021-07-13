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
      <div class="select-wrapper" id="select-department-page">
        <div class="select">
          <div class="select-trigger">
            <span> Tất cả phòng ban </span>
            <div class="arrow"></div>
          </div>
          <div class="options">
            <span class="option selected" value="0">
              <span class="option-left"> </span>
              <span class="option-right">Tất cả phòng ban</span>
            </span>
          </div>
        </div>
      </div>
      <div class="select-wrapper" id="select-position-page">
        <div class="select">
          <div class="select-trigger">
            <span> Tất cả vị trí </span>
            <div class="arrow"></div>
          </div>
          <div class="options">
            <span class="option selected" value="0">
              <span class="option-left"> </span>
              <span class="option-right">Tất cả vị trí</span>
            </span>
          </div>
        </div>
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