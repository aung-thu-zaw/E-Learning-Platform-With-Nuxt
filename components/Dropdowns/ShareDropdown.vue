<script setup lang="ts">
import { useSocialShare } from '~/composables/useSocialShare'
import { useCopy } from '~/composables/useCopy'

const { shareToFacebook, shareToTwitter, shareToLinkedIn, shareByEmail } = useSocialShare()
const { copyShareLink } = useCopy()
</script>

<template>
  <div class="mt-1 mx-1 sm:mt-1 hs-dropdown relative sm:inline-flex z-20 [--auto-close:inside]">
    <!-- <button
      class="border border-gray-300 hover:bg-gray-200 duration-200 px-5 py-2.5 rounded-md text-sm font-semibold text-gray-700"
    >
      <i class="fa-solid fa-share-nodes"></i>
      Share
    </button> -->

    <button
      id="hs-dropdown-auto-close-inside"
      type="button"
      class="hs-dropdown-toggle inline-flex items-center gap-x-2 disabled:opacity-50 disabled:pointer-events-none border border-gray-300 hover:bg-gray-200 duration-200 px-5 py-2.5 rounded-md text-sm font-semibold text-gray-700"
    >
      <i class="fa-solid fa-share-nodes"></i>
      Share
    </button>

    <div
      class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white shadow-md rounded-lg p-2 mt-2 border"
      aria-labelledby="hs-dropdown-auto-close-inside"
    >
      <button
        type="button"
        class="w-full flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 space-x-2"
        @click="shareToFacebook"
      >
        <span class="text-xs">
          <i class="fa-brands fa-facebook"></i>
        </span>
        <span class="block text-sm font-semibold text-gray-800">Facebook</span>
      </button>

      <button
        type="button"
        class="w-full flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 space-x-2"
        @click="shareToLinkedIn"
      >
        <span class="text-xs">
          <i class="fa-brands fa-linkedin"></i>
        </span>
        <span class="block text-sm font-semibold text-gray-800">Linked In</span>
      </button>

      <button
        type="button"
        class="w-full flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 space-x-2"
        @click="shareToTwitter"
      >
        <span class="text-xs">
          <i class="fa-brands fa-twitter"></i>
        </span>
        <span class="block text-sm font-semibold text-gray-800">Twitter</span>
      </button>

      <button
        type="button"
        class="w-full flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 space-x-2"
        @click="shareByEmail"
      >
        <span class="text-xs">
          <i class="fa-solid fa-envelope"></i>
        </span>
        <span class="block text-sm font-semibold text-gray-800">Email</span>
      </button>

      <button
        type="button"
        class="w-full flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 space-x-2"
        @click="copyShareLink"
      >
        <span class="text-xs">
          <i class="fa-solid fa-link"></i>
        </span>
        <span class="block text-sm font-semibold text-gray-800">Copy Link</span>
      </button>
    </div>
  </div>
</template>
