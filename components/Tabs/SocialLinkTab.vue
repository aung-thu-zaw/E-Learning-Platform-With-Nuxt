<script setup lang="ts">
import type { User } from '~/types/auth'

defineProps<{ user: User }>()
</script>

<template>
  <div class="space-y-3 text-center w-[250px]">
    <a
      v-show="user.facebook_url"
      :href="user?.facebook_url ?? ''"
      target="_blank"
      class="font-semibold text-sm text-gray-800 border border-gray-400 px-10 py-3 rounded-md block hover:scale-105 hover:shadow-md duration-150 cursor-pointer"
    >
      <i class="fa-brands fa-facebook mr-1.5"></i>
      Facebook
    </a>
    <a
      v-show="user.twitter_url"
      :href="user?.twitter_url ?? ''"
      target="_blank"
      class="font-semibold text-sm text-gray-800 border border-gray-400 px-10 py-3 rounded-md block hover:scale-105 hover:shadow-md duration-150 cursor-pointer"
    >
      <i class="fa-brands fa-twitter mr-1.5"></i>
      Twitter
    </a>
    <a
      v-show="user.instagram_url"
      :href="user?.instagram_url ?? ''"
      target="_blank"
      class="font-semibold text-sm text-gray-800 border border-gray-400 px-10 py-3 rounded-md block hover:scale-105 hover:shadow-md duration-150 cursor-pointer"
    >
      <i class="fa-brands fa-instagram mr-1.5"></i>
      Instagram
    </a>
    <a
      v-show="user.pinterest_url"
      :href="user?.pinterest_url ?? ''"
      target="_blank"
      class="font-semibold text-sm text-gray-800 border border-gray-400 px-10 py-3 rounded-md block hover:scale-105 hover:shadow-md duration-150 cursor-pointer"
    >
      <i class="fa-brands fa-pinterest mr-1.5"></i>
      Pinterest
    </a>
    <a
      v-show="user.youtube_url"
      :href="user?.youtube_url ?? ''"
      target="_blank"
      class="font-semibold text-sm text-gray-800 border border-gray-400 px-10 py-3 rounded-md block hover:scale-105 hover:shadow-md duration-150 cursor-pointer"
    >
      <i class="fa-brands fa-youtube mr-1.5"></i>
      Youtube
    </a>
    <a
      v-show="user.github_url"
      :href="user?.github_url ?? ''"
      target="_blank"
      class="font-semibold text-sm text-gray-800 border border-gray-400 px-10 py-3 rounded-md block hover:scale-105 hover:shadow-md duration-150 cursor-pointer"
    >
      <i class="fa-brands fa-github mr-1.5"></i>
      GitHub
    </a>
    <a
      v-show="user.personal_website_url"
      :href="user?.personal_website_url ?? ''"
      target="_blank"
      class="font-semibold text-sm text-gray-800 border border-gray-400 px-10 py-3 rounded-md block hover:scale-105 hover:shadow-md duration-150 cursor-pointer"
    >
      <i class="fa-solid fa-globe mr-1.5"></i>
      Personal Website
    </a>
  </div>
</template>
