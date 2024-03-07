<script setup lang="ts">
import RecommendedCourseForYouCarousel from '~/components/Carousels/RecommendedCourseForYouCarousel.vue'
import type { Course } from '~/types/browsing'

const courses = ref<Course[] | null>(null)

const { $axiosApi } = useNuxtApp()

const getRecommendedCourseForUserInterest = async () => {
  try {
    const { data } = await $axiosApi.get(`/courses/recommended-for-user-interest`)

    courses.value = data
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

onMounted(async () => await getRecommendedCourseForUserInterest())
</script>

<template>
  <section class="py-10">
    <div class="container mx-auto">
      <div class="flex items-start justify-between md:px-0 px-5">
        <div class="space-y-3">
          <h1
            class="font-bold text-gray-800 text-3xl [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)]"
          >
            {{ $t('Recommended Courses For You') }}
          </h1>
          <p class="text-sm font-medium text-gray-600">
            {{
              $t(
                'Advance towards your learning objectives with expertly selected, step-by-step courses.'
              )
            }}
          </p>
        </div>
      </div>

      <div class="py-10 px-5 md:px-0 mx-auto">
        <RecommendedCourseForYouCarousel :courses="courses" />
      </div>
    </div>
  </section>
</template>
