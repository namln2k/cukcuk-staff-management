<template>
  <div class="content-item search-module">
    <div class="content-item-left" v-show="!isLoading">
      <div class="content-item-left-left searchbox">
        <img class="searchbox-icon" src="../../../assets/icons/search.png" />
        <input
          tabindex="1"
          class="searchbox-textfield"
          placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại"
        />
      </div>
      <AutoComplete
        id="position-page"
        :options="positionData"
        :content="data.PositionCode"
        @changeValue="changeValue"
      ></AutoComplete>
      <AutoComplete
        style="margin-left: 18px; margin-right: 12px"
        id="department-page"
        :options="departmentData"
        :content="data.DepartmentCode"
        @changeValue="changeValue"
      ></AutoComplete>
    </div>
    <div class="content-item-right">
      <div class="button-delete" id="button-delete">
        <font-awesome-icon icon="trash-alt" />
      </div>
      <div class="button-refresh" id="button-refresh">
        <img src="../../../assets/icons/refresh.png" />
      </div>
    </div>
  </div>
</template>
<script>
import AutoComplete from "../../common/AutoComplete.vue";
import PositionApi from "../../../api/PositionApi";
import DepartmentApi from "../../../api/DepartmentApi";

export default {
  name: "SearchModule",
  components: {
    AutoComplete,
  },
  data() {
    return {
      isLoading: true,
      data: {
        PositionCode: "",
        DepartmentCode: "",
      },
      positionData: [],
      departmentData: [],
    };
  },
  methods: {
    changeValue(id, newValue) {
      if (id == "position-page") {
        this.data.PositionCode = newValue;
      } else if (id == "department-page") {
        this.data.DepartmentCode = newValue;
      }
    },
  },
  created() {
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
      this.isLoading = false;
    });
  },
};
</script>
<style scoped>
@import "../../../css/employee-list/content.css";
</style>