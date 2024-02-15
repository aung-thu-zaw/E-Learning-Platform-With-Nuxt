<script setup lang="ts"></script>

<template>
  <div class="min-w-[300px] max-w-[400px] w-full">
    <form>
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <button
          type="button"
          class="absolute inset-y-0 right-0 flex items-center pr-5 hover:cursor-pointer text-gray-500 hover:text-red-600 transition-all"
        >
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
        <input
          type="text"
          id="default-search"
          class="block w-full p-4 pl-10 text-xs text-gray-700 rounded-md bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400 font-semibold"
          placeholder="Search courses about animation"
          required
        />
      </div>
    </form>
  </div>
</template>
