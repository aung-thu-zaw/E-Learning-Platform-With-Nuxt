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
import BlueBadge from '~/components/Badges/BlueBadge.vue'
import Pagination from '~/components/Paginations/DashboardPagination.vue'
import { useCouponStore } from '~/stores/dashboard/admin/coupon'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'

useHead({ title: 'Coupons' })

definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'admin'] })

const route = useRoute()
const store = useCouponStore()
const { coupons } = storeToRefs(store)
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => await store.getAllCoupon(queryString.value))

watch(
  () => route.query,
  async () => await store.getAllCoupon(queryString.value)
)
</script>

<template>
  <div class="space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/coupons" icon="fa-ticket" label="Coupons">
        <BreadcrumbItem label="List" />
      </Breadcrumb>

      <!-- Create Button -->
      <div v-show="can('coupons.create')" class="flex items-center justify-end mb-3">
        <NuxtLinkButton to="/admin/coupons/create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Create Coupon
        </NuxtLinkButton>
      </div>
    </div>

    <!-- Table Start -->
    <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
      <div
        class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
      >
        <DashboardTableDataSearchBox placeholder="Search by code" />

        <div class="flex items-center justify-end w-full space-x-3">
          <DashboardTableDataPerPageSelectBox />
        </div>
      </div>

      <TableContainer>
        <Table :items="coupons?.data ?? []">
          <!-- Table Header -->
          <template #table-header>
            <SortableTableHeaderCell label="# Id" sort="id" />

            <SortableTableHeaderCell label="Code" sort="code" />

            <SortableTableHeaderCell label="Type" sort="type" />

            <SortableTableHeaderCell label="Value" sort="value" />

            <SortableTableHeaderCell label="Max Uses" sort="max_uses" />

            <SortableTableHeaderCell label="Uses" sort="uses" />

            <SortableTableHeaderCell label="Expiry Date" sort="expiry_date" />

            <SortableTableHeaderCell label="Trial Days" sort="free_trial_days" />

            <TableHeaderCell label="Is Redeemable?" />

            <TableHeaderCell label="Actions" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell> {{ item?.id }} </TableDataCell>

            <TableDataCell>
              {{ item?.code }}
            </TableDataCell>

            <TableDataCell class="min-w-[150px]">
              <GreenBadge v-show="item?.type === 'fixed_amount'"> Fixed Amount </GreenBadge>
              <BlueBadge v-show="item?.type === 'percentage'"> Percentage </BlueBadge>
            </TableDataCell>

            <TableDataCell class="min-w-[100px]">
              {{ item?.type === 'fixed_amount' ? '$' : '%' }}
              {{ item?.value }}
            </TableDataCell>

            <TableDataCell class="min-w-[100px]">
              {{ item?.max_uses ?? '-' }}
            </TableDataCell>

            <TableDataCell>
              {{ item?.uses ?? 0 }}
            </TableDataCell>

            <TableDataCell>
              <div class="min-w-[160px] line-clamp-1">
                {{ item?.expiry_date ?? '-' }}
              </div>
            </TableDataCell>

            <TableDataCell class="min-w-[100px]">{{ item?.free_trial_days }} Days </TableDataCell>

            <TableToggleCell
              class="min-w-[130px]"
              :value="item?.is_redeemable"
              @change="store.changeStatus(!item?.is_redeemable, item?.id)"
            />

            <TableActionCell>
              <NuxtLinkButton
                v-show="can('coupons.edit')"
                :to="'/admin/coupons/' + item?.id + '/edit'"
              >
                <i class="fa-solid fa-edit"></i>
                Edit
              </NuxtLinkButton>

              <NormalButton
                v-show="can('coupons.delete')"
                class="bg-red-600 hover:bg-red-700 text-white"
                @click="store.deleteCoupon(item?.id)"
              >
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </NormalButton>
            </TableActionCell>
          </template>
        </Table>
      </TableContainer>

      <div v-if="coupons?.data?.length" class="my-10">
        <Pagination :data="coupons" />
      </div>

      <NoTableData v-else />
    </div>
    <!-- Table End -->
  </div>
</template>
