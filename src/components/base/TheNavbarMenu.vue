<template>
  <div class="navbar-menu" id="navbar-menu">
    <div class="navbar-menu-item">
      <img
        class="navbar-menu-icon button-icon"
        src="../../assets/icons/dashboard.png"
      />
      <div class="navbar-menu-text">Tổng quan</div>
    </div>
    <div class="navbar-menu-item">
      <img
        class="navbar-menu-icon button-icon"
        src="../../assets/icons/report.png"
      />
      <div class="navbar-menu-text">Báo cáo</div>
    </div>
    <div class="navbar-menu-item">
      <img
        class="navbar-menu-icon button-icon"
        src="../../assets/icons/dic-employee.png"
      />
      <div class="navbar-menu-text">Mua hàng</div>
    </div>
    <div class="navbar-menu-item active">
      <img
        class="navbar-menu-icon button-icon"
        src="../../assets/icons/dic-employee.png"
      />
      <div class="navbar-menu-text">Danh mục nhân viên</div>
    </div>
    <div class="navbar-menu-item">
      <img
        class="navbar-menu-icon button-icon"
        src="../../assets/icons/setting.png"
      />
      <span class="navbar-menu-text">Thiết lập hệ thống</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheNavbarMenu",
};
</script>
<style scoped>
@import "../../css/base/navbar.css";
</style>