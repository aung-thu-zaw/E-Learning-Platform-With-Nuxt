<script setup lang="ts">
import AppLayout from '~/layouts/AppLayout.vue'
import MyCoursesTab from '~/components/Tabs/MyCoursesTab.vue'
import SavedCourseCard from '~/components/Cards/SavedCourseCard.vue'
import SavedCourseFilters from '~/components/Filters/SavedCourseFilters.vue'

// useHead({ title: 'Home' })
</script>

<template>
  <AppLayout>
    <section class="py-12">
      <div class="container mx-auto px-5 space-y-10">
        <h1 class="font-bold text-3xl text-gray-800 mb-10">My Courses</h1>

        <MyCoursesTab />

        <SavedCourseFilters />

        <div class="mt-3">
          <div class="max-w-[85rem] mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <SavedCourseCard />
              <SavedCourseCard />
              <SavedCourseCard />
              <SavedCourseCard />
              <SavedCourseCard />
              <SavedCourseCard />
              <SavedCourseCard />
              <SavedCourseCard />
              <SavedCourseCard />
              <SavedCourseCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>
