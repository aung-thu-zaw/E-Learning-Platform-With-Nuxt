<script setup lang="ts">
import SavedCourseCard from '~/components/Cards/SavedCourseCard.vue'

useHead({ title: 'Saved Courses' })

definePageMeta({ layout: 'my-learning-layout', middleware: 'auth' })
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <SavedCourseCard v-for="index in 10" :key="index" />
    </div>
  </div>
</template>
