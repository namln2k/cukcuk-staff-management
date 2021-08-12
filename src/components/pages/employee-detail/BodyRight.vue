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
          :content="data.DepartmentName"
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
        >
        </TextInput>
        <div
          style="position: absolute; right: 10px; top: 30px; font-style: italic"
        >
          (VNĐ)
        </div>
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
import EmployeeApi from "../../../api/EmployeeApi";
import PositionApi from "../../../api/PositionApi";
import DepartmentApi from "../../../api/DepartmentApi";

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
        DepartmentName: "",
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
        { text: "Đang làm", value: 0 },
        { text: "Thực tập", value: 1 },
        { text: "Đang nghỉ phép", value: 2 },
        { text: "Đã nghỉ", value: 3 },
        { text: "Khác", value: 4 },
      ],
    };
  },
  mounted() {
    // Khi nhận được sự kiện showForm
    EventBus.$on("showForm", (employeeId) => {
      if (employeeId == "" || !employeeId) {
        // Nếu truyền vào employeeId là null hoặc ""
        // Thì là thêm mới nhân viên
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
        this.data.DepartmentName = "";
        this.data.PersonalTaxCode = "";
        this.data.Salary = "";
        this.data.JoinDate = "";
        this.data.WorkStatus = "";
      } else {
        // Nếu không thì là sửa đổi thông tin nhân viên
        this.editMode = "put";
        EmployeeApi.getById(employeeId).then((response) => {
          var e = response.data;
          this.data.EmployeeId = e.EmployeeId;
          this.data.EmployeeCode = e.EmployeeCode;
          this.data.FullName = e.FullName;
          this.data.DateOfBirth = dayjs(e.DateOfBirth).format("YYYY-MM-DD");
          if (this.data.DateOfBirth == "Invalid Date") {
            this.data.DateOfBirth = "";
          }
          if (e.Gender == null) {
            this.data.Gender = "Khác";
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
          if (e.PositionId == null) {
            this.data.PositionName = "";
          } else {
            this.data.PositionName = this.positionData.find((opt) => {
              return opt.value == e.PositionId;
            }).text;
          }
          if (e.DepartmentId == null) {
            this.data.DepartmentName = "";
          } else {
            this.data.DepartmentName = this.departmentData.find((opt) => {
              return opt.value == e.DepartmentId;
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
          if (e.Gender == null) {
            this.data.Gender = "Khác";
          } else {
            this.data.Gender = this.genderData.find((opt) => {
              return opt.value == e.Gender;
            }).text;
          }
          if (e.WorkStatus == null) {
            this.data.WorkStatus = "Khác";
          } else {
            this.data.WorkStatus = this.workStatusData.find((opt) => {
              return opt.value == e.WorkStatus;
            }).text;
          }
        });
      }
    });

    // Khi nhận được sự kiện saveForm
    EventBus.$on("saveForm", () => {
      // Lấy data
      let dataToSubmit = {};
      dataToSubmit.EmployeeCode = this.data.EmployeeCode;
      dataToSubmit.FullName = this.data.FullName;
      if (this.data.Gender == "" || this.data.Gender == null) {
        dataToSubmit.Gender = null;
      } else {
        dataToSubmit.Gender = this.genderData.find((opt) => {
          return opt.text == this.data.Gender;
        }).value;
      }
      if (this.data.DateOfBirth == "" || this.data.DateOfBirth == null) {
        dataToSubmit.DateOfBirth = null;
      } else {
        dataToSubmit.DateOfBirth = new Date(this.data.DateOfBirth)
          .toISOString()
          .slice(0, 19);
      }
      dataToSubmit.PhoneNumber = this.data.PhoneNumber;
      dataToSubmit.Email = this.data.Email;
      dataToSubmit.IdentityNumber = this.data.IdentityNumber;
      if (this.data.IdentityDate == "" || this.data.IdentityDate == null) {
        dataToSubmit.IdentityDate = null;
      } else {
        dataToSubmit.IdentityDate = new Date(this.data.IdentityDate)
          .toISOString()
          .slice(0, 19);
      }
      dataToSubmit.IdentityPlace = this.data.IdentityPlace;
      if (this.data.JoinDate == "" || this.data.JoinDate == null) {
        dataToSubmit.JoinDate = null;
      } else {
        dataToSubmit.JoinDate = new Date(this.data.JoinDate)
          .toISOString()
          .slice(0, 19);
      }
      if (this.data.PositionName == "" || this.data.PositionName == null) {
        dataToSubmit.PositionId = null;
      } else {
        dataToSubmit.PositionId = this.positionData.find((opt) => {
          return opt.text == this.data.PositionName;
        }).value;
      }
      if (this.data.DepartmentName == "" || this.data.DepartmentName == null) {
        dataToSubmit.DepartmentId = null;
      } else {
        dataToSubmit.DepartmentId = this.departmentData.find((opt) => {
          return opt.text == this.data.DepartmentName;
        }).value;
      }
      if (this.data.WorkStatus == "" || this.data.WorkStatus == null) {
        dataToSubmit.WorkStatus = null;
      } else {
        dataToSubmit.WorkStatus = this.workStatusData.find((opt) => {
          return opt.text == this.data.WorkStatus;
        }).value;
      }
      dataToSubmit.PersonalTaxCode = this.data.PersonalTaxCode;
      dataToSubmit.Salary = parseFloat(this.data.Salary);

      if (this.editMode == "post") {
        // Nếu là thêm mới nhân viên
        EmployeeApi.add(JSON.stringify(dataToSubmit)).then((response) => {
          if (response.status == 200) {
            alert("Đã thêm " + response.data + " bản ghi");
          } else {
            alert(response.userMsg);
          }
          EventBus.$emit("closeForm");
        });
      } else if (this.editMode == "put") {
        // Bổ sung thêm nội dung EmployeeId cho request
        // (Khác với tác vụ thêm nhân viên)
        dataToSubmit.EmployeeId = this.data.EmployeeId;

        console.log(JSON.stringify(dataToSubmit));

        // Nếu là sửa đổi thông tin nhân viên
        EmployeeApi.update(JSON.stringify(dataToSubmit)).then((response) => {
          console.log(response);
          EventBus.$emit("closeForm");
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
          this.data.DepartmentName = newValue;
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

    // Lấy danh sách tất cả vị trí
    PositionApi.getAll().then((response) => {
      response.data.forEach((e) => {
        let pos = {};
        pos.text = e.PositionName;
        pos.value = e.PositionId;
        this.positionData.push(pos);
      });
    });

    // Lấy danh sách tất cả phòng ban
    DepartmentApi.getAll().then((response) => {
      response.data.forEach((e) => {
        let dep = {};
        dep.text = e.DepartmentName;
        dep.value = e.DepartmentId;
        this.departmentData.push(dep);
      });
    });
  },
};
</script>
<style scoped>
@import "../../../css/employee-detail/body-right.css";
</style>