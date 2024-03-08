<script setup lang="ts">
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
import LearningPathCollectionCard from '~/components/Cards/LearningPathCollectionCard.vue'
import { useSearchStore } from '~/stores/e-learning/search'
import { useURLQueryString } from '~/composables/useURLQueryString'

useHead({ title: 'Search' })

definePageMeta({ layout: 'app-layout' })

const store = useSearchStore()
const route = useRoute()
const localePath = useLocalePath()
const query = ref<string>(route?.query?.query?.toString() ?? '')

const { courses, learningPaths } = storeToRefs(store)
const { searchQueryString } = useURLQueryString()

onMounted(async () => await store.getSearchResult({ ...searchQueryString.value }))

watch(
  () => route.query,
  async () => {
    await store.getSearchResult({ ...searchQueryString.value })
    query.value = route.query?.query?.toString() ?? ''
  }
)
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-5 space-y-10">
      <div class="flex flex-col items-start">
        <h1 class="font-bold text-3xl text-gray-800 mb-10">{{ query }}</h1>

        <div
          v-if="courses?.data?.length || learningPaths?.data?.length"
          class="flex items-center space-x-3"
        >
          <p class="font-bold text-sm text-gray-800">Filter By &nbsp; :</p>

          <NuxtLink
            :to="localePath(`/search/learning-paths?query=${query}`)"
            class="px-5 py-2.5 text-sm rounded-full font-semibold border border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white duration-200 transition-all hover:border-yellow-500"
          >
            Learning Paths
          </NuxtLink>

          <NuxtLink
            :to="localePath(`/search/courses?query=${query}`)"
            class="px-5 py-2.5 text-sm rounded-full font-semibold border border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white duration-200 transition-all hover:border-yellow-500"
          >
            Courses
          </NuxtLink>
        </div>
      </div>

      <div v-if="courses?.data?.length || learningPaths?.data?.length" class="space-y-10">
        <div>
          <div v-if="learningPaths?.data?.length" class="space-y-10">
            <div class="flex items-start justify-between md:px-0 px-5">
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <h1 class="font-bold text-gray-800 text-2xl">Learning Paths</h1>
                  <p class="font-semibold text-gray-700 text-sm">
                    ({{ learningPaths?.meta?.total }} Results)
                  </p>
                </div>
              </div>

              <NuxtLink
                :to="localePath(`/search/learning-paths?query=${query}`)"
                class="px-5 py-2.5 border border-gray-400 rounded-md text-xs font-bold text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all active:animate-press"
              >
                View All Learning Paths
                <i class="fa-solid fa-arrow-right ml-3"></i>
              </NuxtLink>
            </div>

            <div class="max-w-[85rem] mx-auto">
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <LearningPathCollectionCard
                  v-for="learningPath in learningPaths?.data.slice(0, 3)"
                  :key="learningPath?.id"
                  :learning-path="learningPath"
                />
              </div>
            </div>
          </div>
          <div v-else class="py-16">
            <p class="text-center font-bold text-md">
              Your search for "
              <span class="text-yellow-500"> {{ query }} </span> " didn't return any learning paths.
            </p>
          </div>
        </div>

        <hr />

        <div>
          <div v-if="courses?.data?.length" class="space-y-10">
            <div class="flex items-start justify-between md:px-0 px-5">
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <h1 class="font-bold text-gray-800 text-2xl">Courses</h1>
                  <p class="font-semibold text-gray-700 text-sm">
                    ({{ courses?.meta?.total }} Results)
                  </p>
                </div>
                <p class="text-sm font-medium text-gray-600">
                  Learn skills, tools, and techniques from industry experts and creative pros.
                </p>
              </div>

              <NuxtLink
                :to="localePath(`/search/courses?query=${query}`)"
                class="px-5 py-2.5 border border-gray-400 rounded-md text-xs font-bold text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all active:animate-press"
              >
                View All Classes
                <i class="fa-solid fa-arrow-right ml-3"></i>
              </NuxtLink>
            </div>

            <div class="max-w-[85rem] mx-auto">
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <VideoCourseCard
                  v-for="course in courses?.data"
                  :key="course?.id"
                  :course="course"
                />
              </div>
            </div>
          </div>
          <div v-else class="py-16">
            <p class="text-center font-bold text-md">
              Your search for "
              <span class="text-yellow-500"> {{ query }} </span> " didn't return any courses.
            </p>
          </div>
        </div>
      </div>

      <div v-else class="py-16 border bg-white rounded-md">
        <p class="text-center font-bold text-md">
          Your search for "
          <span class="text-yellow-500"> {{ query }} </span> " didn't return any results.
        </p>
      </div>
    </div>
  </section>
</template>
