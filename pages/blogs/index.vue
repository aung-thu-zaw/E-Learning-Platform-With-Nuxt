<script setup lang="ts">
import BlogHero from '~/components/Headers/BlogHero.vue'
import BlogAdvertisement from '~/components/Banners/BlogAdvertisement.vue'
import BlogCard from '~/components/Cards/BlogCard.vue'
import { useBlogStore } from '~/stores/e-learning/blog'

const store = useBlogStore()
const { blogs } = storeToRefs(store)

useHead({ title: 'Blogs' })

definePageMeta({ layout: 'blog-layout' })

onMounted(async () => await store.getBlogs())
</script>

<template>
  <div>
    <BlogHero />

    <BlogAdvertisement />

    <section>
      <div
        class="max-w-[85rem] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 px-6 md:py-16"
      >
        <BlogCard v-for="blog in blogs?.data" :key="blog?.id" :blog="blog" />
      </div>
    </section>
  </div>
</template>
