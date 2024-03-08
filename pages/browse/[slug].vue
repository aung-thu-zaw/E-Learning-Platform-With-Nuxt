<script setup lang="ts">
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
import Pagination from '~/components/Paginations/AppPagination.vue'
import SubcategoryDescriptionCard from '~/components/Cards/SubcategoryDescriptionCard.vue'
import BrowseCourseSearchBox from '~/components/Filters/BrowseCourseSearchBox.vue'
import BrowseCourseFilterBy from '~/components/Filters/BrowseCourseFilterBy.vue'
import BrowseCourseSortBy from '~/components/Filters/BrowseCourseSortBy.vue'
import { useBrowsingStore } from '~/stores/e-learning/browsing'
import { useURLQueryString } from '@/composables/useURLQueryString'
import type { CoursePaginate } from '~/types/course'
import type { BrowseCourseQuery } from '~/types/query'

definePageMeta({ layout: 'app-layout' })

const router = useRouter()
const route = useRoute()
const store = useBrowsingStore()
const slug = route?.params?.slug.toString()

const { categories, subcategories, tags, courses } = storeToRefs(store)
const { browseCourseQueryString } = useURLQueryString()

const filteredSubcategory = computed(() =>
  subcategories.value?.find((subcategory) => subcategory.slug === slug)
)

const filteredSkillTags = computed(() => {
  return tags.value?.filter(
    (skillTag) =>
      Number(skillTag?.category_id) === Number(filteredSubcategory.value?.category_id) &&
      Number(skillTag?.subcategory_id) === Number(filteredSubcategory.value?.id)
  )
})

onMounted(async () => {
  await store.getBrowsingResources()
  if (filteredSubcategory?.value) {
    await store.getCourses(
      filteredSubcategory?.value?.id,
      browseCourseQueryString.value as BrowseCourseQuery
    )

    useHead({ title: filteredSubcategory?.value?.name })
  }
})

const handleUpdatedData = (data: CoursePaginate) => {
  store.$patch({ courses: data })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleTag = (slug: string) =>
  router.push({
    query: { ...browseCourseQueryString.value, tag: route.query?.tag === slug ? undefined : slug }
  })

watch(
  () => route?.query,
  async () => {
    if (filteredSubcategory?.value) {
      await store.getCourses(
        filteredSubcategory?.value?.id,
        browseCourseQueryString.value as BrowseCourseQuery
      )
    }
  }
)
</script>

<template>
  <section class="py-12">
    <div class="flex flex-col md:flex-row items-start container mx-auto md:space-x-5">
      <div class="w-full md:w-3/12 p-5 space-y-5">
        <a
          class="text-gray-700 font-bold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        >
          All Courses
        </a>

        <div v-for="category in categories" :key="category?.id">
          <div class="px-5">
            <h3
              class="text-xs font-bold uppercase text-gray-600 border-b border-b-gray-400 py-3 mb-3"
            >
              {{ category?.name }}
            </h3>
          </div>

          <NuxtLink
            v-for="subcategory in subcategories"
            v-show="subcategory.category_id === category.id"
            :key="subcategory?.id"
            :to="`/browse/${subcategory.slug}`"
            class="text-gray-700 font-bold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
            :class="{ 'bg-yellow-500 hover:bg-yellow-600 text-white': subcategory.slug === slug }"
          >
            {{ subcategory?.name }}
          </NuxtLink>
        </div>
      </div>
      <div class="w-full md:w-9/12 p-5 space-y-10">
        <SubcategoryDescriptionCard :subcategory="filteredSubcategory ?? null" />

        <div class="flex flex-wrap items-center my-3">
          <p class="font-bold text-sm text-gray-700 mb-3 mr-3">Related Skills :</p>

          <div class="flex items-center flex-wrap">
            <button
              v-for="(tag, index) in filteredSkillTags"
              :key="index"
              type="button"
              class="border text-xs px-3 py-1 font-bold mb-2 mr-2 rounded-[4px] border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
              :class="{
                'bg-yellow-500 text-white border-yellow-500': tag.slug === route?.query?.tag
              }"
              @click="handleTag(tag?.slug)"
            >
              {{ tag?.name }}
              <span v-show="route.query.tag === tag.slug" class="ml-1">
                <i class="fa-solid fa-xmark"></i>
              </span>
            </button>
          </div>
        </div>

        <div
          class="border-t border-b py-5 border-gray-300 flex items-center justify-between overflow-scroll px-1.5"
        >
          <BrowseCourseSearchBox
            :placeholder="'Search courses about ' + filteredSubcategory?.name.toLowerCase()"
          />

          <div class="flex items-center space-x-3">
            <BrowseCourseSortBy />
            <BrowseCourseFilterBy />
          </div>
        </div>

        <div v-if="courses?.data?.length" class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <VideoCourseCard v-for="course in courses?.data" :key="course.id" :course="course" />
        </div>

        <div v-else class="py-20">
          <p class="text-center font-bold text-md text-yellow-600">
            <i class="fa-solid fa-file-circle-xmark"></i>
            "We're sorry we can't find any matches for your filter term.
          </p>
        </div>

        <div v-if="courses" class="flex items-center justify-center py-8">
          <Pagination :data="courses" @updated-data="handleUpdatedData" />
        </div>
      </div>
    </div>
  </section>
</template>
