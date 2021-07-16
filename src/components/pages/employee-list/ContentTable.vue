<template>
  <div class="table-container" @selectionChanged="selectedId = $event">
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
        <tr
          v-for="employee in employees"
          :key="employee.EmployeeId"
          @click="getSelectedRow(employee.EmployeeId)"
          @dblclick="showEmployeeDetail(employee.EmployeeId)"
          :class="{ 'tr-active': employee.EmployeeId == selectedId }"
        >
          <td>{{ employee.EmployeeCode }}</td>
          <td>{{ employee.FullName }}</td>
          <td>{{ employee.GenderName }}</td>
          <td>{{ employee.DateOfBirth }}</td>
          <td>{{ employee.PhoneNumber }}</td>
          <td>{{ employee.Email }}</td>
          <td>{{ employee.PositionName }}</td>
          <td>{{ employee.DepartmentName }}</td>
          <td>{{ employee.Salary }}</td>
          <td>{{ employee.WorkStatus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import dayjs from "dayjs";
import {EventBus} from "@/js/EventBus.js"

export default {
  name: "ContentTable",
  props: {},
  created() {
    let me = this;
    axios.get("http://cukcuk.manhnv.net/v1/Employees/").then((response) => {
      response.data.forEach((value) => {
        value.DateOfBirth = dayjs(value.DateOfBirth).format("DD-MM-YYYY");
        if (value.DateOfBirth == "Invalid Date") {
          value.DateOfBirth = "Không xác định";
        }
        value.joinDate = dayjs(value.joinDate).format("DD-MM-YYYY");
        if (value.joinDate == "Invalid Date") {
          value.joinDate = "Không xác định";
        }
        if (value.Salary)
          value.Salary = value.Salary.toLocaleString().replaceAll(",", ".");
        me.employees.push(value);
      });
    });
  },
  methods: {
    getSelectedRow(employeeId) {
      this.selectedId = employeeId;
    },
    showEmployeeDetail(employeeId) {
      this.selectedId = employeeId;
      EventBus.$emit("showForm", employeeId);
    },
  },
  data() {
    return {
      employees: [],
      selectedId: String,
    };
  },
};
</script>
<style scoped>
@import "../../../css/employee-list/table.css";
</style>