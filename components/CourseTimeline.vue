<script setup lang="ts">
import LearningPathCourseCard from '~/components/Cards/LearningPathCourseCard.vue'
</script>

<template>
  <div class="p-5 max-w-[50rem]">
    <!-- Item -->
    <div class="flex gap-x-3">
      <!-- Left Content -->
      <div class="min-w-20 text-end">
        <span class="text-sm text-green-600 font-semibold">Completed</span>
      </div>
      <!-- End Left Content -->
      <!-- Icon -->
      <div
        class="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] mb-1 after:bg-gray-300"
      >
        <div class="relative z-10 size-7 flex justify-center items-center">
          <div
            class="min-w-8 h-8 rounded-full border border-green-400 bg-green-200 flex items-center justify-center"
          >
            <span class="text-md font-bold text-green-600 animate-pulse">
              <i class="fa-solid fa-check"></i>
            </span>
          </div>
        </div>
      </div>
      <!-- End Icon -->

      <!-- Right Content -->
      <div class="grow pt-0.5 pb-8">
        <h3 class="flex gap-x-1.5 font-bold text-2xl text-gray-800">
          Artificial Intelligence for Beginners: How ChatGPT Works
        </h3>
        <p class="mt-1 text-sm text-gray-700 mb-5">
          Start with this accessible overview of ChatGPT in this course that will show you how it
          works from the inside out.
        </p>

        <LearningPathCourseCard />
      </div>
      <!-- End Right Content -->
    </div>
    <!-- End Item -->
    <!-- Item -->
    <div class="flex gap-x-3">
      <!-- Left Content -->
      <div class="min-w-20 text-end">
        <span class="text-sm text-yellow-500 font-semibold">On Going</span>
      </div>
      <!-- End Left Content -->
      <!-- Icon -->
      <div
        class="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] mb-1 after:bg-gray-300"
      >
        <div class="relative z-10 size-7 flex justify-center items-center">
          <div
            class="min-w-8 h-8 rounded-full border border-yellow-400 bg-yellow-200 flex items-center justify-center"
          >
            <span class="text-md font-bold text-yellow-600 animate-pulse">
              <i class="fa-solid fa-spinner animate-spin"></i>
            </span>
          </div>
        </div>
      </div>
      <!-- End Icon -->

      <!-- Right Content -->
      <div class="grow pt-0.5 pb-8">
        <h3 class="flex gap-x-1.5 font-bold text-2xl text-gray-800">
          Artificial Intelligence for Beginners: How ChatGPT Works
        </h3>
        <p class="mt-1 text-sm text-gray-700 mb-5">
          Start with this accessible overview of ChatGPT in this course that will show you how it
          works from the inside out.
        </p>

        <LearningPathCourseCard />
      </div>
      <!-- End Right Content -->
    </div>
    <!-- End Item -->
    <!-- Item -->
    <div class="flex gap-x-3">
      <!-- Left Content -->
      <div class="min-w-20 text-end">
        <span class="text-sm text-gray-600 font-semibold">Upcoming</span>
      </div>
      <!-- End Left Content -->
      <!-- Icon -->
      <div
        class="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] mb-1 after:bg-gray-300"
      >
        <div class="relative z-10 size-7 flex justify-center items-center">
          <div
            class="min-w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center"
          >
            <span class="text-md font-bold text-gray-600"> 3 </span>
          </div>
        </div>
      </div>
      <!-- End Icon -->

      <!-- Right Content -->
      <div class="grow pt-0.5 pb-8">
        <h3 class="flex gap-x-1.5 font-bold text-2xl text-gray-800">
          Artificial Intelligence for Beginners: How ChatGPT Works
        </h3>
        <p class="mt-1 text-sm text-gray-700 mb-5">
          Start with this accessible overview of ChatGPT in this course that will show you how it
          works from the inside out.
        </p>

        <LearningPathCourseCard />
      </div>
      <!-- End Right Content -->
    </div>
    <!-- End Item -->

    <!-- Item -->
    <div class="flex gap-x-3">
      <!-- Left Content -->
      <div class="min-w-20 text-end">
        <span class="text-sm text-gray-600 font-semibold">Upcoming</span>
      </div>
      <!-- End Left Content -->
      <!-- Icon -->
      <div
        class="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] mb-1 after:bg-gray-300"
      >
        <div class="relative z-10 size-7 flex justify-center items-center">
          <div
            class="min-w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center"
          >
            <span class="text-md font-bold text-gray-600"> 4 </span>
          </div>
        </div>
      </div>
      <!-- End Icon -->

      <!-- Right Content -->
      <div class="grow pt-0.5 pb-8">
        <h3 class="flex gap-x-1.5 font-bold text-2xl text-gray-800">
          Artificial Intelligence for Beginners: How ChatGPT Works
        </h3>
        <p class="mt-1 text-sm text-gray-700 mb-5">
          Start with this accessible overview of ChatGPT in this course that will show you how it
          works from the inside out.
        </p>

        <LearningPathCourseCard />
      </div>
      <!-- End Right Content -->
    </div>
    <!-- End Item -->

    <!-- Item -->
    <div class="flex gap-x-3">
      <!-- Left Content -->
      <div class="min-w-20 text-end">
        <span class="text-sm text-gray-600 font-semibold">Done</span>
      </div>
      <!-- End Left Content -->
      <!-- Icon -->
      <div>
        <div class="relative z-10 size-7 flex justify-center items-center">
          <div
            class="min-w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center"
          >
            <span class="text-md font-bold text-gray-600"> <i class="fa-solid fa-crown"></i> </span>
          </div>
        </div>
      </div>
      <!-- End Icon -->

      <!-- Right Content -->
      <div class="grow pt-0.5 pb-8">
        <h3 class="flex gap-x-1.5 font-bold text-2xl text-gray-800">
          Congratulations! You’re All Done.
        </h3>
        <p class="mt-1 text-sm text-gray-700 mb-5">
          You did it! You’ve completed the full Learning Path. We can’t wait to see where these
          skills take you next.
        </p>
      </div>
      <!-- End Right Content -->
    </div>
    <!-- End Item -->
  </div>
</template>
