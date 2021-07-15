<template>
  <div class="body-right">
    <div class="part-title">A. THÔNG TIN CHUNG:</div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="employee-code"
          inputLabel="Mã nhân viên"
          required
        ></TextInput> 
      </div>
      <div class="info-field-part">
        <TextInput
          id="employee-name"
          inputLabel="Họ và tên"
          required
        ></TextInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <DateInput id="date-of-birth" inputLabel="Ngày sinh"></DateInput>
      </div>
      <div class="info-field-part">
        <AutoComplete
          id="gender"
          :suggestions="genderData"
          v-model="genderSelected"
          inputLabel="Giới tính"
        ></AutoComplete>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="identity-number"
          inputLabel="Số CMTND/Căn cước"
          required
        ></TextInput>
      </div>
      <div class="info-field-part">
        <DateInput id="identity-date" inputLabel="Ngày cấp"></DateInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput id="identity-place" inputLabel="Nơi cấp"></TextInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput id="email" inputLabel="Email" required></TextInput>
      </div>
      <div class="info-field-part">
        <TextInput
          id="phone-number"
          inputLabel="Số điện thoại"
          required
        ></TextInput>
      </div>
    </div>
    <div class="part-title">B. THÔNG TIN CÔNG VIỆC:</div>
    <div class="info-field">
      <div class="info-field-part">
        <AutoComplete
          id="position-name"
          :suggestions="positionData"
          v-model="positionSelected"
          inputLabel="Vị trí"
        ></AutoComplete>
      </div>
      <div class="info-field-part">
        <AutoComplete
          id="department-name"
          :suggestions="departmentData"
          v-model="departmentSelected"
          inputLabel="Phòng ban"
        ></AutoComplete>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <TextInput
          id="personal-tax-code"
          inputLabel="Mã số thuế cá nhân"
        ></TextInput>
      </div>
      <div class="info-field-part">
        <TextInput id="salary" inputLabel="Mức lương cơ bản"></TextInput>
      </div>
    </div>
    <div class="info-field">
      <div class="info-field-part">
        <DateInput id="join-date" inputLabel="Ngày gia nhập công ty"></DateInput>
      </div>
      <div class="info-field-part">
        <AutoComplete
          id="work-status"
          :suggestions="workStatusData"
          v-model="workStatusSelected"
          inputLabel="Tình trạng công việc"
        ></AutoComplete>
      </div>
    </div>
  </div>
</template>
<script>
import TextInput from "../../common/TextInput.vue";
import DateInput from "../../common/DateInput.vue";
import AutoComplete from "../../common/AutoComplete.vue";

export default {
  name: "BodyRight",
  components: {
    TextInput,
    DateInput,
    AutoComplete,
  },
  props: {
    employeeId: String,
  },
  methods: {
    changeSelection(currentSelection) {
      this.genderSelected = currentSelection;
    },
  },
  data() {
    return {
      genderSelected: "",
      genderData: [
        { text: "Nữ", value: 0 },
        { text: "Nam", value: 1 },
        { text: "Khác", value: 2 },
      ],
      positionSelected: "",
      positionData: [
        { text: "Giám đốc", value: 0 },
        { text: "Trưởng phòng", value: 1 },
        { text: "Phó phòng", value: 2 },
      ],
      departmentSelected: "",
      departmentData: [
        { text: "Phòng nhân sự", value: 0 },
        { text: "Phòng đào tạo", value: 1 },
        { text: "Khối sản xuất", value: 2 },
      ],
      workStatusSelected: "",
      workStatusData: [
        { text: "Đang làm", value: 0 },
        { text: "Đã nghỉ việc", value: 1 },
        { text: "Không xác định", value: 2 },
      ],
    };
  },
};
</script>
<style scoped>
@import "../../../css/employee-detail/body-right.css";
</style>