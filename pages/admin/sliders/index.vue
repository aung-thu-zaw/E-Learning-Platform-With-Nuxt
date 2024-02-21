<script setup lang="ts">
import AdminLayout from '~/layouts/AdminLayout.vue'
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
import SwitchCheckbox from '~/components/Forms/Fields/SwitchCheckbox.vue'
// import NoTableData from '~/components/Tables/NoTableData.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
// import Pagination from '~/components/Paginations/DashboardPagination.vue'

useHead({ title: 'Sliders' })
</script>

<template>
  <AdminLayout>
    <div class="h-auto space-y-5">
      <!-- Breadcrumb -->
      <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
        <Breadcrumb to="/admin/sliders" icon="fa-sliders" label="Sliders">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <!-- Create Button -->
      <div class="flex items-center justify-start mb-3">
        <NuxtLinkButton to="/admin/sliders/create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Create Slider
        </NuxtLinkButton>
      </div>

      <!-- Table Start -->
      <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
        >
          <!-- <DashboardTableDataSearchBox placeholder="Search by coupon code" />

          <div class="flex items-center justify-end w-full space-x-3">
            <DashboardTableDataPerPageSelectBox />
          </div> -->
        </div>

        <TableContainer>
          <Table :items="[{ id: 1 }]">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />

              <TableHeaderCell label="Image" />

              <SortableTableHeaderCell label="Title" sort="title" />

              <TableHeaderCell label="Button" />

              <TableHeaderCell label="Show On Slider" />

              <TableHeaderCell label="Actions" />
            </template>

            <!-- Table Body -->
            <template #table-data="{}">
              <TableDataCell> 1 </TableDataCell>

              <TableImageCell
                src="https://slidebazaar.com/wp-content/uploads/2021/04/E-Learning-Presentation-Deck-jpg.webp"
                class="h-16 rounded-md overflow-hidden"
              />

              <TableDataCell class="flex flex-col items-start">
                <p>This is our first e-learning slider.</p>
                <p class="font-medium text-[.7rem]">
                  Lorem ipsum dolor sit amet adipisicing elit....
                </p>
              </TableDataCell>

              <TableDataCell> Enroll Now </TableDataCell>

              <TableDataCell>
                <SwitchCheckbox />
              </TableDataCell>

              <TableActionCell>
                <NuxtLinkButton to="/admin/sliders/1/edit">
                  <i class="fa-solid fa-edit"></i>
                  Edit
                </NuxtLinkButton>

                <NormalButton class="bg-red-600 hover:bg-red-700 text-white">
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <!-- <Pagination /> -->

        <!-- <NoTableData /> -->
      </div>
      <!-- Table End -->
    </div>
  </AdminLayout>
</template>
