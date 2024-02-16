<script setup lang="ts"></script>

<template>
  <div
    id="dismiss-alert"
    class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 text-sm py-3.5 bg-yellow-500 text-white text-[0.85rem] font-semibold text-center px-5"
    role="alert"
  >
    <div class="flex">
      <span class="w-full">
        Give your friends 1 free month of Skillshare membership, and earn free months when they sign
        up.
        <a href="#" class="underline">Invite friends</a>
      </span>

      <div class="ps-3 ms-auto">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            class="inline-flex p-1.5 text-white"
            data-hs-remove-element="#dismiss-alert"
          >
            <span class="sr-only">Dismiss</span>
            <svg
              class="flex-shrink-0 size-4"
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
