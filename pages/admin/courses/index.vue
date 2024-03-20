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
import BlueBadge from '~/components/Badges/BlueBadge.vue'
import GreenBadge from '~/components/Badges/GreenBadge.vue'
import RedBadge from '~/components/Badges/RedBadge.vue'
import OrangeBadge from '~/components/Badges/OrangeBadge.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import TableSelectBoxCell from '@/components/Tables/TableCells/TableSelectBoxCell.vue'
import NoTableData from '~/components/Tables/NoTableData.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import Pagination from '~/components/Paginations/DashboardPagination.vue'
import { useCourseStore } from '~/stores/dashboard/admin/course'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'

useHead({ title: 'Courses' })

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const store = useCourseStore()
const { courses } = storeToRefs(store)
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => await store.getAllCourse(queryString.value))

watch(
  () => route.query,
  async () => await store.getAllCourse(queryString.value)
)
</script>

<template>
  <div class="space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/courses" icon="fa-graduation-cap" label="Courses">
        <BreadcrumbItem label="List" />
      </Breadcrumb>

      <!-- Create Button -->
      <div v-show="can('courses.create')" class="flex items-center justify-end mb-3">
        <NuxtLinkButton to="/admin/courses/create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Create Course
        </NuxtLinkButton>
      </div>
    </div>

    <!-- Table Start -->
    <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
      <div
        class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
      >
        <DashboardTableDataSearchBox
          placeholder="Search by instructor, category, subcategory or title"
        />

        <div class="flex items-center justify-end w-full space-x-3">
          <DashboardTableDataPerPageSelectBox />
        </div>
      </div>

      <TableContainer>
        <Table :items="courses?.data ?? []">
          <!-- Table Header -->
          <template #table-header>
            <SortableTableHeaderCell label="# Id" sort="id" />

            <TableHeaderCell label="Thumbnail" />

            <TableHeaderCell label="Category" />

            <TableHeaderCell label="Subcategory" />

            <TableHeaderCell label="Instructor" />

            <SortableTableHeaderCell label="Title" sort="title" />

            <SortableTableHeaderCell label="Level" sort="level" />

            <SortableTableHeaderCell label="Status" sort="status" />

            <TableHeaderCell label="Change Status" />

            <TableHeaderCell label="Actions" />
          </template>

          <!-- Table Body -->
          <template #table-data="{ item }">
            <TableDataCell> {{ item?.id }} </TableDataCell>

            <TableImageCell :src="item?.thumbnail" />

            <TableDataCell>
              <div class="min-w-[250px] line-clamp-1">
                {{ item?.category?.name }}
              </div>
            </TableDataCell>

            <TableDataCell>
              <div class="min-w-[180px] line-clamp-1">
                {{ item?.subcategory?.name }}
              </div>
            </TableDataCell>

            <TableDataCell>
              <div class="min-w-[150px] line-clamp-1 flex items-center space-x-2">
                <img
                  :src="item.instructor?.avatar"
                  alt="instructor"
                  class="w-10 h-10 rounded-full"
                />
                <span>
                  {{ item?.instructor?.name }}
                </span>
              </div>
            </TableDataCell>

            <TableDataCell class="min-w-[300px]"> {{ item?.title }} </TableDataCell>

            <TableDataCell>
              <span class="capitalize line-clamp-1 min-w-[70px]">
                {{ item?.level !== 'all_levels' ? item?.level : 'all levels' }}
              </span>
            </TableDataCell>

            <TableDataCell>
              <OrangeBadge v-show="item?.status === 'draft'">
                <i class="fa-solid fa-file-pen animate-pulse"></i>
                {{ item?.status }}
              </OrangeBadge>
              <BlueBadge v-show="item?.status === 'pending'">
                <i class="fa-solid fa-spinner animate-spin"></i>
                {{ item?.status }}
              </BlueBadge>
              <GreenBadge v-show="item?.status === 'published'">
                <i class="fa-solid fa-circle-check animate-pulse"></i>
                {{ item?.status }}
              </GreenBadge>
              <RedBadge v-show="item?.status === 'rejected'">
                <i class="fa-solid fa-circle-xmark animate-pulse"></i>
                {{ item?.status }}
              </RedBadge>
            </TableDataCell>

            <TableSelectBoxCell
              v-show="can('courses.edit')"
              :options="[
                {
                  label: 'Draft',
                  value: 'draft'
                },
                {
                  label: 'Pending',
                  value: 'pending'
                },
                {
                  label: 'Publish',
                  value: 'published'
                },
                {
                  label: 'Reject',
                  value: 'rejected'
                }
              ]"
              :selected="item.status !== 'draft' ? item.status : ''"
              @change="store.changeStatus($event.target?.value, item?.slug)"
            />

            <TableActionCell>
              <NuxtLinkButton
                v-show="can('courses.edit')"
                :to="'/admin/courses/' + item?.slug + '/edit'"
              >
                <i class="fa-solid fa-edit"></i>
                Edit
              </NuxtLinkButton>

              <NormalButton
                v-show="can('courses.delete')"
                class="bg-red-600 hover:bg-red-700 text-white"
                @click="store.deleteCourse(item?.slug)"
              >
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </NormalButton>
            </TableActionCell>
          </template>
        </Table>
      </TableContainer>

      <div v-if="courses?.data?.length" class="my-10">
        <Pagination :data="courses" />
      </div>

      <NoTableData v-else />
    </div>
    <!-- Table End -->
  </div>
</template>
