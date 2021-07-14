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
      </thead>
      <tbody>
          <tr v-for="employee in employees" :key="employee.EmployeeId">
            <td>{{employee.EmployeeCode}}</td>
            <td>{{employee.FullName}}</td>
            <td>{{employee.GenderName}}</td>
            <td>{{employee.DateOfBirth}}</td>
            <td>{{employee.PhoneNumber}}</td>
            <td>{{employee.Email}}</td>
            <td>{{employee.PositionName}}</td>
            <td>{{employee.DepartmentName}}</td>
            <td>{{employee.Salary}}</td>
            <td>{{employee.WorkStatus}}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "ContentTable",
  props: {

  },
  created() {
    let me = this;
    axios.get("http://cukcuk.manhnv.net/v1/Employees/").then((response) => {
      response.data.forEach((value) => {
        value.DateOfBirth = dayjs(value.DateOfBirth).format('DD-MM-YYYY');
        if (value.DateOfBirth == "Invalid Date") {
          value.DateOfBirth = "Không xác định";
        }
        if (value.Salary)
          value.Salary = value.Salary.toLocaleString().replaceAll(",", ".");
        
        me.employees.push(value);
      })
    })
  },
  methods: {

  },
  data() {
    return {
      employees: [],
    };
  }
};
</script>
<style scoped>
@import "../../../css/employee-list/table.css";
</style>