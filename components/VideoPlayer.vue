<template>
  <div>
    <video ref="videoPlayer" playsinline controls></video>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Plyr from 'plyr'

const props = defineProps<{ video: any }>()
const emit = defineEmits(['progressUpdate'])

const videoPlayer = ref<HTMLVideoElement | null>(null)

onMounted(async () => {
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
      autoplay: true
    })

    player.on('timeupdate', () => {
      if (videoPlayer.value) {
        const progress = 100 - (videoPlayer.value.currentTime / videoPlayer.value.duration) * 100
        const formattedProgress = progress.toFixed(2)
        emit('progressUpdate', Number(formattedProgress))
      }
    })
  }
})

watch(
  () => props.video,
  async (newVideo) => {
    if (videoPlayer.value) {
      videoPlayer.value.pause()
      videoPlayer.value.src = newVideo
      videoPlayer.value.load()
    }
  }
)
</script>
