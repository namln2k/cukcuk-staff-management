<template>
  <div id="app">
    <EmployeeForm v-show="isFormShown"></EmployeeForm>
    <TheNavbarHeader></TheNavbarHeader>
    <TheNavbarMenu></TheNavbarMenu>
    <ThePageHeader></ThePageHeader>
    <PageContent></PageContent>
  </div>
</template>

<script>
import EmployeeForm from "./components/pages/employee-detail/EmployeeForm.vue";
import TheNavbarHeader from "./components/base/TheNavbarHeader.vue";
import TheNavbarMenu from "./components/base/TheNavbarMenu.vue";
import ThePageHeader from "./components/base/ThePageHeader.vue";
import PageContent from "./components/pages/employee-list/PageContent.vue";
import {EventBus} from "@/js/EventBus";
export default {
  name: "App",
  components: {
    EmployeeForm,
    TheNavbarHeader,
    TheNavbarMenu,
    ThePageHeader,
    PageContent,
  },
  methods: {
    
  },
  data() {
    return {
      isFormShown: false,
    };
  },
  mounted() {
    EventBus.$on("showEmployeeForm", employeeId => {
      if (!employeeId) {
        this.isFormShown = true;
      }
    });
  }
};
</script>

<style>
@import "./libs/bootstrap/bootstrap.min.css";
@import "./css/common/main.css";
</style>
