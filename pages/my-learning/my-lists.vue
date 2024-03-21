<script setup lang="ts">
import EnrolledCourseCard from '~/components/Cards/EnrolledCourseCard.vue'

useHead({ title: 'My Lists' })

definePageMeta({ layout: 'my-learning-layout', middleware: 'auth' })
</script>

<template>
  <div class="space-y-10">
    <div v-for="index in 3" :key="index" class="space-y-5">
      <div class="space-y-3.5 text-gray-800">
        <div class="flex items-center space-x-5">
          <h1 class="text-xl font-extrabold">Web Development</h1>
          <div class="flex items-center justify-center space-x-3 text-sm text-gray-700">
            <button type="button" class="hover:text-blue-600 duration-150">
              <i class="fa-solid fa-edit"></i>
            </button>
            <button type="button" class="hover:text-red-600 duration-150">
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <button type="button" class="hover:text-green-600 duration-150">
              <i class="fa-solid fa-circle-check"></i>
            </button>
          </div>
        </div>

        <p class="text-sm font-semibold">
          Complete By Date - 12, September 2023 - 15, September 2023
        </p>

        <p class="text-sm font-semibold">
          Status -
          <span class="text-green-600">
            <i class="fa-solid fa-circle-check mr-.5"></i>
            Complete
          </span>
        </p>

        <p class="text-sm font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate harum nobis itaque at
          adipisci est deleniti officiis non alias dolorem? Eos quas ullam maxime aspernatur
          laboriosam dignissimos, iste reiciendis, temporibus quo sed omnis rerum consequatur natus
          porro sunt. Cum animi illum, tempore iste dolor vel deserunt veritatis assumenda quisquam.
          Tenetur suscipit est aliquid assumenda quae magni, laudantium laborum neque soluta
          exercitationem a explicabo facere. Delectus numquam pariatur dolorum quae, officiis itaque
          corrupti, nemo obcaecati quam, ipsum in eveniet beatae dolores sint dignissimos dolore.
          Consequuntur eius quas ad ex repudiandae deleniti, provident assumenda velit reiciendis,
          dolor corrupti expedita tempora iure nam!
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <EnrolledCourseCard v-for="index in 6" :key="index" />
      </div>

      <div class="flex items-center justify-center">
        <!-- <button type="button" class="text-center text-xs font-bold text-yellow-600">
          See More <i class="fa-solid fa-chevron-down"></i>
        </button> -->
        <button type="button" class="text-center text-xs font-bold text-yellow-600">
          See Less <i class="fa-solid fa-chevron-up"></i>
        </button>
      </div>
    </div>
    <!-- <div class="text-center py-20 space-y-10">
      <p class="font-bold text-gray-700">{{ $t("You haven't created any lists yet.") }}</p>

      <NuxtLink
        :to="localePath('/browse')"
        class="px-5 py-3 inline-block text-xs font-semibold bg-yellow-500 rounded-md hover:bg-yellow-600 text-white active:animate-press duration-150"
      >
        {{ $t('Browse Courses') }}
        <i class="fa-solid fa-arrow-right ml-3"></i>
      </NuxtLink>
    </div> -->
  </div>
</template>
