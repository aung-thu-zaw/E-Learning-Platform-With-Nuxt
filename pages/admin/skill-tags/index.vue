<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import NuxtLinkButton from '~/components/Buttons/NuxtLinkButton.vue'
import TableContainer from '~/components/Tables/TableContainer.vue'
import Table from '~/components/Tables/Table.vue'
import SortableTableHeaderCell from '~/components/Tables/TableCells/SortableTableHeaderCell.vue'
import TableHeaderCell from '~/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '~/components/Tables/TableCells/TableDataCell.vue'
import TableActionCell from '~/components/Tables/TableCells/TableActionCell.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import NoTableData from '~/components/Tables/NoTableData.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import Pagination from '~/components/Paginations/DashboardPagination.vue'
import { useSkillTagStore } from '~/stores/dashboard/admin/skillTag'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'

useHead({ title: 'Skill Tags' })

definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'admin'] })

const route = useRoute()
const store = useSkillTagStore()
const { tags } = storeToRefs(store)
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => await store.getAllTag(queryString.value))

watch(
  () => route.query,
  async () => await store.getAllTag(queryString.value)
)
</script>

<template>
  <div class="space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/skill-tags" icon="fa-tag" label="Skill Tags">
        <BreadcrumbItem label="List" />
      </Breadcrumb>

      <!-- Create Button -->
      <div v-show="can('tags.create')" class="flex items-center justify-end mb-3">
        <NuxtLinkButton to="/admin/skill-tags/create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Create Tag
        </NuxtLinkButton>
      </div>
    </div>

    <!-- Table Start -->
    <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
      <div
        class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
      >
        <DashboardTableDataSearchBox placeholder="Search by category, subcategory or tag" />

        <div class="flex items-center justify-end w-full space-x-3">
          <DashboardTableDataPerPageSelectBox />
        </div>
      </div>

      <TableContainer>
        <Table :items="tags?.data ?? []">
          <!-- Table Header -->
          <template #table-header>
            <SortableTableHeaderCell label="# Id" sort="id" />

            <TableHeaderCell label="Category" />

            <TableHeaderCell label="Subcategory" />

            <SortableTableHeaderCell label="Tag" sort="name" />

            <TableHeaderCell label="Actions" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell> {{ item?.id }} </TableDataCell>

            <TableDataCell> {{ item?.category?.name }} </TableDataCell>

            <TableDataCell> {{ item?.subcategory?.name }} </TableDataCell>

            <TableDataCell> {{ item?.name }} </TableDataCell>

            <TableActionCell>
              <NuxtLinkButton
                v-show="can('tags.edit')"
                :to="'/admin/skill-tags/' + item?.slug + '/edit'"
              >
                <i class="fa-solid fa-edit"></i>
                Edit
              </NuxtLinkButton>

              <NormalButton
                v-show="can('tags.delete')"
                class="bg-red-600 hover:bg-red-700 text-white"
                @click="store.deleteTag(item?.slug)"
              >
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </NormalButton>
            </TableActionCell>
          </template>
        </Table>
      </TableContainer>

      <div v-if="tags?.data?.length" class="my-10">
        <Pagination :data="tags" />
      </div>

      <NoTableData v-else />
    </div>
    <!-- Table End -->
  </div>
</template>
