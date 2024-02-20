<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()
</script>

<template>
  <div class="flex items-center justify-between space-x-5">
    <button
      type="button"
      class="w-full px-4 py-[18px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-white border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
      @click="store.authenticateWithSocial('google')"
    >
      <svg class="w-5 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
        <path
          d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
          fill="#4285F4"
        />
        <path
          d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
          fill="#34A853"
        />
        <path
          d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
          fill="#FBBC05"
        />
        <path
          d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
          fill="#EB4335"
        />
      </svg>
      Google
    </button>

    <button
      type="button"
      class="w-full p-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-white border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
      @click="store.authenticateWithSocial('facebook')"
    >
      <svg
        class="w-6 h-auto"
        width="46"
        height="47"
        viewBox="0 0 56.693 56.693"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.347 5.157c-13.6 0-24.625 11.027-24.625 24.625 0 13.6 11.025 24.623 24.625 24.623s24.625-11.023 24.625-24.623c0-13.598-11.026-24.625-24.625-24.625zm6.517 24.522H30.6v15.207h-6.32V29.679h-3.006V24.31h3.006v-3.479c0-2.49 1.182-6.377 6.379-6.377l4.68.018v5.215h-3.398c-.555 0-1.34.277-1.34 1.461v3.163h4.818l-.555 5.368z"
          fill="#316ff6"
          class="fill-000000"
        ></path>
      </svg>

      Facebook
    </button>
  </div>
</template>
