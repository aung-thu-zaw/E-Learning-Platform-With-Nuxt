<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const store = useAuthStore()
const localePath = useLocalePath()
const { user } = storeToRefs(store)

onMounted(async () => await store.getAuthenticatedUser())
</script>

<template>
  <div v-if="user" class="hs-dropdown relative inline-flex">
    <button
      id="hs-dropdown-slideup-animation"
      type="button"
      class="hs-dropdown-toggle py-2.5 inline-flex items-center gap-x-2 text-sm font-bold text-gray-800 hover:text-gray-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
    >
      <div class="w-10 h-10 rounded-full overflow-hidden">
        <img :src="user?.avatar" alt="user-avatar" class="w-full h-full object-cover" />
      </div>

      <div class="flex flex-col items-start">
        <span> {{ user?.display_name }} </span>
        <span
          v-show="route.fullPath.startsWith('/admin')"
          class="text-[.65rem] font-semibold text-yellow-500"
        >
          Super Admin
        </span>
      </div>
      <svg
        class="hs-dropdown-open:rotate-180 w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div
      class="hs-dropdown-menu font-bold hs-dropdown-open:opacity-100 duration opacity-0 hidden z-50 transition-[margin,opacity] duration-300 mt-2 min-w-[15rem] rounded-lg p-2 bg-white border divide-gray-700 w-auto"
      aria-labelledby="hs-dropdown-slideup-animation"
    >
      <NuxtLink
        v-show="user?.role === 'instructor'"
        :to="localePath('/instructor/overview')"
        class="flex items-center py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100 space-x-3"
      >
        <span>
          <i class="fa-solid fa-chalkboard-user"></i>
        </span>
        <span>
          {{ $t('Instructor') }}
        </span>
      </NuxtLink>

      <NuxtLink
        v-show="user?.role === 'admin'"
        :to="localePath('/admin/dashboard')"
        class="flex items-center py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100 space-x-3"
      >
        <span>
          <i class="fa-solid fa-tv"></i>
        </span>
        <span>
          {{ $t('Go To Admin Dashboard') }}
        </span>
      </NuxtLink>

      <NuxtLink
        :to="localePath('/my-learning/saved-courses')"
        class="flex items-center py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100 space-x-3"
      >
        <span>
          <i class="fa-solid fa-bookmark mr-2"></i>
        </span>
        <span>
          {{ $t('Saved Courses') }}
        </span>
      </NuxtLink>

      <NuxtLink
        :to="localePath('/settings/profile-information')"
        class="flex items-center py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100 space-x-3"
      >
        <span>
          <i class="fa-solid fa-user-gear"></i>
        </span>
        <span>
          {{ $t('Account Setting') }}
        </span>
      </NuxtLink>

      <NuxtLink
        :to="localePath('/settings/referrals')"
        class="flex items-center py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100 space-x-3"
      >
        <span>
          <i class="fa-solid fa-share"></i>
        </span>
        <span>
          {{ $t('Refer a Friend') }}
        </span>
      </NuxtLink>

      <NuxtLink
        :to="localePath('/settings/my-membership')"
        class="flex items-center py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100 space-x-3"
      >
        <span>
          <i class="fa-solid fa-credit-card"></i>
        </span>
        <span>
          {{ $t('My Membership') }}
        </span>
      </NuxtLink>

      <NuxtLink
        :to="localePath('/settings/my-membership')"
        class="flex items-center py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100 space-x-3"
      >
        <span>
          <i class="fa-solid fa-circle-question"></i>
        </span>
        <span>
          {{ $t('Help') }}
        </span>
      </NuxtLink>

      <button
        type="button"
        class="flex items-center py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100 w-full space-x-3"
        @click="store.logout()"
      >
        <span>
          <i class="fa-solid fa-right-from-bracket"></i>
        </span>
        <span>
          {{ $t('Sign Out') }}
        </span>
      </button>
    </div>
  </div>
</template>
