<script setup lang="ts">
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
import VideoPagination from '~/components/Paginations/VideoPagination.vue'
import BrowseCourseSearchBox from '~/components/Filters/BrowseCourseSearchBox.vue'
import BrowseCourseFilterBy from '~/components/Filters/BrowseCourseFilterBy.vue'
import BrowseCourseSortBy from '~/components/Filters/BrowseCourseSortBy.vue'
import { useBrowsingStore } from '~/stores/e-learning/browsing'

useHead({ title: 'Browse' })

definePageMeta({ layout: 'app-layout' })

const store = useBrowsingStore()
const { categories, subcategories } = storeToRefs(store)
</script>

<template>
  <section class="py-12">
    <div class="flex flex-col md:flex-row items-start container mx-auto md:space-x-5">
      <div class="w-full md:w-3/12 p-5 space-y-5">
        <a
          class="bg-yellow-600 text-white font-bold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-yellow-500 block"
        >
          All Courses
        </a>

        <div v-for="category in categories" :key="category?.id">
          <div class="px-5">
            <h3
              class="text-xs font-bold uppercase text-gray-600 border-b border-b-gray-400 py-3 mb-3"
            >
              {{ category?.name }}
            </h3>
          </div>

          <a
            v-for="subcategory in subcategories"
            v-show="subcategory.category_id === category.id"
            :key="subcategory?.id"
            class="text-gray-700 font-bold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all"
          >
            {{ subcategory?.name }}
          </a>
        </div>
      </div>
      <div class="w-full md:w-9/12 p-5 space-y-10">
        <div
          class="border px-10 py-14 rounded-md space-y-5"
          style="
            background-image: url('https://luukminkman.com/media/filer_public_thumbnails/filer_public/bb/2c/bb2c853b-d424-4360-9510-ca87d61b6fc0/main_img.jpg__700x700_q85_subsampling-2.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            background-color: rgba(0, 0, 0, 0.6);
            background-blend-mode: overlay;
          "
        >
          <h1 class="font-bold text-3xl text-white">Animation</h1>

          <p class="text-white font-medium text-md">
            Find what fascinates you as you explore these animation classes.
          </p>

          <!-- <button
              class="bg-yellow-600 px-5 py-3 rounded-md text-white text-xs font-semibold hover:bg-yellow-500 duration-200 transition-all"
            >
              <i class="fa-solid fa-crown"></i>
              Get Premium
            </button> -->

          <button
            class="bg-yellow-600 px-5 py-3 rounded-md text-white text-xs font-semibold hover:bg-yellow-500 duration-200 transition-all"
          >
            <i class="fa-solid fa-flag"></i>
            Start For Free
          </button>
        </div>

        <div class="flex flex-wrap items-center space-x-3">
          <p class="font-bold text-sm text-gray-700 mb-3">Related Skills :</p>

          <button
            class="border text-xs px-3 py-1 font-bold mb-3 rounded-[4px] border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
          >
            2d Animation
          </button>
          <button
            class="border text-xs px-3 py-1 font-bold mb-3 rounded-[4px] border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
          >
            3D Animation
          </button>
          <button
            class="border text-xs px-3 py-1 font-bold mb-3 rounded-[4px] border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
          >
            3D Design
          </button>
          <button
            class="border text-xs px-3 py-1 font-bold mb-3 rounded-[4px] border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
          >
            3D Rendering
          </button>
          <button
            class="border text-xs px-3 py-1 font-bold mb-3 rounded-[4px] border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
          >
            Adobe After Effects
          </button>
          <button
            class="border text-xs px-3 py-1 font-bold mb-3 rounded-[4px] border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
          >
            After Effects
          </button>
          <button
            class="border text-xs px-3 py-1 font-bold mb-3 rounded-[4px] border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
          >
            Blender
          </button>
          <button
            class="border text-xs px-3 py-1 font-bold mb-3 rounded-[4px] border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
          >
            3d Character
          </button>
          <button
            class="border text-xs px-3 py-1 font-bold mb-3 rounded-[4px] border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
          >
            Motion Graphics
          </button>
        </div>

        <div class="border-t border-b py-5 border-gray-300 flex items-center justify-between">
          <BrowseCourseSearchBox />

          <div class="flex items-center space-x-3">
            <BrowseCourseSortBy />
            <BrowseCourseFilterBy />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
        </div>

        <div class="flex items-center justify-center py-8">
          <VideoPagination />
        </div>
      </div>
    </div>
  </section>
</template>
