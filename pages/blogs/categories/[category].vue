<script setup lang="ts">
import HorizontalBlogCard from '~/components/Cards/HorizontalBlogCard.vue'
import HorizontalBlogCardSkeleton from '~/components/Skeletons/HorizontalBlogCardSkeleton.vue'
import BlogAdvertisement from '~/components/Banners/BlogAdvertisement.vue'
import Pagination from '~/components/Paginations/BlogPagination.vue'
import type { BlogPaginate } from '~/types/blog'
import { useBlogStore } from '~/stores/e-learning/blog'

useHead({ title: 'Blogs' })

definePageMeta({ layout: 'blog-layout' })

const store = useBlogStore()
const category = useRoute()?.params?.category.toString()

const { blogs } = storeToRefs(store)

onMounted(async () => await store.getCategoryBlogs(category))

const handleUpdatedData = (data: BlogPaginate) => {
  store.$patch({ blogs: data })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div>
    <section>
      <div class="bg-white py-16">
        <div v-if="blogs?.data?.length" class="space-y-10">
          <h1 class="font-bold text-center">
            <span
              class="text-5xl md:text-6xl text-gray-700 [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)]"
            >
              {{ blogs?.data[0]?.category?.name }}
            </span>
            <span class="text-yellow-500">
              <i class="fa-solid fa-circle"></i>
            </span>
          </h1>
          <p
            class="text-center font-medium text-md md:text-lg text-gray-500 max-w-[1200px] mx-auto px-5"
          >
            {{ blogs?.data[0]?.category?.description }}
          </p>
        </div>
        <div v-else class="space-y-10">
          <div class="h-10 bg-gray-200 rounded-full w-full mb-2 max-w-[600px] mx-auto"></div>

          <div class="max-w-[1200px] mx-auto px-5">
            <div class="h-4 mx-auto bg-gray-200 rounded-full w-full mt-5 mb-3"></div>
            <div class="h-4 mx-auto bg-gray-200 rounded-full w-[80%] mb-3"></div>
            <div class="h-4 mx-auto bg-gray-200 rounded-full w-[50%] mb-3"></div>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 pt-12">
        <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div>
            <div v-if="blogs?.data?.length" class="grid lg:grid-cols-2 gap-6">
              <HorizontalBlogCard v-for="blog in blogs?.data" :key="blog?.id" :blog="blog" />
            </div>

            <div v-else class="grid lg:grid-cols-2 gap-6">
              <HorizontalBlogCardSkeleton v-for="index in 4" :key="index" />
            </div>
          </div>

          <div v-if="blogs" class="mt-20 flex items-center justify-center">
            <Pagination :data="blogs" @updated-data="handleUpdatedData" />
          </div>
        </div>
      </div>
    </section>

    <BlogAdvertisement />
  </div>
</template>
