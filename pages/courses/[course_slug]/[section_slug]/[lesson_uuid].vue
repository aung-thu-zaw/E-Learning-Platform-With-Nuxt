<script setup lang="ts">
import VideoPlayer from '~/components/VideoPlayer.vue'
import SwitchCheckbox from '~/components/Forms/Fields/SwitchCheckbox.vue'
import CourseProgressBar from '~/components/ProgressBars/CourseProgressBar.vue'
import CourseSectionAccordion from '~/components/Accordions/CourseSectionAccordion.vue'
// import CourseInstructorCard from '~/components/Cards/CourseInstructorCard.vue'
import { useCourseStore } from '~/stores/e-learning/course'

useHead({ title: 'Home' })

definePageMeta({ layout: 'app-layout' })

const store = useCourseStore()
const router = useRouter()
const localePath = useLocalePath()
const courseSlug = useRoute().params.course_slug?.toString()
const sectionSlug = useRoute().params.section_slug.toString()
const lessonUUId = useRoute().params.lesson_uuid.toString()
const progress = ref<number>(0)
let isAutoPlayEnabled = ref(false)

if (process.client) {
  isAutoPlayEnabled = ref(localStorage.getItem('enabledAutoPlay') === 'true')
}

const { course, lesson, lessonVideo } = storeToRefs(store)
const { $axiosApi } = useNuxtApp()

onMounted(async () => {
  await store.getCourse(courseSlug)

  if (course.value) {
    await store.getLessonMetaData(lessonUUId)
    await store.getLessonVideo(course.value.uuid, sectionSlug, lessonUUId)
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

const handleDownloadLesson = async () => {
  try {
    if (course.value && lesson.value) {
      const { data } = await $axiosApi.get(
        `courses/${course.value.uuid}/sections/${sectionSlug}/lessons/${lessonUUId}`,
        {
          responseType: 'blob'
        }
      )

      const url = window.URL.createObjectURL(new Blob([data], { type: 'video/mp4' }))

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', sectionSlug + '-' + lesson.value.title)
      document.body.appendChild(link)
      link.click()
    }
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

const getNextSectionSlug = () => {
  if (!course.value || !lesson.value) return null

  const currentSectionIndex = course.value.sections.findIndex(
    (section) => section.slug === sectionSlug
  )

  if (currentSectionIndex === -1 || currentSectionIndex === course.value.sections.length - 1) {
    return sectionSlug
  }

  const currentSection = course.value.sections[currentSectionIndex]
  const currentLessonIndex = currentSection.lessons.findIndex(
    (lesson) => lesson.uuid === lessonUUId
  )

  if (currentLessonIndex === -1 || currentLessonIndex === currentSection.lessons.length - 1) {
    return course.value.sections[currentSectionIndex + 1].slug
  }

  return sectionSlug
}

const getNextLessonUuid = () => {
  if (!course.value || !lesson.value) return null

  const currentLessonUuid = lesson.value.uuid
  let nextLessonUuid = null
  let foundCurrentLesson = false

  for (const section of course.value.sections) {
    for (const lesson of section.lessons) {
      if (foundCurrentLesson) {
        nextLessonUuid = lesson.uuid
        break
      }
      if (lesson.uuid === currentLessonUuid) {
        foundCurrentLesson = true
      }
    }
    if (nextLessonUuid) break
  }

  return nextLessonUuid
}

const updateProgressPercent = async (percent: number) => {
  progress.value = percent

  if (isAutoPlayEnabled.value && course.value && percent === 0 && getNextLessonUuid()) {
    router.push(
      localePath(`/courses/${course.value.slug}/${getNextSectionSlug()}/${getNextLessonUuid()}`)
    )
  }
}

const handleAutoPlay = () => {
  if (process.client) {
    isAutoPlayEnabled.value = !isAutoPlayEnabled.value
    localStorage.setItem('enabledAutoPlay', isAutoPlayEnabled.value.toString())
  }
}
</script>

<template>
  <div v-if="lesson">
    <section>
      <header class="pt-5 mt-10 md:mt-0 px-5">
        <div class="">
          <div class="w-full flex flex-col md:flex-row items-start justify-between">
            <div class="w-full md:w-9/12">
              <div v-if="lessonVideo" class="rounded-md overflow-hidden border border-gray-200">
                <VideoPlayer :video="lessonVideo" @progress-update="updateProgressPercent" />
              </div>

              <div class="my-10">
                <h1 class="font-bold text-3xl text-gray-800">
                  {{ lesson?.title }}
                </h1>
              </div>

              <div class="my-6 flex items-center justify-between">
                <div class="space-x-5">
                  <button
                    type="button"
                    class="text-white bg-yellow-500 hover:bg-yellow-600 transition-all px-3 py-3 shadow-sm rounded-md text-xs"
                    @click="
                      !lesson?.is_completed
                        ? store.lessonMarkAsComplete(lesson.uuid)
                        : store.lessonUnmarkAsComplete(lesson.uuid)
                    "
                  >
                    <i class="fa-solid fa-circle-check"></i>
                    {{ !lesson?.is_completed ? $t('Mark As Complete') : $t('Unmark as Complete') }}
                  </button>

                  <button
                    type="button"
                    class="text-white bg-yellow-500 hover:bg-yellow-600 transition-all px-3 py-3 shadow-sm rounded-md text-xs"
                    @click="handleDownloadLesson"
                  >
                    <i class="fa-solid fa-download"></i>
                    {{ $t('Download Video') }}
                  </button>
                </div>

                <button
                  type="button"
                  class="text-white bg-yellow-500 hover:bg-yellow-600 transition-all px-3 py-3 shadow-sm rounded-md text-xs"
                >
                  <i class="fa-solid fa-bell"></i>
                  {{ $t('Get notified when participating') }}
                </button>
              </div>
            </div>
            <div class="w-full md:w-3/12 text-gray-700 flex flex-col items-center justify-between">
              <div class="ml-auto">
                <SwitchCheckbox
                  label="Autoplay"
                  :checked="isAutoPlayEnabled"
                  @change="handleAutoPlay"
                />
              </div>

              <!-- Progress -->
              <CourseProgressBar :enrollment="course?.enrollment ?? null" />
              <!-- End Progress -->

              <div v-if="course" class="px-3 h-[600px] overflow-auto w-full">
                <!-- Section -->
                <CourseSectionAccordion
                  v-for="(section, index) in course?.sections"
                  v-show="section?.lessons?.length"
                  :key="index"
                  :course="course"
                  :section="section"
                  :is-enrolled="course?.is_enrolled"
                  :current-lesson="lesson ?? null"
                  :lesson-progress="progress"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </section>
  </div>
</template>
