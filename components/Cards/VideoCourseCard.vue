<script setup lang="ts">
import { useMyCourseStore } from '~/stores/user/myCourse'
import type { Course } from '~/types/browsing'

const props = defineProps<{ course: Course }>()

const isSaved = ref<boolean>(false)
const store = useMyCourseStore()

const { $axiosApi, $toast, $i18n } = useNuxtApp()
const { courses } = storeToRefs(store)

const savedCourseToList = async (courseUUID: string) => {
  try {
    const { data } = await $axiosApi.post(`/courses/${courseUUID}/save`)

    isSaved.value = true

    $toast.success($i18n.t(data.message))
  } catch (error: any) {
    if (error.response?.status === 401) {
      return useRouter().push({ path: '/auth/sign-in' })
    } else {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }
}

const removeCourseFromList = async (courseUUID: string) => {
  try {
    const { data } = await $axiosApi.delete(`/courses/${courseUUID}/remove`)

    isSaved.value = false

    $toast.success($i18n.t(data.message))
  } catch (error: any) {
    if (error.response?.status === 401) {
      return useRouter().push({ path: '/auth/sign-in' })
    } else {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }
}

const checkCourseIsSaved = (courseId: number): boolean | void => {
  if (!courses.value?.data?.length) return false

  isSaved.value = courses.value?.data?.some((course) => course.id === courseId)
}

onMounted(() => checkCourseIsSaved(props.course?.id))

watch(
  () => courses.value,
  () => checkCourseIsSaved(props.course?.id)
)
</script>

<template>
  <div
    class="relative flex flex-col bg-white border border-gray-300 shadow-sm rounded-xl p-5 overflow-hidden"
  >
    <img class="w-full h-auto rounded-xl" :src="course?.thumbnail" alt="Course Thumbnail" />
    <div class="p-4 md:p-5">
      <h3 class="text-md font-bold text-gray-700 line-clamp-2">
        {{ course?.title }}
      </h3>

      <div class="flex items-center justify-between my-5">
        <div class="space-x-2">
          <img
            class="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
            :src="course?.instructor?.avatar"
            alt="Instructor Avatar"
          />
          <span class="text-xs font-semibold text-gray-500">
            {{ course?.instructor?.name }}
          </span>
        </div>

        <div>
          <button
            type="button"
            @click="isSaved ? removeCourseFromList(course?.uuid) : savedCourseToList(course?.uuid)"
          >
            <span v-if="isSaved" class="text-yellow-500">
              <i class="fa-solid fa-bookmark"></i>
            </span>
            <span v-else class="text-gray-600">
              <i class="fa-regular fa-bookmark"></i>
            </span>
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between font-medium">
        <span class="mt-5 text-xs text-gray-500">
          <i class="fa-solid fa-film"></i>
          {{ course?.total_lesson }} Lessons
        </span>
        <span class="mt-5 text-xs text-gray-500">
          <i class="fa-solid fa-clock"></i>
          {{ course?.duration }}
        </span>
        <span class="mt-5 text-xs text-gray-500 capitalize">
          <i class="fa-solid fa-chart-simple"></i>
          {{ course?.level === 'all_levels' ? 'All Levels' : course?.level }}
        </span>
      </div>
    </div>
  </div>
</template>
