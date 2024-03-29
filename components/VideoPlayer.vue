<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue'
import Plyr from 'plyr'
import type { Course, Lesson } from '~/types/browsing'

const props = defineProps<{
  video: any
  course?: Course
  lesson?: Lesson
  isAutoPlayEnabled?: boolean
}>()
const emit = defineEmits(['progressUpdate'])

const videoPlayer = ref<HTMLVideoElement | null>(null)
let watchedTime = 0
let timer: NodeJS.Timeout | null = null

const { $axiosApi } = useNuxtApp()

onMounted(() => {
  if (videoPlayer.value && props.video) {
    videoPlayer.value.src = props.video
    videoPlayer.value.load()

    const player = new Plyr(videoPlayer.value, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'settings',
        'pip',
        'captions',
        'airplay',
        'fullscreen'
      ],
      settings: ['captions', 'quality', 'speed', 'loop'],
      autoplay: props.isAutoPlayEnabled ?? false
    })

    player.on('timeupdate', () => {
      if (videoPlayer.value) {
        const progress = 100 - (videoPlayer.value.currentTime / videoPlayer.value.duration) * 100
        const formatProgress = progress.toFixed(2)

        emit('progressUpdate', Number(formatProgress))
      }
    })
  }
})

watch(
  () => props.video,
  (newVideo) => {
    if (videoPlayer.value) {
      videoPlayer.value.pause()
      videoPlayer.value.src = newVideo
      videoPlayer.value.load()
    }
  }
)

const startTimer = () => {
  timer = setInterval(() => {
    watchedTime++
    // Update backend every 30 seconds
    if (watchedTime % 30 === 0) {
      sendWatchedTime()
    }
  }, 1000)
}

const pauseTimer = () => {
  if (timer) {
    clearInterval(timer)
    sendWatchedTime()
  }
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    sendWatchedTime()
  }
}

const sendWatchedTime = async () => {
  try {
    if (props.course && props.lesson) {
      await $axiosApi.post('/watched-time', {
        course_id: props.course?.id,
        lesson_id: props.lesson?.id,
        watched_time: watchedTime
      })
    }
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}
</script>

<template>
  <div>
    <video
      ref="videoPlayer"
      playsinline
      controls
      :autoplay="isAutoPlayEnabled ?? false"
      @play="startTimer"
      @pause="pauseTimer"
      @ended="stopTimer"
    ></video>
  </div>
</template>
