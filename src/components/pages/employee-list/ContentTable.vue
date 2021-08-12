<template>
  <div class="table-container">
    <LoadingSpinner v-show="isLoading"></LoadingSpinner>
    <table class="my-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              @click="toggleSelectAll"
              v-model="selectAll"
            />
          </th>
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
          @click="getSelectedRow(employee)"
          @dblclick="showEmployeeDetail(employee.EmployeeId)"
          :class="{ 'tr-active': employee.checked }"
        >
          <td>
            <input type="checkbox" v-model="employee.checked" />
          </td>
          <td>{{ employee.EmployeeCode }}</td>
          <td>{{ employee.FullName }}</td>
          <td>{{ employee.GenderName }}</td>
          <td>{{ employee.DateOfBirth }}</td>
          <td>{{ employee.PhoneNumber }}</td>
          <td>{{ employee.Email }}</td>
          <td>{{ employee.PositionName }}</td>
          <td>{{ employee.DepartmentName }}</td>
          <td>{{ employee.Salary }}</td>
          <td>{{ employee.WorkStatusName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import dayjs from "dayjs";
import LoadingSpinner from "../../common/LoadingSpinner.vue";
import { EventBus } from "@/js/EventBus.js";
import EmployeeApi from "../../../api/EmployeeApi";
import PositionApi from "../../../api/PositionApi";
import DepartmentApi from "../../../api/DepartmentApi";

export default {
  name: "ContentTable",
  props: {},
  computed: {},
  created() {
    // Lấy danh sách nhân viên
    this.getAllEmployee();

    // Lấy danh sách vị trí
    PositionApi.getAll().then((response) => {
      response.data.forEach((e) => {
        let pos = {};
        pos.text = e.PositionName;
        pos.value = e.PositionId;
        this.positionData.push(pos);
      });
    });

    // Lấy danh sách phòng ban
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
    // Dòng đang được click vào
    // getSelectedRow(employeeId) {
    //   if (!this.selectedIds.has(employeeId)) {
    //     this.selectedIds.add(employeeId);
    //   }
    //   else {
    //     this.selectedIds.delete(employeeId);
    //   }
    // },

    // Mở form chi tiết thông tin nhân viên
    showEmployeeDetail(employeeId) {
      EventBus.$emit("showForm", employeeId);
    },

    // Lấy danh sách nhân viên
    getAllEmployee() {
      this.isLoading = true;
      EmployeeApi.getAll().then((response) => {
        this.employees = [];
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
          }
          if (value.WorkStatus != null) {
            value.WorkStatusName = this.workStatusData.find((opt) => {
              return opt.value == value.WorkStatus;
            }).text;
          } else {
            value.WorkStatusName = "";
          }
          if (value.Gender != null) {
            value.GenderName = this.genderData.find((opt) => {
              return opt.value == value.Gender;
            }).text;
          } else {
            value.GenderName = "";
          }
          value.checked = false;
          this.employees.push(value);
        });
        this.isLoading = false;
      });
    },

    toggleSelectAll() {
      this.selectAll = !this.selectAll;
      this.employees.forEach((e) => {
        e.checked = this.selectAll;
      });
    },

    getSelectedRow(employee) {
      employee.checked = !employee.checked;
      this.selectAll = this.employees.every((e) => {
        return e.checked;
      });
    },
  },
  data() {
    return {
      employees: [],
      positionData: [],
      departmentData: [],
      workStatusData: [
        { text: "Đang làm", value: 0 },
        { text: "Thực tập", value: 1 },
        { text: "Đang nghỉ phép", value: 2 },
        { text: "Đã nghỉ", value: 3 },
        { text: "Khác", value: 4 },
      ],
      genderData: [
        { text: "Nữ", value: 0 },
        { text: "Nam", value: 1 },
        { text: "Khác", value: 2 },
      ],
      isLoading: true,
      selectAll: false,
    };
  },
  mounted() {
    EventBus.$on("deleteEmployee", () => {
      let rowsDeleted = 0;
      var selectedEmployees = this.employees.filter((e) => e.checked);
      selectedEmployees.forEach(e => {
        EmployeeApi.delete(e.EmployeeId).then((response) => {
          if (response.status == 200) {
            rowsDeleted++;
          } else {
            alert(response.userMsg);
            return;
          }
        })
      })
      alert("Đã xóa " + rowsDeleted + " bản ghi!");
      this.getAllEmployee();
      EventBus.$emit("closeForm");
    });
  },
  components: {
    LoadingSpinner,
  },
};
</script>
<style scoped>
@import "../../../css/employee-list/table.css";
</style>