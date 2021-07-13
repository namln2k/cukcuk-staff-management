<template>
  <div class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th>Mã nhân viên</th>
          <th>Họ và tên</th>
          <th>Giới tính</th>
          <th>Ngày sinh</th>
          <th>Điện thoại</th>
          <th>Email</th>
          <th>Chức vụ</th>
          <th>Phòng ban</th>
          <th>Mức lương cơ bản</th>
          <th>Tình trạng công việc</th>
        </tr>
        <tr>
          <td>NV-023567</td>
          <td>Lê Nhật Nam</td>
          <td>Nam</td>
          <td>02-08-2000</td>
          <td>0982224444</td>
          <td>lnnam.fresher.misa@gmail.com</td>
          <td>Fresher</td>
          <td>Phòng đào tạo</td>
          <td>3000000</td>
          <td>Đang làm</td>
        </tr>
        <tr>
          <td>NV-023567</td>
          <td>Lê Nhật Nam</td>
          <td>Nam</td>
          <td>02-08-2000</td>
          <td>0982224444</td>
          <td>lnnam.fresher.misa@gmail.com</td>
          <td>Fresher</td>
          <td>Phòng đào tạo</td>
          <td>3000000</td>
          <td>Đang làm</td>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "ContentTable",
};
</script>
<style scoped>
@import "../../../libs/bootstrap/bootstrap.min.css";
@import "../../../css/employee-list/table.css";
</style>