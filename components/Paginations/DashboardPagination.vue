<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})

const route = useRoute()
const router = useRouter()
const emit = defineEmits(['updatedData'])
const { getParameter } = useQueryGenerator()
const { $axiosApi } = useNuxtApp()

const fetchData = async (url: string) => {
  try {
    const currentPage = getParameter(url, 'page') || 1

    const response = await $axiosApi.get(url)

    if (!response) throw new Error('Response Not Found!')

    router.push({ query: { ...route.query, page: currentPage } })

    emit('updatedData', response.data)
  } catch (error: any) {
    return showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <div v-if="data?.meta?.links?.length > 3">
      <div class="flex flex-wrap -mb-1 space-x-1.5">
        <template v-for="(link, p) in data?.meta?.links" :key="p">
          <button
            v-if="link.url === null"
            type="button"
            class="px-3.5 py-2.5 text-sm leading-4 text-gray-400 font-medium bg-gray-100 rounded-md hover:bg-gray-200 duration-150 border"
            v-html="link.label"
          ></button>

          <div v-else class="flex items-center">
            <button
              type="button"
              class="min-h-[40px] min-w-[40px] py-2.5 px-3.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-700 focus:outline-none disabled:opacity-50 disabled:pointer-events-none font-medium bg-gray-100 hover:bg-gray-200 duration-150 border"
              :class="{
                'bg-yellow-500 text-white hover:bg-yellow-400 border-yellow-500':
                  Number(link.label) === data?.meta?.current_page
              }"
              :href="link?.url"
              @click="fetchData(link.url)"
              v-html="link.label"
            ></button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
