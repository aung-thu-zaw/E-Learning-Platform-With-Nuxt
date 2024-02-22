<script setup lang="ts">
import HorizontalBlogCard from '~/components/Cards/HorizontalBlogCard.vue'
import BlogAdvertisement from '~/components/Banners/BlogAdvertisement.vue'
import Pagination from '~/components/Paginations/BlogPagination.vue'
import type { BlogPaginate } from '~/types/blog'

import { useBlogStore } from '~/stores/e-learning/blog'

const store = useBlogStore()
const route = useRoute()
const { blogs } = storeToRefs(store)

useHead({ title: 'Blogs' })

definePageMeta({ layout: 'blog-layout' })

onMounted(async () => await store.getCategoryBlogs(route?.params?.category.toString()))

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
      <div class="bg-white py-16 space-y-10">
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

      <div class="bg-gray-100 pt-12">
        <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div class="grid lg:grid-cols-2 gap-6">
            <HorizontalBlogCard v-for="blog in blogs?.data" :key="blog?.id" :blog="blog" />
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
