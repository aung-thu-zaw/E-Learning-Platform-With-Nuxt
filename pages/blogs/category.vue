<script setup lang="ts">
import HorizontalBlogCard from '~/components/Cards/HorizontalBlogCard.vue'
import BlogAdvertisement from '~/components/Banners/BlogAdvertisement.vue'
import BlogPagination from '~/components/Paginations/BlogPagination.vue'

// useHead({ title: 'Home' })
</script>

<template>
  <NuxtLayout name="blog-layout">
    <section>
      <div class="bg-white py-16 space-y-6">
        <h1 class="font-bold text-center">
          <span
            class="text-5xl md:text-6xl text-gray-700 [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)]"
          >
            Teach
          </span>
          <span class="text-yellow-500">
            <i class="fa-solid fa-circle"></i>
          </span>
        </h1>
        <p
          class="text-center font-medium text-md md:text-lg text-gray-500 max-w-[1200px] mx-auto px-5"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam non, modi pariatur fuga
          error placeat eos deserunt fugit magnam repellat aliquid necessitatibus similique sunt
          iste culpa accusantium dolor quae sequi!
        </p>
      </div>

      <div class="bg-gray-100 pt-12">
        <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div class="grid lg:grid-cols-2 gap-6">
            <HorizontalBlogCard />
            <HorizontalBlogCard />
            <HorizontalBlogCard />
            <HorizontalBlogCard />
            <HorizontalBlogCard />
            <HorizontalBlogCard />
            <HorizontalBlogCard />
            <HorizontalBlogCard />
            <HorizontalBlogCard />
            <HorizontalBlogCard />
          </div>

          <div class="mt-20 flex items-center justify-center">
            <BlogPagination />
          </div>
        </div>
      </div>
    </section>

    <BlogAdvertisement />
  </NuxtLayout>
</template>
