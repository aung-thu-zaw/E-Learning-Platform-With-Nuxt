<script setup lang="ts">
interface Banner {
  description: string
  url: string
  button: string
  countdown: string
  start_date_time: string
  end_date_time: string
  is_active: string
  is_manually_set: string
}

let countdownInterval: NodeJS.Timeout | null = null
const hours = ref<number>(0)
const minutes = ref<number>(0)
const seconds = ref<number>(0)
const banner = ref<Banner | null>(null)

const { $axiosApi } = useNuxtApp()

const getBanner = async () => {
  try {
    const { data } = await $axiosApi.get(`/nav-banner`)

    if (!data) throw new Error('Response Data Not Found!')

    banner.value = data
  } catch (error: any) {
    return showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

const startCountdown = () => {
  countdownInterval = setInterval(() => {
    const now = new Date().getTime()
    const countDownDate = banner?.value?.countdown ? new Date(banner.value.countdown).getTime() : 0
    const distance = countDownDate - now

    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000)

    if (distance < 0) {
      clearInterval(countdownInterval as NodeJS.Timeout)
      hours.value = 0
      minutes.value = 0
      seconds.value = 0
    }
  }, 1000)
}

onMounted(async () => {
  await getBanner()
  startCountdown()
})
</script>

<template>
  <div
    v-if="banner && banner.description"
    id="dismiss-alert"
    class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 text-sm py-3.5 bg-yellow-500 text-white text-[0.85rem] font-semibold text-center px-5"
    role="alert"
  >
    <div class="flex items-center">
      <div class="w-full flex items-center justify-center space-x-5">
        <p>
          {{ banner?.description }}
        </p>

        <div v-show="banner?.countdown" class="flex items-center space-x-2 text-xs">
          <span class="bg-yellow-600 min-w-8 h-8 rounded-md flex items-center justify-center">
            {{ hours }}
          </span>
          <span>:</span>
          <span class="bg-yellow-600 min-w-8 h-8 rounded-md flex items-center justify-center">
            {{ minutes }}
          </span>
          <span>:</span>
          <span class="bg-yellow-600 min-w-8 h-8 rounded-md flex items-center justify-center">
            {{ seconds }}
          </span>
        </div>

        <a
          :href="banner?.url"
          target="_blank"
          class="bg-yellow-600 text-white p-2 text-xs rounded-md ml-1"
        >
          {{ banner?.button }}
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="ps-3 ms-auto">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            class="inline-flex p-1.5 text-white"
            data-hs-remove-element="#dismiss-alert"
          >
            <span class="sr-only">Dismiss</span>
            <svg
              class="flex-shrink-0 size-4"
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
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
