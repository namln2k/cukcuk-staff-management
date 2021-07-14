<template>
  <div class="content" id="content">
    <ContentHeader />
    <SearchModule />
    <ContentTable />
    <TablePagination />
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