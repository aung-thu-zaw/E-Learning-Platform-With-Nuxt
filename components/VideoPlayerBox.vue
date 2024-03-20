<script setup lang="ts">
import Plyr from 'plyr'

onMounted(() => new Plyr('#player'))
</script>

<template>
  <div>
    <video id="player" playsinline controls data-poster="assets/images/video-background.jpg">
      <source src="~/assets/videos/test.mp4" type="video/mp4" />
    </video>
  </div>
</template>
