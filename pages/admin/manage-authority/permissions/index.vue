<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '~/components/Tables/TableContainer.vue'
import Table from '~/components/Tables/Table.vue'
import SortableTableHeaderCell from '~/components/Tables/TableCells/SortableTableHeaderCell.vue'
import TableDataCell from '~/components/Tables/TableCells/TableDataCell.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import NoTableData from '~/components/Tables/NoTableData.vue'
import Pagination from '~/components/Paginations/DashboardPagination.vue'
import { usePermissionStore } from '~/stores/dashboard/admin/permission'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'

useHead({ title: 'Permissions' })

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const store = usePermissionStore()
const { permissions } = storeToRefs(store)
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => await store.getAllPermission(queryString.value))

watch(
  () => route.query,
  async () => await store.getAllPermission(queryString.value)
)
</script>

<template>
  <div class="space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/manage-authority/permissions" icon="fa-shield" label="Permissions">
        <BreadcrumbItem label="List" />
      </Breadcrumb>
    </div>

    <!-- Table Start -->
    <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
      <div
        class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
      >
        <DashboardTableDataSearchBox placeholder="Search by group or permission" />

        <div class="flex items-center justify-end w-full space-x-3">
          <DashboardTableDataPerPageSelectBox />
        </div>
      </div>

      <TableContainer>
        <Table :items="permissions?.data ?? []">
          <!-- Table Header -->
          <template #table-header>
            <SortableTableHeaderCell label="# Id" sort="id" />

            <SortableTableHeaderCell label="Group" sort="group" />

            <SortableTableHeaderCell label="Permission" sort="name" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell> {{ item?.id }} </TableDataCell>

            <TableDataCell>
              {{ item?.group }}
            </TableDataCell>

            <TableDataCell>
              {{ item?.name }}
            </TableDataCell>
          </template>
        </Table>
      </TableContainer>

      <div v-if="permissions?.data?.length" class="my-10">
        <Pagination :data="permissions" />
      </div>

      <NoTableData v-else />
    </div>
    <!-- Table End -->
  </div>
</template>
