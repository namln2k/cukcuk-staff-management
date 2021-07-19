<template>
  <div class="content-item search-module">
    <div class="content-item-left">
      <div class="content-item-left-left searchbox">
        <img class="searchbox-icon" src="../../../assets/icons/search.png" />
        <input
          class="searchbox-textfield"
          placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại"
        />
      </div>
      <AutoComplete
        id="position-dropdown"
        :suggestions="positionData"
        v-model="positionSelected"
        :text="positionSelected"
      ></AutoComplete>
      <AutoComplete
        style="margin-left: 24px;"
        id="department-dropdown"
        :suggestions="departmentData"
        v-model="departmentSelected"
        :text="departmentSelected"
      ></AutoComplete>
    </div>
    <div class="content-item-right button-refresh" id="button-refresh">
      <img src="../../../assets/icons/refresh.png" />
    </div>
  </div>
</template>
<script>
import AutoComplete from "../../common/AutoComplete.vue";

export default {
  name: "SearchModule",
  components: {
    AutoComplete,
  },
  data() {
    return {
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
    };
  },
};
</script>
<style scoped>
@import "../../../css/employee-list/content.css";
</style>