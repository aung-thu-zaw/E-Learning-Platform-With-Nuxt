<script setup lang="ts">
import { useSavedCourseStore } from '~/stores/e-learning/savedCourse'
import type { Course } from '~/types/browsing'

const props = defineProps<{ course: Course }>()

const isSaved = ref<boolean>(props.course.is_saved)
const store = useSavedCourseStore()
const localePath = useLocalePath()

const toggleSavedCourse = async () => {
  if (isSaved.value) {
    await store.removeCourseFromList(props.course?.uuid)
  } else {
    await store.savedCourseToList(props.course?.uuid)
  }

  isSaved.value = !isSaved.value
}
</script>

<template>
  <div
    class="relative flex flex-col bg-white border border-gray-300 shadow-sm rounded-xl p-5 overflow-hidden"
  >
    <img class="w-full h-auto rounded-xl" :src="course?.thumbnail" alt="Course Thumbnail" />
    <div class="p-4 md:p-5">
      <NuxtLink
        :to="localePath(`/courses/${course.slug}`)"
        class="text-md font-bold text-gray-700 line-clamp-2 hover:text-yellow-500 transition-all"
      >
        {{ course?.title }}
      </NuxtLink>

      <div class="flex items-center justify-between my-5">
        <NuxtLink :to="localePath(`/user/${course.instructor.username}`)" class="space-x-2">
          <img
            class="inline-block h-[2.375rem] w-[2.375rem] rounded-full object-cover"
            :src="course?.instructor?.avatar"
            alt="Instructor Avatar"
          />
          <span class="text-xs font-semibold text-gray-600">
            {{ course?.instructor?.name }}
          </span>
        </NuxtLink>

        <div>
          <button type="button" @click="toggleSavedCourse">
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
~/stores/user/myLearning
