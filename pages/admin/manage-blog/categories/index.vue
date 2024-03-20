<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbLinkItem from '~/components/Breadcrumbs/BreadcrumbLinkItem.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import NuxtLinkButton from '~/components/Buttons/NuxtLinkButton.vue'
import TableContainer from '~/components/Tables/TableContainer.vue'
import Table from '~/components/Tables/Table.vue'
import SortableTableHeaderCell from '~/components/Tables/TableCells/SortableTableHeaderCell.vue'
import TableHeaderCell from '~/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '~/components/Tables/TableCells/TableDataCell.vue'
import TableToggleCell from '~/components/Tables/TableCells/TableToggleCell.vue'
import TableActionCell from '~/components/Tables/TableCells/TableActionCell.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import NoTableData from '~/components/Tables/NoTableData.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import Pagination from '~/components/Paginations/DashboardPagination.vue'
import { useBlogCategoryStore } from '~/stores/dashboard/admin/blogCategory'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'

useHead({ title: 'Blog Categories' })

definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'admin'] })

const route = useRoute()
const store = useBlogCategoryStore()
const { blogCategories } = storeToRefs(store)
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => await store.getAllBlogCategory(queryString.value))

watch(
  () => route.query,
  async () => await store.getAllBlogCategory(queryString.value)
)
</script>

<template>
  <div class="space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/manage-blog/categories" icon="fa-file-pen" label="Manage Blog">
        <BreadcrumbLinkItem to="/admin/manage-blog/categories" label="Categories" />
        <BreadcrumbItem label="List" />
      </Breadcrumb>

      <!-- Create Button -->
      <div v-show="can('blog-categories.create')" class="flex items-center justify-end mb-3">
        <NuxtLinkButton to="/admin/manage-blog/categories/create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Create Category
        </NuxtLinkButton>
      </div>
    </div>

    <!-- Table Start -->
    <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
      <div
        class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
      >
        <DashboardTableDataSearchBox placeholder="Search by category" />

        <div class="flex items-center justify-end w-full space-x-3">
          <DashboardTableDataPerPageSelectBox />
        </div>
      </div>

      <TableContainer>
        <Table :items="blogCategories?.data ?? []">
          <!-- Table Header -->
          <template #table-header>
            <SortableTableHeaderCell label="# Id" sort="id" />

            <SortableTableHeaderCell label="Category" sort="name" />

            <SortableTableHeaderCell label="Status" sort="status" />

            <TableHeaderCell label="Actions" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell> {{ item?.id }} </TableDataCell>

            <TableDataCell class="flex flex-col items-start min-w-[300px]">
              <p>{{ item?.name }}</p>
              <p class="font-medium text-[.7rem]">
                {{ item?.description }}
              </p>
            </TableDataCell>

            <TableToggleCell
              :value="item?.status"
              @change="store.changeStatus(!item?.status, item?.slug)"
            />

            <TableActionCell>
              <NuxtLinkButton
                v-show="can('blog-categories.edit')"
                :to="'/admin/manage-blog/categories/' + item?.slug + '/edit'"
              >
                <i class="fa-solid fa-edit"></i>
                Edit
              </NuxtLinkButton>

              <NormalButton
                v-show="can('blog-categories.delete')"
                class="bg-red-600 hover:bg-red-700 text-white"
                @click="store.deleteBlogCategory(item?.slug)"
              >
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </NormalButton>
            </TableActionCell>
          </template>
        </Table>
      </TableContainer>

      <div v-if="blogCategories?.data?.length" class="my-10">
        <Pagination :data="blogCategories" />
      </div>

      <NoTableData v-else />
    </div>
    <!-- Table End -->
  </div>
</template>
