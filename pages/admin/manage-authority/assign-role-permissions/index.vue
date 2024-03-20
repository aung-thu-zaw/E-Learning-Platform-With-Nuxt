<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '~/components/Tables/TableContainer.vue'
import Table from '~/components/Tables/Table.vue'
import SortableTableHeaderCell from '~/components/Tables/TableCells/SortableTableHeaderCell.vue'
import TableHeaderCell from '~/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '~/components/Tables/TableCells/TableDataCell.vue'
import TableActionCell from '~/components/Tables/TableCells/TableActionCell.vue'
import NuxtLinkButton from '~/components/Buttons/NuxtLinkButton.vue'
import OrangeBadge from '~/components/Badges/OrangeBadge.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import NoTableData from '~/components/Tables/NoTableData.vue'
import Pagination from '~/components/Paginations/DashboardPagination.vue'
import { useAssignRolePermissionStore } from '~/stores/dashboard/admin/assignRolePermission'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'

useHead({ title: 'Assign Role Permissions' })

definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'admin'] })

const route = useRoute()
const store = useAssignRolePermissionStore()
const { rolesWithPermissions } = storeToRefs(store)
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => await store.getAllRoleWithPermissions(queryString.value))

watch(
  () => route.query,
  async () => await store.getAllRoleWithPermissions(queryString.value)
)
</script>

<template>
  <div class="space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb
        to="/admin/manage-authority/assign-role-permissions"
        icon="fa-shield"
        label="Assign Role Permissions"
      >
        <BreadcrumbItem label="List" />
      </Breadcrumb>
    </div>

    <!-- Table Start -->
    <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
      <div
        class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
      >
        <DashboardTableDataSearchBox placeholder="Search by role" />

        <div class="flex items-center justify-end w-full space-x-3">
          <DashboardTableDataPerPageSelectBox />
        </div>
      </div>

      <TableContainer>
        <Table :items="rolesWithPermissions?.data ?? []">
          <!-- Table Header -->
          <template #table-header>
            <SortableTableHeaderCell label="# Id" sort="id" />

            <SortableTableHeaderCell label="Role" sort="name" />

            <TableHeaderCell label="Permissions" />

            <TableHeaderCell label="Actions" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell> {{ item?.id }} </TableDataCell>

            <TableDataCell class="min-w-[150px]"> {{ item?.name }} </TableDataCell>

            <TableDataCell class="max-w-[600px]">
              <div
                v-if="item?.permissions.length"
                class="min-w-[800px] overflow-scroll flex items-center space-x-2 scrollbar"
              >
                <OrangeBadge v-for="permission in item?.permissions" :key="permission.id">
                  {{ permission.name }}
                </OrangeBadge>
              </div>
              <div v-else>
                <p class="text-orange-500 text-xs">
                  {{ item?.name }} role doesn't have any permission.
                </p>
              </div>
            </TableDataCell>

            <TableActionCell>
              <NuxtLinkButton
                v-show="can('assign-role-permissions.edit')"
                :to="
                  '/admin/manage-authority/assign-role-permissions/' +
                  item?.slug +
                  '/add-permissions'
                "
                class="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <i class="fa-solid fa-key"></i>
                {{ item?.permissions.length ? 'Change Permissions' : 'Add Permissions' }}
              </NuxtLinkButton>
            </TableActionCell>
          </template>
        </Table>
      </TableContainer>

      <div v-if="rolesWithPermissions?.data?.length" class="my-10">
        <Pagination :data="rolesWithPermissions" />
      </div>

      <NoTableData v-else />
    </div>
    <!-- Table End -->
  </div>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
