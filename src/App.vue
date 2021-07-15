<template>
  <div id="app">
    <TheNavbarHeader></TheNavbarHeader>
    <TheNavbarMenu></TheNavbarMenu>
    <ThePageHeader></ThePageHeader>
    <PageContent></PageContent>
    <EmployeeForm
      :employeeId="employeeId"
      :class="isFormShown ? 'is-displayed' : ''"
    ></EmployeeForm>
  </div>
</template>

<script>
import TheNavbarHeader from "./components/base/TheNavbarHeader.vue";
import TheNavbarMenu from "./components/base/TheNavbarMenu.vue";
import ThePageHeader from "./components/base/ThePageHeader.vue";
import PageContent from "./components/pages/employee-list/PageContent.vue";
import EmployeeForm from "./components/pages/employee-detail/EmployeeForm.vue";
import { EventBus } from "@/js/EventBus";

export default {
  name: "App",
  components: {
    EmployeeForm,
    TheNavbarHeader,
    TheNavbarMenu,
    ThePageHeader,
    PageContent,
  },
  methods: {},
  data() {
    return {
      isFormShown: false,
      employeeId: null,
    };
  },
  mounted() {
    EventBus.$on("showForm", (employeeId) => {
      this.employeeId = employeeId;
      this.isFormShown = true;
    });
    EventBus.$on("closeForm", () => {
      this.isFormShown = false;
    });
  },
};
</script>

<style>
@import "./libs/bootstrap/bootstrap.min.css";
@import "./css/common/main.css";
</style>
