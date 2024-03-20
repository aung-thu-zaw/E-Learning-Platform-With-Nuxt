<script setup lang="ts">
import EnrolledCourseCard from '~/components/Cards/EnrolledCourseCard.vue'

useHead({ title: 'Enrolled Courses' })

definePageMeta({ layout: 'my-learning-layout', middleware: 'auth' })
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <EnrolledCourseCard v-for="index in 18" :key="index" />
    </div>
  </div>
</template>
