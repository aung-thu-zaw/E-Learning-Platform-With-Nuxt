<script setup lang="ts">
import CourseCardProgressBar from '~/components/ProgressBars/CourseCardProgressBar.vue'
import SavedCourseDropdown from '~/components/Dropdowns/SavedCourseDropdown.vue'

const localePath = useLocalePath()
</script>

<template>
  <div
    class="relative flex flex-col bg-white border border-gray-300 shadow-sm rounded-xl p-5 overflow-hidden"
  >
    <img
      class="w-full h-auto rounded-xl"
      src="https://static.skillshare.com/cdn-cgi/image/width=448,quality=85,format=auto/uploads/video/thumbnails/a55e8fe7e520084daa76baf955056d9f/original"
      alt="Course Thumbnail"
    />

    <div class="p-4 md:p-5 space-y-6">
      <div class="space-y-6">
        <h3 class="text-md font-bold text-gray-700 line-clamp-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi laudantium, cupiditate
          cumque magnam iusto reprehenderit tempore labore. Perspiciatis quod incidunt accusantium,
          rerum nam deleniti, laudantium eos suscipit impedit repellendus repellat.
        </h3>

        <div class="flex items-center justify-between">
          <NuxtLink :to="localePath(`/`)" class="space-x-2">
            <img
              class="inline-block h-[2.375rem] w-[2.375rem] rounded-full object-cover"
              src="http://localhost:8000/storage/avatars/1710910111-user-3.jpg"
              alt="Instructor Avatar"
            />
            <span class="text-xs font-semibold text-gray-600"> Aung Thu Zaw </span>
          </NuxtLink>

          <div class="absolute top-8 right-8">
            <SavedCourseDropdown />
          </div>
        </div>

        <div class="flex items-center justify-between font-medium">
          <span class="text-xs text-gray-600">
            <i class="fa-solid fa-film"></i>
            30 Lessons
          </span>
          <span class="text-xs text-gray-600">
            <i class="fa-solid fa-clock"></i>
            1hour 2 min
          </span>
          <span class="text-xs text-gray-600 capitalize">
            <i class="fa-solid fa-chart-simple"></i>
            All Level
          </span>
        </div>
      </div>

      <div>
        <CourseCardProgressBar />
      </div>
    </div>
  </div>
</template>
