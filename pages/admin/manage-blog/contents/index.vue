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
import TableImageCell from '~/components/Tables/TableCells/TableImageCell.vue'
import TableSelectBoxCell from '@/components/Tables/TableCells/TableSelectBoxCell.vue'
import TableActionCell from '~/components/Tables/TableCells/TableActionCell.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import NoTableData from '~/components/Tables/NoTableData.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import Pagination from '~/components/Paginations/DashboardPagination.vue'
import { useBlogContentStore } from '~/stores/dashboard/admin/blogContent'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'

useHead({ title: 'Blog Contents' })

definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'admin'] })

const route = useRoute()
const store = useBlogContentStore()
const { blogContents } = storeToRefs(store)
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => await store.getAllBlogContent(queryString.value))

watch(
  () => route.query,
  async () => await store.getAllBlogContent(queryString.value)
)
</script>

<template>
  <div class="space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/manage-blog/contents" icon="fa-file-pen" label="Manage Blog">
        <BreadcrumbLinkItem to="/admin/manage-blog/contents" label="Contents" />
        <BreadcrumbItem label="List" />
      </Breadcrumb>

      <!-- Create Button -->
      <div v-show="can('blog-contents.create')" class="flex items-center justify-end mb-3">
        <NuxtLinkButton to="/admin/manage-blog/contents/create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Create Content
        </NuxtLinkButton>
      </div>
    </div>

    <!-- Table Start -->
    <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
      <div
        class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
      >
        <DashboardTableDataSearchBox placeholder="Search by title, author or category" />

        <div class="flex items-center justify-end w-full space-x-3">
          <DashboardTableDataPerPageSelectBox />
        </div>
      </div>

      <TableContainer>
        <Table :items="blogContents?.data ?? []">
          <!-- Table Header -->
          <template #table-header>
            <SortableTableHeaderCell label="# Id" sort="id" />

            <TableHeaderCell label="Thumbnail" />

            <TableHeaderCell label="Category" />

            <TableHeaderCell label="Author" />

            <SortableTableHeaderCell label="Title" sort="title" />

            <SortableTableHeaderCell label="Published At" sort="published_at" />

            <TableHeaderCell v-show="can('blog-contents.edit')" label="Status" />

            <TableHeaderCell label="Actions" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell>
              {{ item?.id }}
            </TableDataCell>

            <TableImageCell :src="item?.thumbnail" />

            <TableDataCell class="min-w-[150px]">
              {{ item?.category?.name }}
            </TableDataCell>

            <TableDataCell class="min-w-[150px]">
              <span class="line-clamp-1">
                {{ item?.author?.display_name }}
              </span>
            </TableDataCell>

            <TableDataCell class="min-w-[250px]">
              <span class="line-clamp-1">
                {{ item?.title }}
              </span>
            </TableDataCell>

            <TableDataCell class="min-w-[150px]">
              {{ item?.published_at ?? '-' }}
            </TableDataCell>

            <TableSelectBoxCell
              v-show="can('blog-contents.edit')"
              :options="[
                {
                  label: 'Publish',
                  value: 'published'
                },
                {
                  label: 'Hidden',
                  value: 'hidden'
                }
              ]"
              :selected="item.status !== 'draft' ? item.status : ''"
              @change="store.changeStatus($event.target?.value, item?.slug)"
            />

            <TableActionCell>
              <NuxtLinkButton
                v-show="can('blog-contents.edit')"
                :to="'/admin/manage-blog/contents/' + item?.slug + '/edit'"
              >
                <i class="fa-solid fa-edit"></i>
                Edit
              </NuxtLinkButton>

              <NormalButton
                v-show="can('blog-contents.delete')"
                class="bg-red-600 hover:bg-red-700 text-white"
                @click="store.deleteBlogContent(item?.slug)"
              >
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </NormalButton>
            </TableActionCell>
          </template>
        </Table>
      </TableContainer>

      <div v-if="blogContents?.data?.length" class="my-10">
        <Pagination :data="blogContents" />
      </div>

      <NoTableData v-else />
    </div>
    <!-- Table End -->
  </div>
</template>
