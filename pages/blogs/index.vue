<script setup lang="ts">
import BlogHero from '~/components/Headers/BlogHero.vue'
import BlogAdvertisement from '~/components/Banners/BlogAdvertisement.vue'
import BlogCard from '~/components/Cards/BlogCard.vue'
import BlogLayout from '~/layouts/BlogLayout.vue'

useHead({ title: 'Blogs' })
</script>

<template>
  <BlogLayout>
    <BlogHero />

    <BlogAdvertisement />

    <section>
      <div
        class="max-w-[85rem] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 px-6 md:py-16"
      >
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </section>
  </BlogLayout>
</template>
