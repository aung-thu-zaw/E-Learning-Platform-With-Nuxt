<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const localePath = useLocalePath()

const { user } = storeToRefs(useAuthStore())
</script>

<template>
  <div class="bg-white p-5 border border-gray-200 rounded-md">
    <div class="pl-5">
      <h1 class="font-bold text-gray-700 text-md pb-3.5 mb-3.5 border-b border-b-gray-400">
        {{ $t('Account Settings') }}
      </h1>
    </div>

    <div class="space-y-1.5">
      <NuxtLink
        :to="localePath(`/user/${user?.username}`)"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
      >
        {{ $t('View Profile') }}
      </NuxtLink>

      <NuxtLink
        :to="localePath('/settings/profile-information')"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600': route.path.endsWith(
            '/settings/profile-information'
          )
        }"
      >
        {{ $t('Profile Information') }}
      </NuxtLink>

      <NuxtLink
        :to="localePath('/settings/change-username')"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600': route.path.endsWith(
            '/settings/change-username'
          )
        }"
      >
        {{ $t('Change Username') }}
      </NuxtLink>

      <NuxtLink
        :to="localePath('/settings/change-email-address')"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600': route.path.endsWith(
            '/settings/change-email-address'
          )
        }"
      >
        {{ $t('Change Email Address') }}
      </NuxtLink>

      <NuxtLink
        :to="localePath('/settings/change-password')"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600': route.path.endsWith(
            '/settings/change-password'
          )
        }"
      >
        {{ $t('Change Password') }}
      </NuxtLink>

      <NuxtLink
        :to="localePath('/settings/two-factor-authentication')"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600': route.path.endsWith(
            '/settings/two-factor-authentication'
          )
        }"
      >
        {{ $t('Two-factor Authentication') }}
      </NuxtLink>

      <NuxtLink
        :to="localePath('/settings/email-and-notifications')"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600': route.path.endsWith(
            '/settings/email-and-notifications'
          )
        }"
      >
        {{ $t('Email And Notifications') }}
      </NuxtLink>

      <NuxtLink
        :to="localePath('/settings/membership-and-payments')"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600': route.path.endsWith(
            '/settings/membership-and-payments'
          )
        }"
      >
        {{ $t('Membership and Payments') }}
      </NuxtLink>
    </div>
  </div>
</template>
