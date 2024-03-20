<script setup lang="ts">
import BlogAdvertisement from '~/components/Banners/BlogAdvertisement.vue'
import BlogSearchBox from '~/components/Forms/SearchBoxs/BlogSearchBox.vue'
import BlogCard from '~/components/Cards/BlogCard.vue'
import { useBlogStore } from '~/stores/e-learning/blog'
import Pagination from '~/components/Paginations/BlogPagination.vue'
import { useURLQueryString } from '@/composables/useURLQueryString'
import type { BlogPaginate } from '~/types/blog'

useHead({ title: 'Search Result' })

definePageMeta({ layout: 'blog-layout' })

const route = useRoute()
const store = useBlogStore()

const { blogs } = storeToRefs(store)
const { blogPageQueryString } = useURLQueryString()

onMounted(async () => await store.getBlogs(blogPageQueryString.value))

const handleUpdatedData = (data: BlogPaginate) => {
  store.$patch({ blogs: data })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

watch(
  () => route?.query,
  async () => {
    await store.getBlogs(blogPageQueryString.value)
  }
)
</script>

<template>
  <div>
    <div class="bg-white py-16 space-y-20 px-10">
      <div class="font-bold text-center flex items-end justify-center">
        <h1
          class="text-2xl md:text-3xl text-gray-700 [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)] flex items-center"
        >
          <i class="fa-solid fa-magnifying-glass text-xl mr-2"></i>
          {{ $t('Search Result') }} : &nbsp;
          <span class="[text-shadow:0]">{{ route?.query?.query }} </span>
        </h1>

        <span class="text-yellow-500 ml-1">
          <i class="fa-solid fa-circle"></i>
        </span>
      </div>

      <div class="max-w-[1000px] mx-auto">
        <BlogSearchBox />
      </div>
    </div>

    <section>
      <div class="max-w-[85rem] mx-auto py-10 px-6 md:py-16">
        <div v-if="blogs?.data?.length">
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogCard v-for="blog in blogs?.data" :key="blog?.id" :blog="blog" />
          </div>

          <div v-if="blogs" class="mt-20 flex items-center justify-center">
            <Pagination :data="blogs" @updated-data="handleUpdatedData" />
          </div>
        </div>

        <div v-else class="py-10">
          <p class="text-center font-bold text-lg text-yellow-600">
            <i class="fa-solid fa-magnifying-glass"></i>
            {{ $t("We're sorry we can't find any matches for your search term.") }}
          </p>
        </div>
      </div>
    </section>

    <BlogAdvertisement />
  </div>
</template>
