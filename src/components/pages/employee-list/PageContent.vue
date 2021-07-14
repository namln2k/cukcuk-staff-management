<template>
  <div class="content" id="content">
    <ContentHeader @showBlankForm="this.$emit('showForm', employeeId)"></ContentHeader>
    <SearchModule></SearchModule>
    <ContentTable></ContentTable>
    <TablePagination></TablePagination>
  </div>
</template>
<script>
import ContentHeader from "../employee-list/ContentHeader.vue";
import SearchModule from "../employee-list/SearchModule.vue";
import ContentTable from "../employee-list/ContentTable.vue";
import TablePagination from "../employee-list/TablePagination.vue";

export default {
  name: "PageContent",
  components: {
    ContentHeader,
    SearchModule,
    ContentTable,
    TablePagination,
  },
};
</script>
<style scoped>
</style>