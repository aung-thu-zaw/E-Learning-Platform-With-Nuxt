<script setup lang="ts">
import BlogHero from '~/components/Headers/BlogHero.vue'
import BlogAdvertisement from '~/components/Banners/BlogAdvertisement.vue'
import BlogCard from '~/components/Cards/BlogCard.vue'
import { useBlogStore } from '~/stores/e-learning/blog'
import { useLoadData } from '~/composables/useLoadData'
import type { BlogPaginate, Blog } from '~/types/blog'

const landmark = ref<HTMLElement | null>(null)
const store = useBlogStore()
const allBlog = ref<Blog[]>([])
const latestBlog = ref<Blog | null>(null)
const { blogs } = storeToRefs(store)

useHead({ title: 'Blogs' })

definePageMeta({ layout: 'blog-layout' })

const { allData, newPaginatedData, observeScroll } = useLoadData()

onMounted(async () => {
  await store.getBlogs()
  latestBlog.value = blogs?.value?.data[0] as Blog
  observeScroll(blogs.value, landmark.value)
  store.$patch({ blogs: newPaginatedData.value as BlogPaginate })
})

watch(allData, (newValue) => (allBlog.value = newValue as Blog[]))
</script>

<template>
  <div>
    <BlogHero :blog="latestBlog" />

    <BlogAdvertisement />

    <section>
      <div class="max-w-[85rem] mx-auto py-10 px-6 md:py-16">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard v-for="blog in allBlog" :key="blog?.id" :blog="blog" />
        </div>

        <div v-if="!blogs?.links?.next" class="mt-14">
          <p class="text-slate-700 text-sm font-semibold text-center">
            You have reached the end of the page.
          </p>
        </div>
        <div ref="landmark"></div>
      </div>
    </section>
  </div>
</template>
