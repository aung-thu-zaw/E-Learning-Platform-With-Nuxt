<script setup lang="ts">
import SavedCourseDropdown from '~/components/Dropdowns/SavedCourseDropdown.vue'
import CardProgressBar from '~/components/ProgressBars/CardProgressBar.vue'
</script>

<template>
  <a class="group rounded-xl overflow-hidden block border bg-white shadow" href="#">
    <div class="sm:flex">
      <div class="flex-shrink-0 relative flex flex-col items-center justify-between sm:w-60">
        <div class="rounded-l-xl overflow-hidden w-full">
          <img
            class="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 start-0 object-cover rounded-l-xl"
            src="https://cdn.elearningindustry.com/wp-content/uploads/2020/08/5-ways-to-improve-your-course-cover-design-1024x575.png"
            alt="Image Description"
          />
        </div>

        <div class="z-40 w-full">
          <CardProgressBar />
        </div>
      </div>
      <div class="grow mt-4 sm:mt-0 px-6 py-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-800 line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, nulla explicabo.
            Possimus similique dolor molestiae ipsam magni impedit iste error id? Laudantium tenetur
            reprehenderit commodi velit, dolorum debitis eum ad.
          </h3>

          <SavedCourseDropdown />
        </div>

        <div class="flex items-center justify-between my-5">
          <div class="">
            <img
              class="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Image Description"
            />
            <span class="text-xs font-semibold text-gray-500 ml-2">Aung Thu Zaw</span>
          </div>
          <div>
            <span class="cursor-pointer">
              <i class="fa-regular fa-bookmark"></i>
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between font-medium">
          <span class="mt-5 text-xs text-gray-500">
            <i class="fa-solid fa-clock"></i> 7 hours 49 minutes left
          </span>

          <span class="mt-5 text-xs text-gray-500">
            <i class="fa-solid fa-user-tie"></i> 12,000 Students
          </span>
        </div>
      </div>
    </div>
  </a>
</template>
