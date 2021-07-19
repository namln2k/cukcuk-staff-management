<template>
  <div class="body-right">
    <div class="part-title">A. THÔNG TIN CHUNG:</div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="employee-code"
          inputLabel="Mã nhân viên"
          required
          v-model="employeeCode"
          :text="employeeCode"
        ></TextInput>
      </div>
      <div class="info-field-part">
        <TextInput
          id="employee-name"
          inputLabel="Họ và tên"
          required
          v-model="employeeName"
          :text="employeeName"
        ></TextInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <DateInput
          id="date-of-birth"
          inputLabel="Ngày sinh"
          :text="dateOfBirth"
        ></DateInput>
      </div>
      <div class="info-field-part">
        <AutoComplete
          id="gender"
          :options="genderData"
          v-model="genderValue"
          inputLabel="Giới tính"
          :text="genderText"
          :value="genderValue"
        ></AutoComplete>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="identity-number"
          inputLabel="Số CMTND/Căn cước"
          required
          v-model="identityNumber"
          :text="identityNumber"
        ></TextInput>
      </div>
      <div class="info-field-part">
        <DateInput
          id="identity-date"
          inputLabel="Ngày cấp"
          v-model="identityDate"
          :text="identityDate"
        ></DateInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="identity-place"
          inputLabel="Nơi cấp"
          v-model="identityPlace"
          :text="identityPlace"
        ></TextInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="email"
          inputLabel="Email"
          required
          v-model="email"
          :text="email"
        ></TextInput>
      </div>
      <div class="info-field-part">
        <TextInput
          id="phone-number"
          inputLabel="Số điện thoại"
          required
          v-model="phoneNumber"
          :text="phoneNumber"
        ></TextInput>
      </div>
    </div>
    <div class="part-title">B. THÔNG TIN CÔNG VIỆC:</div>
    <div class="info-field">
      <div class="info-field-part">
        <AutoComplete
          id="position-name"
          :options="positionData"
          v-model="positionValue"
          inputLabel="Vị trí"
          :value="positionValue"
          :text="positionText"
        ></AutoComplete>
      </div>
      <div class="info-field-part">
        <AutoComplete
          id="department-name"
          :options="departmentData"
          v-model="departmentValue"
          inputLabel="Phòng ban"
          :value="departmentValue"
          :text="departmentText"
        ></AutoComplete>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="personal-tax-code"
          inputLabel="Mã số thuế cá nhân"
          v-model="personalTaxCode"
          :text="personalTaxCode"
        ></TextInput>
      </div>
      <div class="info-field-part">
        <TextInput
          id="salary"
          inputLabel="Mức lương cơ bản"
          v-model="salary"
          :text="salary"
        ></TextInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <DateInput
          id="join-date"
          inputLabel="Ngày gia nhập công ty"
          v-model="joinDate"
          :text="joinDate"
        ></DateInput>
      </div>
      <div class="info-field-part">
        <AutoComplete
          id="work-status"
          :options="workStatusData"
          v-model="workStatusValue"
          inputLabel="Tình trạng công việc"
          :value="workStatusValue"
          :text="workStatusText"
        ></AutoComplete>
      </div>
    </div>
  </div>
</template>
<script>
import TextInput from "../../common/TextInput.vue";
import DateInput from "../../common/DateInput.vue";
import AutoComplete from "../../common/AutoComplete.vue";
import { EventBus } from "@/js/EventBus.js";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "BodyRight",
  components: {
    TextInput,
    DateInput,
    AutoComplete,
  },
  methods: {
    
  },
  data() {
    return {
      editMode: "post",
      newEmployeeCode: "",
      employeeId: "",
      employeeCode: "",
      employeeName: "",
      dateOfBirth: "",
      genderValue: "",
      genderText: "",
      genderData: [
        { text: "Nữ", value: 0 },
        { text: "Nam", value: 1 },
        { text: "Khác", value: 2 },
      ],
      identityNumber: "",
      identityDate: "",
      identityPlace: "",
      email: "",
      phoneNumber: "",
      positionValue: "",
      positionText: "",
      positionData: [
        { text: "Giám đốc", value: 0 },
        { text: "Trưởng phòng", value: 1 },
        { text: "Phó phòng", value: 2 },
      ],
      departmentValue: "",
      departmentText: "",
      departmentData: [
        { text: "Phòng nhân sự", value: 0 },
        { text: "Phòng đào tạo", value: 1 }, 
        { text: "Khối sản xuất", value: 2 },
      ],
      personalTaxCode: "",
      salary: "",
      joinDate: "",
      workStatusValue: "",
      workStatusText: "",
      workStatusData: [
        { text: "Số 0", value: 0 },
        { text: "Số 1", value: 1 },
        { text: "Số 2", value: 2 },
      ],
    };
  },
  mounted() {
    EventBus.$on("showForm", (employeeId) => {
      this.employeeId = employeeId;
      if (employeeId == "" || !employeeId) {
        this.editMode = "post";
        this.employeeCode = this.newEmployeeCode;
        this.employeeName = "";
        this.dateOfBirth = "";
        this.genderText = "";
        this.genderValue = "";
        this.identityNumber = "";
        this.identityDate = "";
        this.identityPlace = "";
        this.email = "";
        this.phoneNumber = "";
        this.positionText = "";
        this.positionValue = "";
        this.departmentText = "";
        this.departmentValue = "";
        this.personalTaxCode = "";
        this.salary = "";
        this.joinDate = "";
        this.workStatusText = "";
        this.workStatusValue = "";
      } else {
        this.editMode = "put";
        axios
          .get("http://cukcuk.manhnv.net/v1/Employees/" + employeeId)
          .then((response) => {
            var data = response.data;
            this.employeeId = data.EmployeeId;
            this.employeeCode = data.EmployeeCode;
            this.employeeName = data.FullName;
            this.dateOfBirth = data.DateOfBirth;
            this.dateOfBirth = dayjs(data.dateOfBirth).format("YYYY-MM-DD");
            if (this.dateOfBirth == "Invalid Date") {
              this.dateOfBirth = "";
            }
            this.genderValue = data.Gender.toString();
            this.genderText = data.GenderName;
            if (!this.genderText) {
              this.genderValue = "";
              this.genderText = "";
            }
            this.identityNumber = data.IdentityNumber;
            this.identityDate = data.IdentityDate;
            this.identityDate = dayjs(this.identityDate).format("YYYY-MM-DD");
            if (this.identityDate == "Invalid Date") {
              this.identityDate = "";
            }
            this.identityPlace = data.IdentityPlace;
            this.email = data.Email;
            this.phoneNumber = data.PhoneNumber;
            this.positionValue = data.PositionCode;
            this.positionText = data.PositionName;
            if (!this.positionText) {
              this.positionValue = "";
              this.positionText = "";
            }
            this.departmentValue = data.DepartmentCode;
            this.departmentText = data.DepartmentName;
            if (!this.departmentText) {
              this.departmentValue = "";
              this.departmentText = "";
            }
            this.personalTaxCode = data.PersonalTaxCode;
            this.salary = data.Salary;
            if (!this.salary) {
              this.salary = "";
            } else {
              this.salary = this.salary.toString();
            }
            this.joinDate = data.JoinDate;
            this.joinDate = dayjs(this.joinDate).format("YYYY-MM-DD");
            if (this.joinDate == "Invalid Date") {
              this.joinDate = "";
            }
            this.workStatusValue = data.WorkStatus.toString();
            this.workStatusText = data.WorkStatus.toString();
            if (!this.workStatusText) {
              this.workStatusValue = "";
              this.workStatusText = "";
            }
          });
      }
    });
    // EventBus.$on("saveForm", () => {
    //   if (this.editMode == "post") {

    //   } else {
        
    //   }
    // });
  },
  created() {
    axios
      .get("http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode")
      .then((response) => {
        this.newEmployeeCode = response.data.toString();
      });
  },
};
</script>
<style scoped>
@import "../../../css/employee-detail/body-right.css";
</style>