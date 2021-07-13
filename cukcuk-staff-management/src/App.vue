<template>
  <div id="app">
    <TheNavbarHeader></TheNavbarHeader>
    <TheNavbarMenu></TheNavbarMenu>
    <ThePageHeader></ThePageHeader>
    <PageContent @showForm="showBlankForm(employeeId)"></PageContent>
    <EmployeeForm></EmployeeForm>
  </div>
</template>

<script>
import TheNavbarHeader from './components/base/TheNavbarHeader.vue'
import TheNavbarMenu from './components/base/TheNavbarMenu.vue'
import ThePageHeader from './components/base/ThePageHeader.vue'
import PageContent from './components/pages/employee-list/PageContent.vue'
import EmployeeForm from './components/pages/employee-detail/EmployeeForm.vue'

export default {
  name: 'App',
  components: {
    TheNavbarHeader,
    TheNavbarMenu,
    ThePageHeader,
    PageContent,
    EmployeeForm
  },
  methods: {
    showBlankForm(employeeId) {
      console.log(employeeId);
    }
  }
}


</script>

<style>
  @import "./css/common/main.css";
</style>
