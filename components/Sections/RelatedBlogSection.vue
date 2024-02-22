<script setup lang="ts">
import BlogCard from '~/components/Cards/BlogCard.vue'
import type { Blog } from '~/types/blog'

defineProps<{ relatedBlogs: Blog[] }>()
</script>

<template>
  <section id="related-blogs">
    <h1 class="text-2xl md:text-4xl font-bold text-gray-700 px-5 md:px-20 mb-5">Related Blogs</h1>
    <div class="max-w-[85rem] mx-auto px-4 py-8">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard v-for="blog in relatedBlogs" :key="blog?.id" :blog="blog" />
      </div>
    </div>
  </section>
</template>
