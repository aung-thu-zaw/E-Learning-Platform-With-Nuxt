<script setup lang="ts">
import NewAndPopularCourseCarousel from '~/components/Carousels/NewAndPopularCourseCarousel.vue'
import type { Course } from '~/types/browsing'

const courses = ref<Course[] | null>(null)

const { $axiosApi } = useNuxtApp()

const getNewAndPopularCourses = async () => {
  try {
    const { data } = await $axiosApi.get(`/courses/new-and-popular`)

    courses.value = data
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

onMounted(async () => await getNewAndPopularCourses())
</script>

<template>
  <section v-if="courses?.length" class="py-10">
    <div class="container mx-auto">
      <div class="flex items-start justify-between md:px-0 px-5">
        <div class="space-y-3">
          <h1
            class="font-bold text-gray-800 text-3xl [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)]"
          >
            {{ $t('New And Popular Courses') }}
          </h1>
          <p class="text-sm font-medium text-gray-600">
            {{
              $t(
                'Discover the latest trends and most sought-after topics with our new and popular courses.'
              )
            }}
          </p>
        </div>
      </div>

      <div class="py-10 px-5 md:px-0 mx-auto">
        <NewAndPopularCourseCarousel :courses="courses" />
      </div>
    </div>
  </section>
</template>
