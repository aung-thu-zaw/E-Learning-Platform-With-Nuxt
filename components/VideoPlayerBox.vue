<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Plyr from 'plyr'

defineProps<{ video: any }>()
const emit = defineEmits(['progressUpdate'])

const videoPlayer = ref<HTMLVideoElement | null>(null)

onMounted(async () => {
  const player = new Plyr('#player', {
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
    settings: ['captions', 'quality', 'speed', 'loop']
  })

  player.on('timeupdate', () => {
    if (videoPlayer.value) {
      const progress = 100 - (videoPlayer.value.currentTime / videoPlayer.value.duration) * 100
      const formattedProgress = progress.toFixed(2)
      emit('progressUpdate', formattedProgress)
    }
  })
})
</script>

<template>
  <div>
    <video id="player" ref="videoPlayer" playsinline controls>
      <source :src="video" type="video/mp4" />
    </video>
  </div>
</template>
