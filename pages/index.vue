<script setup lang="ts">
import HeaderCarousel from '~/components/Carousels/HeaderCarousel.vue'
import ExploreYourCreativeInterestSection from '~/components/Sections/ExploreYourCreativeInterestSection.vue'
import RecommendedLearningPathSection from '~/components/Sections/RecommendedLearningPathSection.vue'
import RecommendedCourseSection from '~/components/Sections/RecommendedCourseSection.vue'
import NewAndPopularCourseSection from '~/components/Sections/NewAndPopularCourseSection.vue'
import CourseBasedOnYourInterestSection from '~/components/Sections/CourseBasedOnYourInterestSection.vue'

useHead({ title: 'Home' })
definePageMeta({ layout: 'app-layout' })
</script>

<template>
  <div>
    <HeaderCarousel />

    <ExploreYourCreativeInterestSection />

    <RecommendedLearningPathSection />

    <RecommendedCourseSection />

    <NewAndPopularCourseSection />

    <CourseBasedOnYourInterestSection />
  </div>
</template>
