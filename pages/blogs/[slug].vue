<script setup lang="ts">
import BlogAdvertisement from '~/components/Banners/BlogAdvertisement.vue'
import RecommendedCourseSection from '~/components/Sections/RecommendedCourseInBlogSection.vue'
import RelatedBlogSection from '~/components/Sections/RelatedBlogSection.vue'
import ScrollProgressBar from '~/components/ProgressBars/ScrollProgressBar.vue'
import { useBlogStore } from '~/stores/e-learning/blog'

const store = useBlogStore()
const route = useRoute()
const { blog, relatedBlogs } = storeToRefs(store)

definePageMeta({ layout: 'blog-layout' })

onMounted(async () => {
  await store.getBlog(route?.params?.slug.toString())
  useHead({ title: blog.value?.title })
})
</script>

<template>
  <div>
    <ScrollProgressBar />

    <section>
      <!-- Hero -->
      <div class="relative overflow-hidden">
        <div class="max-w-[70rem] mx-auto px-4 py-8 md:py-16">
          <h1 class="text-3xl md:text-5xl font-bold text-gray-800 text-center mb-10">
            {{ blog?.title }}
          </h1>

          <div class="flex items-center justify-between">
            <!-- Avatar -->
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  class="w-12 h-12 rounded-full"
                  :src="blog?.author?.avatar"
                  alt="Author Avatar"
                />
              </div>
              <div class="ms-2.5 sm:ms-4">
                <h4 class="text-md font-semibold text-gray-700">
                  {{ blog?.author?.display_name }}
                </h4>
                <p class="text-xs text-gray-600">{{ blog?.published_at }}</p>
              </div>
            </div>
            <!-- End Avatar -->

            <div class="flex items-center space-x-3">
              <!-- Facebook -->
              <img src="~/assets/svg/facebook-color.svg" alt="facebook" />

              <!-- Youtube -->
              <img src="~/assets/svg/youtube-color.svg" alt="youtube" />

              <!-- Twitter -->
              <img src="~/assets/svg/twitter-color.svg" alt="twitter" />

              <!-- Linked In -->
              <img src="~/assets/svg/linked-in-color.svg" alt="linked-in" />
            </div>
          </div>

          <div class="my-10 rounded-md border overflow-hidden p-2.5 shadow">
            <img :src="blog?.thumbnail" alt="Blog Thumbnail" class="w-full object-cover" />
          </div>

          <div class="mt-3">
            <div v-html="blog?.content"></div>
          </div>

          <div class="my-10 flex items-center">
            <p class="text-md font-semibold text-gray-700 mr-3">Share :</p>

            <div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a href="#" class="text-gray-600 hover:text-gray-900">
                <img src="~/assets/svg/facebook.svg" alt="facebook" />
                <span class="sr-only">Facebook page</span>
              </a>
              <a href="#" class="text-gray-600 hover:text-gray-900">
                <img src="~/assets/svg/instagram.svg" alt="instagram" />
                <span class="sr-only">Instagram page</span>
              </a>
              <a href="#" class="text-gray-600 hover:text-gray-900">
                <img src="~/assets/svg/twitter.svg" alt="twitter" />
                <span class="sr-only">Twitter page</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- End Hero -->
    </section>

    <RelatedBlogSection :related-blogs="relatedBlogs ?? []" />

    <RecommendedCourseSection />

    <BlogAdvertisement />
  </div>
</template>
