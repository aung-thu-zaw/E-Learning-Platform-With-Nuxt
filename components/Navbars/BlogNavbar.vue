<script setup lang="ts">
import LanguageDropdown from '~/components/Dropdowns/LanguageDropdown.vue'
import { useBlogStore } from '~/stores/e-learning/blog'

defineProps<{ isOpenNavSearchBox: boolean }>()
const localePath = useLocalePath()
const store = useBlogStore()
const route = useRoute()
const { categories } = storeToRefs(store)
const emit = defineEmits(['updatedSearch'])

onMounted(async () => await store.getResources())

const handleSearchBox = () => emit('updatedSearch')
</script>

<template>
  <div
    class="sticky top-0 bg-white flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 transition-all duration-200 border-b"
  >
    <nav
      class="max-w-[85rem] w-full mx-auto px-4 md:flex md:items-center md:justify-between"
      aria-label="Global"
    >
      <div class="flex items-center justify-between md:w-auto min-w-[200px] w-full">
        <NuxtLink :to="localePath('/blogs')" class="flex-none text-xl font-bold text-gray-800">
          Learning Blog
        </NuxtLink>
        <div class="md:hidden flex items-center space-x-3">
          <button
            type="button"
            class="flex font-bold text-xs bg-gray-300 p-3 text-white rounded-full w-8 h-8 items-center justify-center hover:cursor-pointer hover:bg-yellow-400 transition-all"
            :class="{ 'bg-yellow-500': isOpenNavSearchBox }"
            @click="handleSearchBox"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>

          <div>
            <LanguageDropdown />
          </div>

          <button
            type="button"
            class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-transparent text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-collapse="#navbar-collapse-with-animation"
            aria-controls="navbar-collapse-with-animation"
            aria-label="Toggle navigation"
          >
            <div class="hs-collapse-open:hidden">
              <div class="flex items-center space-x-1">
                <span> {{ $t('Menu') }} </span>
                <svg
                  class="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              </div>
            </div>
            <div class="hs-collapse-open:block hidden">
              <div class="flex items-center space-x-1">
                <span> {{ $t('Close') }} </span>
                <svg
                  class="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div
        id="navbar-collapse-with-animation"
        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
      >
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div
            class="flex flex-col gap-5 mt-5 md:flex-row md:items-center md:justify-center md:mt-0 md:ps-5 text-md w-full md:space-x-6"
          >
            <NuxtLink
              v-for="(category, index) in categories"
              :key="index"
              :to="localePath('/blogs/categories/' + category?.slug + '?page=1')"
              class="font-bold text-gray-800 hover:text-gray-600"
              :class="{
                'text-yellow-500 hover:text-yellow-600': category?.slug === route?.params?.category
              }"
            >
              {{ category?.name }}
            </NuxtLink>
          </div>

          <div
            class="flex gap-5 mt-5 md:flex-row md:items-center md:justify-end md:mt-0 md:ps-5 w-auto text-md min-w-[300px]"
          >
            <button
              type="button"
              class="hidden lg:flex font-bold text-xs p-3 bg-gray-300 text-white rounded-full w-8 h-8 items-center justify-center hover:cursor-pointer hover:bg-yellow-400 transition-all"
              :class="{ 'bg-yellow-500': isOpenNavSearchBox }"
              @click="handleSearchBox"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>

            <div class="hidden lg:flex">
              <LanguageDropdown />
            </div>

            <div
              class="flex items-center justify-start font-bold text-gray-300 hover:text-gray-300 space-x-3"
            >
              <NuxtLink
                :to="localePath('/')"
                type="button"
                class="text-xs rounded-md font-semibold bg-yellow-500 px-4 py-2.5 text-white hover:bg-yellow-400 transition-all"
              >
                <i class="fa-solid fa-home mr-1"></i>
                {{ $t('Go Back To Home') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
