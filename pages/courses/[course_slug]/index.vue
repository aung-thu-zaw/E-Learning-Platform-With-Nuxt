<script setup lang="ts">
import CourseOutlineAccordion from '~/components/Accordions/CourseOutlineAccordion.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import VideoPlayerBox from '~/components/VideoPlayerBox.vue'
import { useCourseStore } from '~/stores/e-learning/course'
import { useSavedCourseStore } from '~/stores/e-learning/savedCourse'

useHead({ title: 'Home' })

definePageMeta({ layout: 'app-layout' })

const courseSlug = useRoute().params?.course_slug?.toString()

const courseStore = useCourseStore()
const savedCourseStore = useSavedCourseStore()
const localePath = useLocalePath()

const { course, introVideo } = storeToRefs(courseStore)

onMounted(async () => {
  await courseStore.getCourse(courseSlug)

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

const toggleCourseSave = async () => {
  if (course.value) {
    course.value?.is_saved
      ? await savedCourseStore.removeCourseFromList(course?.value?.uuid)
      : await savedCourseStore.savedCourseToList(course?.value?.uuid)
  }

  await courseStore.getCourse(courseSlug)
}

watch(
  () => course.value,
  async (newValue) => {
    await courseStore.getCourseIntroVideo(newValue.intro_video_name)
  }
)
</script>

<template>
  <div>
    <section v-if="course">
      <div class="container mx-auto px-5 py-10 space-y-10">
        <NormalButton class="text-white bg-yellow-500 hover:bg-yellow-600">
          <i class="fa-solid fa-arrow-left mr-2"></i>
          {{ $t('Browse Courses') }}
        </NormalButton>
        <div
          class="flex flex-col md:flex-row items-start justify-center space-y-10 md:space-y-0 md:space-x-5"
        >
          <div class="w-full md:w-7/12 space-y-8">
            <div v-if="introVideo" class="overflow-hidden rounded-md">
              <VideoPlayerBox :video="introVideo" />
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
                <NuxtLink
                  v-if="course?.is_enrolled && course?.enrollment"
                  :to="
                    localePath(
                      `/courses/${courseSlug}/${course?.sections[0].slug}/${course?.sections[0].lessons[0].uuid}`
                    )
                  "
                  class="text-xs rounded-md font-semibold bg-yellow-500 px-4 py-2.5 text-white hover:bg-yellow-400 transition-all"
                >
                  <i class="fa-solid fa-play mr-1"></i>
                  {{ course?.enrollment.progress > 0 ? $t('Continue Watching') : $t('Watch Now') }}
                </NuxtLink>

                <button
                  v-else
                  type="button"
                  class="text-xs rounded-md font-semibold bg-yellow-500 px-4 py-2.5 text-white hover:bg-yellow-400 transition-all"
                  @click="courseStore.enrollCourse(course.slug)"
                >
                  <i class="fa-solid fa-square-plus mr-1"></i>
                  {{ $t('Enroll Course') }}
                </button>

                <button
                  type="button"
                  class="text-xs rounded-md font-semibold bg-yellow-500 px-4 py-2.5 text-white hover:bg-yellow-400 transition-all"
                  @click="toggleCourseSave"
                >
                  <span v-if="course?.is_saved">
                    <i class="fa-solid fa-bookmark mr-1"></i>
                    {{ $t('Remove From Saved List') }}
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
          <div class="w-full md:w-5/12 space-y-8">
            <h3 class="font-bold text-xl">{{ $t('Course Outlines') }}</h3>

            <div class="space-y-2.5 w-full flex flex-col items-center justify-center">
              <CourseOutlineAccordion
                v-for="(section, index) in course?.sections"
                v-show="section?.lessons?.length"
                :key="index"
                :section="section"
                :is-enrolled="course?.is_enrolled"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
