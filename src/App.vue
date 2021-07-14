<template>
  <div id="app">
    <TheNavbarHeader />
    <TheNavbarMenu />
    <ThePageHeader />
    <PageContent />
    <EmployeeForm />
  </div>
</template>

<script>
import TheNavbarHeader from "./components/base/TheNavbarHeader.vue";
import TheNavbarMenu from "./components/base/TheNavbarMenu.vue";
import ThePageHeader from "./components/base/ThePageHeader.vue";
import PageContent from "./components/pages/employee-list/PageContent.vue";
import EmployeeForm from "./components/pages/employee-detail/EmployeeForm.vue";

export default {
  name: "App",
  components: {
    TheNavbarHeader,
    TheNavbarMenu,
    ThePageHeader,
    PageContent,
    EmployeeForm,
  },
  methods: {
  },
  mounted() {
    this.$root.$on("showEmployeeForm", function() {
      // EmployeeForm.isShown = true;
    });
  }
};
</script>

<style>
@import "./libs/bootstrap/bootstrap.min.css";
@import "./css/common/main.css";
</style>
