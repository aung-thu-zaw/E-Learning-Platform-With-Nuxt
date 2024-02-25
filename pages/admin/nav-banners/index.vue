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
import TableToggleCell from '~/components/Tables/TableCells/TableToggleCell.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import GreenBadge from '~/components/Badges/GreenBadge.vue'
import RedBadge from '~/components/Badges/RedBadge.vue'
import OrangeBadge from '~/components/Badges/OrangeBadge.vue'
import Pagination from '~/components/Paginations/DashboardPagination.vue'
import { useNavBannerStore } from '~/stores/dashboard/admin/navBanner'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'
import type { NavBanner } from '~/types/navBanner'

useHead({ title: 'Nav Banners' })

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const store = useNavBannerStore()
const { navBanners } = storeToRefs(store)
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => await store.getAllNavBanner(queryString.value))

watch(
  () => route.query,
  async () => await store.getAllNavBanner(queryString.value)
)

const getEventStatus = (item: NavBanner) => {
  const currentDate = new Date()
  const startDate = new Date(item?.start_date_time)
  const endDate = new Date(item?.end_date_time)

  if (currentDate < startDate) {
    return 'Upcoming'
  } else if (currentDate >= startDate && currentDate <= endDate) {
    return 'In Progress'
  } else {
    return 'Ended'
  }
}
</script>

<template>
  <div class="space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/nav-banners" icon="fa-ad" label="Nav Banners">
        <BreadcrumbItem label="List" />
      </Breadcrumb>

      <!-- Create Button -->
      <div v-show="can('nav-banners.create')" class="flex items-center justify-end mb-3">
        <NuxtLinkButton to="/admin/nav-banners/create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Create Banner
        </NuxtLinkButton>
      </div>
    </div>

    <!-- Table Start -->
    <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
      <div
        class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
      >
        <DashboardTableDataSearchBox placeholder="Search by description" />

        <div class="flex items-center justify-end w-full space-x-3">
          <DashboardTableDataPerPageSelectBox />
        </div>
      </div>

      <TableContainer>
        <Table :items="navBanners?.data ?? []">
          <!-- Table Header -->
          <template #table-header>
            <SortableTableHeaderCell label="# Id" sort="id" />

            <SortableTableHeaderCell label="Description" sort="description" />

            <SortableTableHeaderCell label="URL" sort="url" />

            <TableHeaderCell label="Button" />

            <TableHeaderCell label="Event Status" />

            <SortableTableHeaderCell label="CountDown" sort="countdown" />

            <SortableTableHeaderCell label="Start Date Time" sort="start_date_time" />

            <SortableTableHeaderCell label="End Date Time" sort="end_date_time" />

            <TableHeaderCell label="Is Active?" />

            <TableHeaderCell label="Actions" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell> {{ item?.id }} </TableDataCell>

            <TableDataCell>
              <span class="min-w-[350px] line-clamp-1">
                {{ item?.description }}
              </span>
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

            <TableDataCell class="min-w-[150px]">
              <GreenBadge v-show="getEventStatus(item) === 'In Progress'">
                <i class="fa-solid fa-play-circle"></i>
                Progress
              </GreenBadge>

              <RedBadge v-show="getEventStatus(item) === 'Ended'">
                <i class="fa-solid fa-stop-circle"></i>
                End
              </RedBadge>

              <OrangeBadge v-show="getEventStatus(item) === 'Upcoming'">
                <i class="fa-solid fa-clock"></i>
                Upcoming
              </OrangeBadge>
            </TableDataCell>

            <TableDataCell>
              <div class="min-w-[160px] line-clamp-1">
                {{ item?.countdown ?? '-' }}
              </div>
            </TableDataCell>

            <TableDataCell>
              <div class="min-w-[160px] line-clamp-1">
                {{ item?.start_date_time }}
              </div>
            </TableDataCell>

            <TableDataCell>
              <div class="min-w-[160px] line-clamp-1">
                {{ item?.end_date_time }}
              </div>
            </TableDataCell>

            <TableToggleCell
              :value="item?.is_active"
              :disabled="getEventStatus(item) !== 'In Progress'"
              @change="store.changeStatus(!item?.is_active, item?.id)"
            />

            <TableActionCell>
              <NuxtLinkButton
                v-show="can('nav-banners.edit')"
                :to="'/admin/nav-banners/' + item?.id + '/edit'"
              >
                <i class="fa-solid fa-edit"></i>
                Edit
              </NuxtLinkButton>

              <NormalButton
                v-show="can('nav-banners.delete')"
                class="bg-red-600 hover:bg-red-700 text-white"
                @click="store.deleteNavBanner(item?.id)"
              >
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </NormalButton>
            </TableActionCell>
          </template>
        </Table>
      </TableContainer>

      <div v-if="navBanners?.data?.length" class="my-10">
        <Pagination :data="navBanners" />
      </div>

      <NoTableData v-else />
    </div>
    <!-- Table End -->
  </div>
</template>
