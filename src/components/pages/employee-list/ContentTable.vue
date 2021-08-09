<template>
  <div class="table-container" @selectionChanged="selectedId = $event">
    <LoadingSpinner v-show="isLoading"></LoadingSpinner>
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
import dayjs from "dayjs";
import LoadingSpinner from "../../common/LoadingSpinner.vue";
import { EventBus } from "@/js/EventBus.js";
import EmployeeApi from "../../../api/EmployeeApi"
import PositionApi from "../../../api/PositionApi"
import DepartmentApi from "../../../api/DepartmentApi"

export default {
  name: "ContentTable",
  props: {},
  created() {
    this.isLoading = true;
    EmployeeApi.getAll().then((response) => {
      response.data.forEach((value) => {
        value.DateOfBirth = dayjs(value.DateOfBirth).format("DD-MM-YYYY");
        if (value.DateOfBirth == "Invalid Date") {
          value.DateOfBirth = "Không xác định";
        }
        value.joinDate = dayjs(value.joinDate).format("DD-MM-YYYY");
        if (value.joinDate == "Invalid Date") {
          value.joinDate = "Không xác định";
        }
        if (value.Salary != null)
          value.Salary = value.Salary.toLocaleString().replaceAll(",", ".");
        if (value.PositionId != null) {
          value.PositionName = this.positionData.find((opt) => {
            return opt.value == value.PositionId;
          }).text;
        }
        if (value.DepartmentId != null) {
          value.DepartmentName = this.departmentData.find((opt) => {
            return opt.value == value.DepartmentId;
          }).text;
          this.employees.push(value);
        }
      });
      this.isLoading = false;
    });
    PositionApi.getAll().then((response) => {
      response.data.forEach((e) => {
        let pos = {};
        pos.text = e.PositionName;
        pos.value = e.PositionId;
        this.positionData.push(pos);
      });
    });
    DepartmentApi.getAll().then((response) => {
      response.data.forEach((e) => {
        let dep = {};
        dep.text = e.DepartmentName;
        dep.value = e.DepartmentId;
        this.departmentData.push(dep);
      });
    });
  },
  methods: {
    getSelectedRow(employeeId) {
      this.selectedId = this.selectedId == employeeId ? "" : employeeId;
    },
    showEmployeeDetail(employeeId) {
      this.selectedId = employeeId;
      EventBus.$emit("showForm", employeeId);
    },
  },
  data() {
    return {
      employees: [],
      positionData: [],
      departmentData: [],
      selectedId: String,
      isLoading: true,
    };
  },
  components: {
    LoadingSpinner,
  },
};
</script>
<style scoped>
@import "../../../css/employee-list/table.css";
</style>