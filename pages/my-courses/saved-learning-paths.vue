<script setup lang="ts">
import AppLayout from '~/layouts/AppLayout.vue'
import MyCoursesTab from '~/components/Tabs/MyCoursesTab.vue'
import LearningPathCollectionCard from '~/components/Cards/LearningPathCollectionCard.vue'

// useHead({ title: 'Home' })
</script>

<template>
  <AppLayout>
    <section class="py-12">
      <div class="container mx-auto px-5 space-y-10">
        <h1 class="font-bold text-3xl text-gray-800 mb-10">My Courses</h1>

        <MyCoursesTab />

        <div class="mt-3">
          <div class="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
            <div class="grid lg:grid-cols-3 gap-5">
              <LearningPathCollectionCard />
              <LearningPathCollectionCard />
              <LearningPathCollectionCard />
              <LearningPathCollectionCard />
              <LearningPathCollectionCard />
              <LearningPathCollectionCard />
              <LearningPathCollectionCard />
              <LearningPathCollectionCard />
              <LearningPathCollectionCard />
              <LearningPathCollectionCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>
