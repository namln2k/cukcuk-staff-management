<template>
  <div class="table-pagination">
    <div class="pagination-left">Hiển thị 1-10/10000 nhân viên</div>
    <div class="pagination-mid">
      <a class="pagination-icon" id="pagination-firstpage">
        <img src="../../../assets/icons/btn-firstpage.svg" />
      </a>
      <a class="pagination-icon" id="pagination-prev-page">
        <img src="../../../assets/icons/btn-prev-page.svg" />
      </a>
      <a class="pagination-number active" id="pagination-1">1</a>
      <a class="pagination-number" id="pagination-2">2</a>
      <a class="pagination-number" id="pagination-3">3</a>
      <a class="pagination-number" id="pagination-4">4</a>
      <a class="pagination-number" id="pagination-5">5</a>
      <a class="pagination-number" id="pagination-6">6</a>
      <a class="pagination-icon" id="pagination-next-page">
        <img src="../../../assets/icons/btn-next-page.svg" />
      </a>
      <a class="pagination-icon" id="pagination-lastpage">
        <img src="../../../assets/icons/btn-lastpage.svg" />
      </a>
    </div>
    <div class="pagination-right">10 nhân viên/trang</div>
  </div>
</template>
<script>
export default {
  name: "TablePagination",
};
</script>
<style scoped>
@import "../../../css/employee-list/table-pagination.css";
</style>