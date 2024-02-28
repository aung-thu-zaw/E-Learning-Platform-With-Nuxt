<script setup lang="ts">
import BlueBadge from '~/components/Badges/BlueBadge.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
</script>

<template>
  <a class="group overflow-hidden block bg-white rounded-lg border" href="#">
    <div class="sm:flex">
      <div class="flex-shrink-0 relative overflow-hidden w-full h-52 sm:w-72">
        <img
          class="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 start-0 object-cover"
          src="https://cdn.elearningindustry.com/wp-content/uploads/2020/08/5-ways-to-improve-your-course-cover-design-1024x575.png"
          alt="Image Description"
        />
      </div>

      <div class="grow mt-4 sm:mt-0 px-6 py-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-800 line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </h3>

          <div class="min-w-[100px]">
            <NormalButton>
              <i class="fa-solid fa-edit"></i>
              Edit
            </NormalButton>
          </div>
        </div>

        <div class="flex items-center space-x-5 font-medium">
          <span class="mt-5 text-xs text-gray-600">
            <i class="fa-solid fa-user mr-1.5"></i> 58 Students
          </span>
          <span class="mt-5 text-xs text-gray-600">
            <i class="fa-solid fa-list mr-1.5"></i>
            Creative
          </span>
          <span class="mt-5 text-xs text-gray-600">
            <i class="fa-solid fa-circle-check mr-1.5"></i>
            Published
          </span>
        </div>
      </div>
    </div>
  </a>
</template>
