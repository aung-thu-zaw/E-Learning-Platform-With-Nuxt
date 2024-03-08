<script setup lang="ts">
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
import AddUserInterestSkillModal from '~/components/Modals/AddUserInterestSkillModal.vue'
import type { Course } from '~/types/browsing'

interface SkillTag {
  id: number
  name: string
  slug: string
  category: {
    id: number
    name: string
    slug: string
  }
  subcategory: {
    id: number
    name: string
    slug: string
  }
}

const followedTags = ref<SkillTag[] | null>(null)
const selectedTag = ref<SkillTag | null>(null)
const courses = ref<Course | null>(null)
const localePath = useLocalePath()

const { $axiosApi } = useNuxtApp()

const getAllUserInterestedTag = async () => {
  try {
    const { data } = await $axiosApi.get('/followed-tags')

    followedTags.value = data
    handleSelectTag(data[0])
  } catch (error: any) {
    console.error(error)
  }
}

const getInterestBeginnerCourse = async (tagId: number) => {
  try {
    const { data } = await $axiosApi.get(`/courses/interests/${tagId}/beginner`)

    courses.value = data
  } catch (error: any) {
    console.error(error)
  }
}

const handleSelectTag = (tag: SkillTag) => {
  selectedTag.value = tag
  getInterestBeginnerCourse(tag?.id)
}

onMounted(async () => await getAllUserInterestedTag())
</script>

<template>
  <section class="py-10">
    <div class="container mx-auto">
      <div class="flex items-start justify-between md:px-0 px-5 mb-10">
        <div class="space-y-3">
          <h1
            class="font-bold text-gray-800 text-3xl [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)]"
          >
            {{ $t('Explore Your Creative Interests') }}
          </h1>
          <p class="text-sm font-medium text-gray-600">
            {{
              $t(
                'Discover and customize your learning journey by adding tags that reflect your creative interests.'
              )
            }}
          </p>
        </div>

        <AddUserInterestSkillModal />
      </div>

      <div class="bg-gray-200 border px-10 pt-10 rounded-md">
        <div class="py-5 px-5 md:px-0 mx-auto flex items-center overflow-scroll mb-6 scrollbar">
          <button
            v-for="followedTag in followedTags"
            :key="followedTag?.id"
            type="button"
            class="text-xs font-semibold px-5 py-3 rounded-full mr-2 mb-2 text-gray-800 border border-gray-500 duration-200 transition-all w-auto inline-block flex-shrink-0"
            :class="{
              'bg-yellow-500 text-white border-yellow-500': followedTag?.id === selectedTag?.id
            }"
            @click="handleSelectTag(followedTag)"
          >
            {{ followedTag?.name }}
          </button>
        </div>

        <div class="space-y-3">
          <h1 class="font-bold text-2xl text-gray-800">Get Started in {{ selectedTag?.name }}</h1>

          <p class="text-gray-700 text-sm font-medium">
            Check out these great beginner classes or
            <NuxtLink
              :to="
                localePath(
                  `/browse/${selectedTag?.subcategory?.slug}?tag=${selectedTag?.slug}&page=1`
                )
              "
              class="text-yellow-600 underline lowercase"
            >
              view more {{ selectedTag?.name }} courses
            </NuxtLink>
          </p>
        </div>

        <div class="py-10 px-5 md:px-0 lg:py-14 mx-auto">
          <div class="grid lg:grid-cols-3 gap-5">
            <VideoCourseCard v-for="course in courses" :key="course?.id" :course="course" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
