<script setup lang="ts">
import CourseInformationCard from '~/components/Cards/CourseInformationCard.vue'
import CourseTimeline from '~/components/CourseTimeline.vue'

// useHead({ title: 'Home' })
definePageMeta({ layout: 'app-layout' })
</script>

<template>
  <section class="">
    <div
      class="px-5 md:px-28 text-left bg-white py-20 md:py-36 space-y-5"
      style="
        background-image: url('https://4192879.fs1.hubspotusercontent-na1.net/hub/4192879/hubfs/Blog%20Images/2021/July/July%20blog.%208%20video%20editing%20tips.png?width=944&height=590&name=July%20blog.%208%20video%20editing%20tips.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-color: rgba(0, 0, 0, 0.6);
        background-blend-mode: overlay;
      "
    >
      <h4 class="font-bold text-2xl text-yellow-500">Learning Paths</h4>

      <h1 class="font-bold text-3xl md:text-4xl text-white max-w-[600px]">
        Start Your Freelance Video Editing Career
      </h1>
      <p class="font-medium text-md text-white max-w-[600px] text-left">
        From defining your video editing style to streamlining your workflow to booking and
        navigating client projects, you’ll finish this learning path with a headstart on becoming a
        successful freelance video editor. Throughout these five classes, full-time editor,
        YouTuber, and cinematographer, Ryan Kao will walk you through the terms, techniques, and
        technical knowledge he wishes he knew before starting his career.
      </p>
    </div>
    <div class="bg-gray-100 relative">
      <div class="container mx-auto p-5">
        <div
          class="absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full"
        >
          <CourseInformationCard />
        </div>

        <div class="pt-52 pb-20 flex items-center justify-center">
          <CourseTimeline />
        </div>
      </div>
    </div>
  </section>
</template>
