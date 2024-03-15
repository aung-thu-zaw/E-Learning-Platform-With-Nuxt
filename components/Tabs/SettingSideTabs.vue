<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <div class="pl-5">
      <h1 class="font-bold text-gray-700 text-md pb-3.5 mb-3.5 border-b border-b-gray-400">
        Account Settings
      </h1>
    </div>

    <div class="space-y-1.5">
      <NuxtLink
        to="/profile"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
      >
        View Profile
      </NuxtLink>

      <NuxtLink
        to="/settings/profile-information"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600':
            route.path === '/settings/profile-information'
        }"
      >
        Profile Information
      </NuxtLink>

      <NuxtLink
        to="/settings/change-username"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600': route.path === '/settings/change-username'
        }"
      >
        Change Username
      </NuxtLink>

      <NuxtLink
        to="/settings/email-address"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600': route.path === '/settings/email-address'
        }"
      >
        Email Address
      </NuxtLink>

      <NuxtLink
        to="/settings/change-password"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600': route.path === '/settings/change-password'
        }"
      >
        Change Password
      </NuxtLink>

      <!-- <NuxtLink
        to="/settings/change-password"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600': route.path === '/settings/change-password'
        }"
      >
        Two Factor Authentication
      </NuxtLink> -->

      <NuxtLink
        to="/settings/email-and-notifications"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600':
            route.path === '/settings/email-and-notifications'
        }"
      >
        Email And Notifications
      </NuxtLink>

      <NuxtLink
        to="/settings/membership-and-payments"
        class="text-gray-800 font-semibold w-full px-5 py-3 rounded-md text-left text-sm hover:bg-gray-200 block duration-200 transition-all focus:ring-0"
        :class="{
          'bg-yellow-500 text-white hover:bg-yellow-600':
            route.path === '/settings/membership-and-payments'
        }"
      >
        Membership and Payments
      </NuxtLink>
    </div>
  </div>
</template>
