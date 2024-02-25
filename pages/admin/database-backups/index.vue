<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '~/components/Tables/TableContainer.vue'
import Table from '~/components/Tables/Table.vue'
import TableHeaderCell from '~/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '~/components/Tables/TableCells/TableDataCell.vue'
import TableActionCell from '~/components/Tables/TableCells/TableActionCell.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import GreenBadge from '~/components/Badges/GreenBadge.vue'
import RedBadge from '~/components/Badges/RedBadge.vue'
import Pagination from '~/components/Paginations/DashboardPagination.vue'
import { useBackupStore } from '~/stores/dashboard/admin/backup'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'

useHead({ title: 'Database Backups' })

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const store = useBackupStore()
const { backups, overallInformation } = storeToRefs(store)
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => await store.getAllBackup(queryString.value))

watch(
  () => route.query,
  async () => await store.getAllBackup(queryString.value)
)
</script>

<template>
  <div class="space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/database-backups" icon="fa-database" label="Database Backups">
        <BreadcrumbItem label="List" />
      </Breadcrumb>
    </div>

    <div class="border bg-white rounded-md shadow px-5 pt-6 mb-5">
      <TableContainer>
        <Table :items="overallInformation ? [overallInformation] : []">
          <!-- Table Header -->
          <template #table-header>
            <TableHeaderCell label="Disk" />

            <TableHeaderCell label="Disk Health" />

            <TableHeaderCell label="Total Backups" />

            <TableHeaderCell label="Last Time Backup" />

            <TableHeaderCell label="Used Storage" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell>
              {{ item?.disk }}
            </TableDataCell>
            <TableDataCell>
              <GreenBadge v-show="item.health === 'Healthy'">
                <i class="fa-solid fa-circle-check"></i>
                {{ item.health }}
              </GreenBadge>
              <RedBadge v-show="item.health === 'Not Healthy'">
                <i class="fa-solid fa-circle-xmar"></i>
                {{ item.health }}
              </RedBadge>
            </TableDataCell>

            <TableDataCell>
              {{ item?.amountOfBackups }}
            </TableDataCell>

            <TableDataCell>
              {{ item?.lastTimeBackup }}
            </TableDataCell>

            <TableDataCell>
              {{ item?.usedBackupStorage }}
            </TableDataCell>
          </template>
        </Table>
      </TableContainer>
    </div>

    <!-- Table Start -->
    <div
      class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-5 pt-10"
    >
      <div
        class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
      >
        <!-- Create Button -->
        <div v-show="can('database-backups.create')" class="flex items-center mb-3 w-full">
          <NormalButton @click="store.createBackup">
            <i class="fa-solid fa-file-circle-plus mr-1"></i>
            Create A New Backup
          </NormalButton>
        </div>

        <div class="flex items-center justify-end w-full space-x-3">
          <DashboardTableDataPerPageSelectBox />
        </div>
      </div>

      <TableContainer>
        <Table :items="backups ? backups?.data : {}">
          <!-- Table Header -->
          <template #table-header>
            <TableHeaderCell label="Location" />

            <TableHeaderCell label="File Name" />

            <TableHeaderCell label="Size" />

            <TableHeaderCell label="Created At" />

            <TableHeaderCell label="Actions" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell>
              {{ item?.location }}
            </TableDataCell>

            <TableDataCell>
              <div class="min-w-[200px]">
                {{ item?.filename }}
              </div>
            </TableDataCell>

            <TableDataCell>
              <div class="min-w-[100px]">
                {{ item?.size }}
              </div>
            </TableDataCell>

            <TableDataCell>
              <div class="min-w-[250px]">
                {{ item?.date }}
              </div>
            </TableDataCell>

            <TableActionCell>
              <NormalButton
                v-show="can('database-backups.download')"
                class="bg-yellow-600 hover:bg-yellow-700 text-white"
                @click="store.downloadBackup(item.filename)"
              >
                <i class="fa-solid fa-download"></i>
                Download
              </NormalButton>

              <NormalButton
                v-show="can('database-backups.delete')"
                class="bg-red-600 hover:bg-red-700 text-white"
                @click="store.deleteBackup(item.filename)"
              >
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </NormalButton>
            </TableActionCell>
          </template>
        </Table>
      </TableContainer>

      <div class="my-10">
        <Pagination :data="backups" />
      </div>

      <!-- <NoTableData v-else /> -->
    </div>
    <!-- Table End -->
  </div>
</template>
