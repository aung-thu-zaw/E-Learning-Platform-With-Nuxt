<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
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
import NuxtLinkButton from '~/components/Buttons/NuxtLinkButton.vue'
import Pagination from '~/components/Paginations/DashboardPagination.vue'
import { useCourseStore } from '~/stores/dashboard/admin/course'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { storeToRefs } from 'pinia'
import InstructorCourseCard from '~/components/Cards/InstructorCourseCard.vue'

useHead({ title: 'Courses' })

definePageMeta({ layout: 'instructor-layout' })
</script>

<template>
  <div class="space-y-5 container mx-auto md:px-20">
    <div class="flex items-center justify-between mb-10">
      <h1 class="font-bold text-2xl text-gray-800">Your Teaching Courses (10)</h1>

      <NuxtLinkButton
        to="/instructor/courses/create"
        class="bg-yellow-500 hover:bg-yellow-600 text-white"
      >
        <i class="fas fa-plus-circle"></i>
        Add A New Course
      </NuxtLinkButton>
    </div>

    <div class="space-y-5">
      <InstructorCourseCard />
      <InstructorCourseCard />
      <InstructorCourseCard />
      <InstructorCourseCard />
      <InstructorCourseCard />
    </div>
  </div>
</template>
