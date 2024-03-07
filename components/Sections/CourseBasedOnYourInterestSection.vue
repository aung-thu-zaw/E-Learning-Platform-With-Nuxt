<script setup lang="ts">
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
import { useLoadData } from '~/composables/useLoadData'
import type { CoursePaginate } from '~/types/browsing'

const landmark = ref<HTMLElement | null>(null)
const courses = ref<CoursePaginate | null>(null)

const { $axiosApi } = useNuxtApp()

const getBasedOnUserInterestCourses = async () => {
  try {
    const { data } = await $axiosApi.get(`/courses/interests`)

    courses.value = data
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

onMounted(async () => {
  await getBasedOnUserInterestCourses()
  observeScroll(courses.value, landmark.value)
})

const { allData, newPaginatedData, observeScroll } = useLoadData()
</script>

<template>
  <section v-show="allData" class="py-10">
    <div class="container mx-auto">
      <div class="flex items-start justify-between md:px-0 px-5">
        <div class="space-y-3">
          <h1
            class="font-bold text-gray-800 text-3xl [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)]"
          >
            {{ $t('Courses Based on Your Interests') }}
          </h1>
          <p class="text-sm font-medium text-gray-600">
            {{
              $t('Explore personalized recommendations tailored to your interests and preferences.')
            }}
          </p>
        </div>
      </div>

      <div class="py-10 px-5 md:px-0 lg:py-14 mx-auto">
        <div class="grid lg:grid-cols-3 gap-5">
          <VideoCourseCard v-for="course in allData" :key="course?.id" :course="course" />
        </div>

        <div v-if="!newPaginatedData?.links?.next" class="mt-14">
          <p class="text-slate-700 text-sm font-semibold text-center">
            You have reached the end of the page.
          </p>
        </div>
        <div ref="landmark"></div>
      </div>
    </div>
  </section>
</template>
