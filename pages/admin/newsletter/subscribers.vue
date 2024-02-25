<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbLinkItem from '~/components/Breadcrumbs/BreadcrumbLinkItem.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import GreenBadge from '~/components/Badges/GreenBadge.vue'
import RedBadge from '~/components/Badges/RedBadge.vue'
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
import { useNewsletterSubscriberStore } from '~/stores/dashboard/admin/newsletterSubscriber'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'

useHead({ title: 'Newsletter Subscribers' })

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const store = useNewsletterSubscriberStore()
const { subscribers } = storeToRefs(store)
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => await store.getAllSubscriber(queryString.value))

watch(
  () => route.query,
  async () => await store.getAllSubscriber(queryString.value)
)
</script>

<template>
  <div class="space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb
        to="/admin/newsletter/subscribers"
        icon="fa-envelope-open-text"
        label="Newsletter"
      >
        <BreadcrumbLinkItem to="/admin/newsletter/subscribers" label="Subscribers" />
        <BreadcrumbItem label="List" />
      </Breadcrumb>
    </div>

    <!-- Table Start -->
    <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
      <div
        class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
      >
        <DashboardTableDataSearchBox placeholder="Search by email" />

        <div class="flex items-center justify-end w-full space-x-3">
          <DashboardTableDataPerPageSelectBox />
        </div>
      </div>

      <TableContainer>
        <Table :items="subscribers?.data ?? []">
          <!-- Table Header -->
          <template #table-header>
            <SortableTableHeaderCell label="# Id" sort="id" />

            <SortableTableHeaderCell label="Email" sort="email" />

            <SortableTableHeaderCell label="Status" sort="status" />

            <TableHeaderCell label="Actions" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell> {{ item?.id }} </TableDataCell>
            <TableDataCell> {{ item?.email }} </TableDataCell>
            <TableDataCell>
              <GreenBadge v-show="item?.status === 'subscribed'">
                <i class="fa-solid fa-circle-check animate-pulse"></i>
                {{ item.status }}
              </GreenBadge>
              <RedBadge v-show="item?.status === 'unsubscribed'">
                <i class="fa-solid fa-circle-xmark animate-pulse"></i>
                {{ item.status }}
              </RedBadge>
            </TableDataCell>

            <TableActionCell>
              <NormalButton
                v-show="can('subscribers.delete')"
                class="bg-red-600 hover:bg-red-700 text-white"
                @click="store.deleteSubscriber(item?.id)"
              >
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </NormalButton>
            </TableActionCell>
          </template>
        </Table>
      </TableContainer>

      <div v-if="subscribers?.data?.length" class="my-10">
        <Pagination :data="subscribers" />
      </div>

      <NoTableData v-else />
    </div>
    <!-- Table End -->
  </div>
</template>
