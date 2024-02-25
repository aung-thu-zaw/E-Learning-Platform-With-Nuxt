<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import NuxtLinkButton from '~/components/Buttons/NuxtLinkButton.vue'
import TableContainer from '~/components/Tables/TableContainer.vue'
import Table from '~/components/Tables/Table.vue'
import SortableTableHeaderCell from '~/components/Tables/TableCells/SortableTableHeaderCell.vue'
import TableHeaderCell from '~/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '~/components/Tables/TableCells/TableDataCell.vue'
import TableImageCell from '~/components/Tables/TableCells/TableImageCell.vue'
import TableActionCell from '~/components/Tables/TableCells/TableActionCell.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import NoTableData from '~/components/Tables/NoTableData.vue'
import TableToggleCell from '~/components/Tables/TableCells/TableToggleCell.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import Pagination from '~/components/Paginations/DashboardPagination.vue'
import { useSliderStore } from '~/stores/dashboard/admin/slider'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'

useHead({ title: 'Sliders' })

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const store = useSliderStore()
const { sliders } = storeToRefs(store)
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => await store.getAllSlider(queryString.value))

watch(
  () => route.query,
  async () => await store.getAllSlider(queryString.value)
)
</script>

<template>
  <div class="space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/sliders" icon="fa-sliders" label="Sliders">
        <BreadcrumbItem label="List" />
      </Breadcrumb>

      <!-- Create Button -->
      <div v-show="can('sliders.create')" class="flex items-center justify-end mb-3">
        <NuxtLinkButton to="/admin/sliders/create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Create Slider
        </NuxtLinkButton>
      </div>
    </div>

    <!-- Table Start -->
    <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
      <div
        class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
      >
        <DashboardTableDataSearchBox placeholder="Search by title" />

        <div class="flex items-center justify-end w-full space-x-3">
          <DashboardTableDataPerPageSelectBox />
        </div>
      </div>

      <TableContainer>
        <Table :items="sliders?.data ?? []">
          <!-- Table Header -->
          <template #table-header>
            <SortableTableHeaderCell label="# Id" sort="id" />

            <TableHeaderCell label="Image" />

            <SortableTableHeaderCell label="Title" sort="title" />

            <SortableTableHeaderCell label="URL" sort="url" />

            <TableHeaderCell label="Button" />

            <SortableTableHeaderCell label="Status" sort="status" />

            <TableHeaderCell label="Actions" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell> {{ item?.id }} </TableDataCell>

            <TableImageCell :src="item?.image" />

            <TableDataCell class="flex flex-col items-start min-w-[350px]">
              <p>{{ item?.title }}</p>
              <p class="font-medium text-[.7rem]">
                {{ item?.description }}
              </p>
            </TableDataCell>

            <TableDataCell>
              <span class="line-clamp-1">
                {{ item?.url }}
              </span>
            </TableDataCell>

            <TableDataCell>
              <div class="min-w-[150px] line-clamp-1">
                {{ item?.button }}
              </div>
            </TableDataCell>

            <TableToggleCell
              :value="item?.status"
              @change="store.changeStatus(!item?.status, item?.slug)"
            />

            <TableActionCell>
              <NuxtLinkButton
                v-show="can('sliders.edit')"
                :to="'/admin/sliders/' + item?.slug + '/edit'"
              >
                <i class="fa-solid fa-edit"></i>
                Edit
              </NuxtLinkButton>

              <NormalButton
                v-show="can('sliders.delete')"
                class="bg-red-600 hover:bg-red-700 text-white"
                @click="store.deleteSlider(item?.slug)"
              >
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </NormalButton>
            </TableActionCell>
          </template>
        </Table>
      </TableContainer>

      <div v-if="sliders?.data?.length" class="my-10">
        <Pagination :data="sliders" />
      </div>

      <NoTableData v-else />
    </div>
    <!-- Table End -->
  </div>
</template>
