<script setup lang="ts">
import UserDropdown from '~/components/Dropdowns/UserDropdown.vue'
import LanguageDropdown from '~/components/Dropdowns/LanguageDropdown.vue'
</script>

<template>
  <div
    class="sticky top-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm border-b bg-white"
  >
    <nav
      class="w-full mx-auto px-8 md:flex md:items-center md:justify-between py-5 md:py-0"
      aria-label="Global"
    >
      <div class="flex items-center justify-between space-x-10 md:mr-10 w-auto">
        <NuxtLink
          to="/"
          class="md:block text-gray-800 mr-0 inline-block whitespace-nowrap px-0 py-1.5 text-center font-extrabold text-lg"
        >
          E-Learning Platform
        </NuxtLink>
        <div class="md:hidden flex items-center space-x-3">
          <button
            class="flex font-bold p-3 text-gray-700 rounded-full w-10 h-10 items-center justify-center hover:cursor-pointer hover:bg-gray-200 transition-all"
          >
            <i class="fa-solid fa-bell"></i>
          </button>

          <LanguageDropdown />

          <button
            type="button"
            class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-transparent text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-collapse="#navbar-collapse-with-animation"
            aria-controls="navbar-collapse-with-animation"
            aria-label="Toggle navigation"
          >
            <div class="hs-collapse-open:hidden">
              <div class="flex items-center space-x-1">
                <span> Menu </span>
                <svg
                  class="flex-shrink-0 w-4 h-4"
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
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              </div>
            </div>
            <div class="hs-collapse-open:block hidden">
              <div class="flex items-center space-x-1">
                <span> Close </span>
                <svg
                  class="flex-shrink-0 w-4 h-4"
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
              </div>
            </div>
          </button>
        </div>
      </div>
      <div
        id="navbar-collapse-with-animation"
        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block w-full"
      >
        <div
          class="flex flex-col gap-5 mt-5 md:flex-row md:items-center md:justify-end md:mt-0 md:ps-5 w-auto md:space-x-4"
        >
          <ul
            class="flex flex-col md:flex-row space-y-5 md:space-y-0 md:items-center items-start justify-center md:space-x-6 text-sm font-bold text-gray-700 w-full md:h-[76px]"
          >
            <li
              class="text-yellow-500 md:border-b-[3px] md:border-b-yellow-500 h-full flex items-center justify-center"
            >
              <a href="#"> {{ $t('Overview') }} </a>
            </li>

            <li class="text-gray-700 hover:text-gray-800 h-full flex items-center justify-center">
              <a href="#"> {{ $t('Stats') }} </a>
            </li>

            <li class="text-gray-700 hover:text-gray-800 h-full flex items-center justify-center">
              <a href="#"> {{ $t('Earning') }} </a>
            </li>

            <li class="text-gray-700 hover:text-gray-800 h-full flex items-center justify-center">
              <a href="#"> {{ $t('Courses') }} </a>
            </li>

            <li class="text-gray-700 hover:text-gray-800 h-full flex items-center justify-center">
              <a href="#"> {{ $t('Announcements') }} </a>
            </li>

            <li class="text-gray-700 hover:text-gray-800 h-full flex items-center justify-center">
              <a href="#">{{ $t('Help') }}</a>
            </li>

            <li class="md:hidden">
              <UserDropdown />
            </li>
          </ul>

          <div class="hidden md:flex items-center space-x-5 justify-end min-w-[300px]">
            <button
              class="flex font-bold p-3 text-gray-700 rounded-full w-10 h-10 items-center justify-center hover:cursor-pointer hover:bg-gray-200 transition-all"
            >
              <i class="fa-solid fa-bell"></i>
            </button>

            <LanguageDropdown />

            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
