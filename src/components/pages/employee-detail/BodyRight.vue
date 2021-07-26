<template>
  <div class="body-right">
    <div class="part-title">A. THÔNG TIN CHUNG:</div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="employee-code"
          inputLabel="Mã nhân viên"
          required
          :content="data.EmployeeCode"
          @changeValue="changeValue"
        ></TextInput>
      </div>
      <div class="info-field-part">
        <TextInput
          id="full-name"
          inputLabel="Họ và tên"
          required
          :content="data.FullName"
          @changeValue="changeValue"
        ></TextInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <DateInput
          id="date-of-birth"
          inputLabel="Ngày sinh"
          :content="data.DateOfBirth"
          @changeValue="changeValue"
        ></DateInput>
      </div>
      <div class="info-field-part">
        <AutoComplete
          id="gender"
          :options="genderData"
          inputLabel="Giới tính"
          :content="data.Gender"
          @changeValue="changeValue"
        ></AutoComplete>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="identity-number"
          inputLabel="Số CMTND/Căn cước"
          required
          :content="data.IdentityNumber"
          @changeValue="changeValue"
        ></TextInput>
      </div>
      <div class="info-field-part">
        <DateInput
          id="identity-date"
          inputLabel="Ngày cấp"
          :content="data.IdentityDate"
          @changeValue="changeValue"
        ></DateInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="identity-place"
          inputLabel="Nơi cấp"
          :content="data.IdentityPlace"
          @changeValue="changeValue"
        ></TextInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="email"
          inputLabel="Email"
          required
          :content="data.Email"
          @changeValue="changeValue"
        ></TextInput>
      </div>
      <div class="info-field-part">
        <TextInput
          id="phone-number"
          inputLabel="Số điện thoại"
          required
          :content="data.PhoneNumber"
          @changeValue="changeValue"
        ></TextInput>
      </div>
    </div>
    <div class="part-title">B. THÔNG TIN CÔNG VIỆC:</div>
    <div class="info-field">
      <div class="info-field-part">
        <AutoComplete
          id="position-form"
          :options="positionData"
          inputLabel="Vị trí"
          :content="data.PositionName"
          @changeValue="changeValue"
        ></AutoComplete>
      </div>
      <div class="info-field-part">
        <AutoComplete
          id="department-form"
          :options="departmentData"
          inputLabel="Phòng ban"
          :content="data.DepartmentCode"
          @changeValue="changeValue"
        ></AutoComplete>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="personal-tax-code"
          inputLabel="Mã số thuế cá nhân"
          :content="data.PersonalTaxCode"
          @changeValue="changeValue"
        ></TextInput>
      </div>
      <div class="info-field-part">
        <TextInput
          id="salary"
          inputLabel="Mức lương cơ bản"
          :content="data.Salary"
          @changeValue="changeValue"
        ></TextInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <DateInput
          id="join-date"
          inputLabel="Ngày gia nhập công ty"
          :content="data.JoinDate"
          @changeValue="changeValue"
        ></DateInput>
      </div>
      <div class="info-field-part">
        <AutoComplete
          id="work-status"
          :options="workStatusData"
          inputLabel="Tình trạng công việc"
          :content="data.WorkStatus"
          @changeValue="changeValue"
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
  data() {
    return {
      data: {
        EmployeeCode: "",
        EmployeeId: "",
        FullName: "",
        DateOfBirth: "",
        Gender: "",
        IdentityNumber: "",
        IdentityDate: "",
        IdentityPlace: "",
        Email: "",
        PhoneNumber: "",
        PositionName: "",
        DepartmentCode: "",
        PersonalTaxCode: "",
        Salary: "",
        JoinDate: "",
        WorkStatus: "",
      },
      editMode: "post",
      newEmployeeCode: "",
      genderData: [
        { text: "Nữ", value: 0 },
        { text: "Nam", value: 1 },
        { text: "Khác", value: 2 },
      ],
      positionData: [],
      departmentData: [],
      workStatusData: [
        { text: "Số 0", value: 0 },
        { text: "Số 1", value: 1 },
        { text: "Số 2", value: 2 },
        { text: "Số 3", value: 3 },
        { text: "Số 4", value: 4 },
      ],
    };
  },
  mounted() {
    EventBus.$on("showForm", (employeeId) => {
      if (employeeId == "" || !employeeId) {
        this.editMode = "post";
        this.data.EmployeeCode = this.newEmployeeCode;
        this.data.FullName = "";
        this.data.DateOfBirth = "";
        this.data.Gender = "";
        this.data.IdentityNumber = "";
        this.data.IdentityDate = "";
        this.data.IdentityPlace = "";
        this.data.Email = "";
        this.data.PhoneNumber = "";
        this.data.PositionName = "";
        this.data.DepartmentCode = "";
        this.data.PersonalTaxCode = "";
        this.data.Salary = "";
        this.data.JoinDate = "";
        this.data.WorkStatus = "";
      } else {
        this.editMode = "put";
        axios
          .get("http://cukcuk.manhnv.net/v1/Employees/" + employeeId)
          .then((response) => {
            var e = response.data;
            this.data.EmployeeId = e.EmployeeId;
            this.data.EmployeeCode = e.EmployeeCode;
            this.data.FullName = e.FullName;
            this.data.DateOfBirth = dayjs(e.dateOfBirth).format("YYYY-MM-DD");
            if (this.data.DateOfBirth == "Invalid Date") {
              this.data.DateOfBirth = "";
            }
            console.log(e.Gender);
            if (e.Gender == "" || e.Gender == null) {
              this.data.Gender = "";
            } else {
              this.data.Gender = this.genderData.find((opt) => {
                return opt.value == e.Gender;
              }).text;
            }
            this.data.IdentityNumber = e.IdentityNumber;
            this.data.IdentityDate = dayjs(e.IdentityDate).format("YYYY-MM-DD");
            if (this.data.IdentityDate == "Invalid Date") {
              this.data.IdentityDate = "";
            }
            this.data.IdentityPlace = e.IdentityPlace;
            this.data.Email = e.Email;
            this.data.PhoneNumber = e.PhoneNumber;
            if (e.PositionName == null) {
              this.data.PositionName = "";
            } else {
              this.data.PositionName = this.positionData.find((opt) => {
                return opt.value == e.PositionCode;
              }).text;
            }
            if (e.DepartmentCode == null || e.DepartmentCode == "") {
              this.data.DepartmentCode = "";
            } else {
              this.data.DepartmentCode = this.departmentData.find((opt) => {
                return opt.value == e.DepartmentCode;
              }).text;
            }
            this.data.PersonalTaxCode = e.PersonalTaxCode;
            if (e.Salary == null) {
              this.data.Salary = "";
            } else {
              this.data.Salary = e.Salary.toString();
            }
            this.data.JoinDate = dayjs(e.JoinDate).format("YYYY-MM-DD");
            if (this.data.JoinDate == "Invalid Date") {
              this.data.JoinDate = "";
            }
            if (e.WorkStatus == "" || e.WorkStatus == null) {
              this.data.WorkStatus = "";
            } else {
              this.data.WorkStatus = this.workStatusData.find((opt) => {
                return opt.value == e.WorkStatus;
              }).text;
            }
          });
      }
    });
  },

  methods: {
    changeValue(id, newValue) {
      switch (id) {
        case "employee-code":
          this.data.EmployeeCode = newValue;
          break;
        case "full-name":
          this.data.FullName = newValue;
          break;
        case "date-of-birth":
          this.data.DateOfBirth = newValue;
          break;
        case "gender":
          this.data.Gender = newValue;
          break;
        case "identity-number":
          this.data.IdentityNumber = newValue;
          break;
        case "identity-date":
          this.data.IdentityDate = newValue;
          break;
        case "identity-place":
          this.data.IdentityPlace = newValue;
          break;
        case "email":
          this.data.Email = newValue;
          break;
        case "phone-number":
          this.data.PhoneNumber = newValue;
          break;
        case "position-form":
          this.data.PositionName = newValue;
          break;
        case "department-form":
          this.data.DepartmentCode = newValue;
          break;
        case "personal-tax-code":
          this.data.PersonalTaxCode = newValue;
          break;
        case "salary":
          this.data.Salary = newValue;
          break;
        case "join-date":
          this.data.JoinDate = newValue;
          break;
        case "work-status":
          this.data.WorkStatus = newValue;
          break;
      }
    },
  },
  created() {
    axios
      .get("http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode")
      .then((response) => {
        this.newEmployeeCode = response.data.toString();
      });
    axios.get("http://cukcuk.manhnv.net/v1/Positions").then((response) => {
      response.data.forEach((e) => {
        let pos = {};
        pos.text = e.PositionName;
        pos.value = e.PositionCode;
        this.positionData.push(pos);
      });
    });
  },
};
</script>
<style scoped>
@import "../../../css/employee-detail/body-right.css";
</style>