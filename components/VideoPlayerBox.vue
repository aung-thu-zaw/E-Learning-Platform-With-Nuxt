<script setup lang="ts">
import { onMounted } from 'vue'
import Plyr from 'plyr'

defineProps<{ videoUrl: string }>()

onMounted(() => {
  new Plyr(document.getElementById('player'), {
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
})
</script>

<template>
  <div>
    <video id="player" playsinline controls data-poster="assets/images/no-image.jpeg">
      <source :src="videoUrl" type="video/mp4" />
    </video>
  </div>
</template>
