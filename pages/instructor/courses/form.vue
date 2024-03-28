<script setup lang="ts">
import CourseInformation from '~/components/Course/CourseInformation.vue'
import VideoLessons from '~/components/Course/VideoLessons.vue'
import CourseResources from '~/components/Course/CourseResources.vue'
import CourseFormTab from '~/components/Tabs/CourseFormTab.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import { useCourseStore } from '~/stores/dashboard/instructor/course'
import type { Form } from '~/types/course'

useHead({ title: 'Create Course' })

definePageMeta({ layout: 'instructor-layout' })

const store = useCourseStore()
const createForm = ref<HTMLFormElement | null>(null)
const selectedTab = ref<string>('course-information')

const tabItems = [
  { id: 'course-information', label: 'Course Information' },
  { id: 'video-lessons', label: 'Video Lessons' },
  { id: 'course-resources', label: 'Course Resources' }
]

const form: Form = reactive({
  category_id: '',
  subcategory_id: '',
  thumbnail: '',
  title: '',
  course_description: '',
  project_description: '',
  level: '',
  language: '',
  tags: [],
  videos: [],
  resources: [],
  status: ''
})

const handleCreateCourse = async () => {
  await store.createCourse({ ...form })
  if (!store.errors) {
    createForm?.value?.reset()
    form.category_id = ''
    form.subcategory_id = ''
    form.thumbnail = ''
    form.title = ''
    form.course_description = ''
    form.project_description = ''
    form.level = ''
    form.language = ''
    form.tags = []
    form.videos = []
    form.resources = []
    form.status = ''
  }
}

const saveAsDraft = () => (form.status = 'draft')

const submitForReview = () => (form.status = 'pending')

const isDisabled = computed(() => {
  return (
    !form.category_id ||
    !form.subcategory_id ||
    !form.thumbnail ||
    !form.title ||
    !form.course_description ||
    !form.project_description ||
    !form.level ||
    !form.language ||
    !form.videos.length
  )
})
</script>

<template>
  <div class="container mx-auto h-auto space-y-5">
    <form
      ref="createForm"
      class="flex flex-col items-center w-full"
      @submit.prevent="handleCreateCourse"
    >
      <div class="mb-5 flex items-center justify-center">
        <CourseFormTab v-model:selectedTab="selectedTab" :items="tabItems" />
      </div>

      <div class="w-full">
        <CourseInformation v-if="selectedTab === 'course-information'" :form="form" />
        <VideoLessons v-if="selectedTab === 'video-lessons'" :form="form" />
        <CourseResources v-if="selectedTab === 'course-resources'" :form="form" />
      </div>

      <div class="my-5 space-x-5 w-full mr-0 flex items-center justify-end">
        <FormButton
          class="w-[150px] text-white bg-yellow-600 hover:bg-yellow-700 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
          :disabled="isDisabled"
          @click="saveAsDraft"
        >
          Save as Draft
        </FormButton>
        <FormButton
          class="w-[180px] text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
          :disabled="isDisabled"
          @click="submitForReview"
        >
          Submit For Review
        </FormButton>
      </div>
    </form>
  </div>
</template>

<style scoped lang="css">
:root {
  --dp-font-family: poppins;
  --dp-border-radius: 6px;
  --dp-input-padding: 15px;
  --dp-font-size: 0.875rem;
  --dp-preview-font-size: 0.8rem;
  --dp-time-font-size: 0.8rem;
}

.dp__theme_light {
  --dp-background-color: #f9fafb;
  --dp-text-color: rgb(31 41 55);
  --dp-border-color: rgb(209 213 219);
  --dp-menu-border-color: rgb(209 213 219);
}

.input-slot-image {
  width: auto;
  margin-left: 5px;
}

:deep(.ql-editor) {
  min-height: 200px;
}
:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
