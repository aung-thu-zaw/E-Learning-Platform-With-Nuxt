<script setup lang="ts">
// import { useReminderStore } from '~/stores/user/reminder'

// const store = useReminderStore()
</script>

<template>
  <button
    type="button"
    class="px-4 py-1.5 inline-flex justify-center items-center text-sm font-bold rounded-md border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-white border-gray-300 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
  >
    <img src="~/assets/images/google-calendar.png" alt="" class="h-12" />

    {{ $t('Sync To Google Calendar') }}
  </button>
</template>
