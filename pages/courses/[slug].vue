<script setup lang="ts">
import CourseOutlineAccordion from '~/components/Accordions/CourseOutlineAccordion.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import VideoPlayerBox from '~/components/VideoPlayerBox.vue'
import { useCourseStore } from '~/stores/e-learning/course'

useHead({ title: 'Home' })

definePageMeta({ layout: 'app-layout' })

const store = useCourseStore()
const localePath = useLocalePath()

const { course } = storeToRefs(store)

onMounted(async () => {
  await store.getCourse(useRoute().params.slug.toString())

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>

<template>
  <div>
    <section v-if="course">
      <div class="container mx-auto py-10 space-y-10">
        <NormalButton class="text-white bg-yellow-500 hover:bg-yellow-600">
          <i class="fa-solid fa-arrow-left mr-2"></i>
          {{ $t('Browse Courses') }}
        </NormalButton>
        <div class="flex flex-col md:flex-row items-start justify-center space-x-5">
          <div class="w-full md:w-7/12 space-y-8">
            <div class="overflow-hidden rounded-md">
              <VideoPlayerBox />
            </div>

            <h1 class="font-bold text-3xl text-gray-800">
              {{ course?.title }}
            </h1>

            <div class="flex items-center space-x-8 font-semibold text-sm text-gray-700">
              <span class="">
                <i class="fa-solid fa-film mr-1.5"></i>
                {{ course?.total_lesson }} {{ $t('Lessons') }}
              </span>
              <span class="">
                <i class="fa-solid fa-clock mr-1.5"></i>
                {{ course?.duration }}
              </span>
              <span class="">
                <i class="fa-solid fa-users mr-1.5"></i>
                {{ course?.total_student }}
                {{
                  course?.total_student && course?.total_student > 1
                    ? $t('Students')
                    : $t('Student')
                }}
              </span>
              <span class="capitalize">
                <i class="fa-solid fa-chart-simple mr-1.5"></i>
                {{ course?.level === 'all_levels' ? $t('All Levels') : $t(course.level) }}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <div class="space-x-5">
                <button
                  type="button"
                  class="text-xs rounded-md font-semibold bg-yellow-500 px-4 py-2.5 text-white hover:bg-yellow-400 transition-all"
                >
                  <span v-if="course?.is_enrolled">
                    <i class="fa-solid fa-play mr-1"></i>
                    {{ $t('Watch Now') }}
                  </span>
                  <span v-else>
                    <i class="fa-solid fa-square-plus mr-1"></i>
                    {{ $t('Enroll Course') }}
                  </span>
                </button>

                <button
                  type="button"
                  class="text-xs rounded-md font-semibold bg-yellow-500 px-4 py-2.5 text-white hover:bg-yellow-400 transition-all"
                >
                  <span v-if="course?.is_saved">
                    <i class="fa-solid fa-bookmark mr-1"></i>
                    {{ $t('Remove From Save List') }}
                  </span>
                  <span v-else>
                    <i class="fa-solid fa-bookmark mr-1"></i>
                    {{ $t('Save Course') }}
                  </span>
                </button>
              </div>

              <NuxtLink
                :to="localePath('/membership/checkout')"
                class="text-xs rounded-md font-semibold bg-yellow-500 px-4 py-2.5 text-white hover:bg-yellow-400 transition-all"
              >
                <i class="fa-solid fa-crown mr-1"></i>
                {{ $t('Join Premium') }}

                <i class="fa-solid fa-arrow-right ml-1"></i>
              </NuxtLink>
            </div>

            <hr />

            <div class="space-y-5">
              <h3 class="font-bold text-lg text-gray-800">{{ $t('About This Course') }}</h3>
              <p v-html="course?.course_description" class="text-sm font-medium text-gray-700"></p>
            </div>
          </div>
          <div class="w-full md:w-5/12 space-y-5">
            <h3 class="font-bold text-xl">{{ $t('Course Outlines') }}</h3>

            <div class="space-y-2.5">
              <CourseOutlineAccordion />
              <CourseOutlineAccordion />
              <CourseOutlineAccordion />
              <CourseOutlineAccordion />
              <CourseOutlineAccordion />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
