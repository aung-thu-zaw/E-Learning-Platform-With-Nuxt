<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

interface Slider {
  title: string
  description: string
  button: string
  url: string
  image: string
}

const sliders = ref<Slider[] | null>(null)
const { $axiosApi } = useNuxtApp()

const getSlider = async () => {
  try {
    const { data } = await $axiosApi.get(`/sliders`)

    if (!data) throw new Error('Response Data Not Found!')

    sliders.value = data
  } catch (error: any) {
    return showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

onMounted(async () => await getSlider())
</script>

<template>
  <header>
    <Carousel wrapAround autoplay="5000" transition="600">
      <Slide v-for="slider in sliders" :key="slider?.id">
        <div
          class="flex justify-center h-full bg-gray-100 p-20 w-screen"
          :style="{
            'background-image': 'url(' + (slider?.image || '') + ')',
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
            'background-position': 'center',
            'background-color': 'rgba(0, 0, 0, 0.5)',
            'background-blend-mode': 'darken'
          }"
        >
          <div class="text-white space-y-10 w-full text-center md:text-left md:px-28">
            <h3 class="text-4xl font-bold transition duration-700 min-w-[300px] md:w-[600px]">
              {{ slider?.title }}
            </h3>

            <p class="text-sm font-medium min-w-[300px] md:w-[600px]">
              {{ slider?.description }}
            </p>

            <a
              :href="slider?.url"
              target="_blank"
              class="inline-block bg-yellow-500 px-5 py-2.5 rounded-md text-white text-sm font-semibold hover:bg-yellow-500 duration-200 transition-all"
            >
              {{ slider?.button }}
            </a>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </header>
</template>
