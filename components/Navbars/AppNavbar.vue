<script setup lang="ts">
import UserDropdown from '~/components/Dropdowns/UserDropdown.vue'
import { useAuthStore } from '~/stores/auth'
import LanguageDropdown from '~/components/Dropdowns/LanguageDropdown.vue'

const route = useRoute()
const { user } = storeToRefs(useAuthStore())
const localPath = useLocalePath()
</script>

<template>
  <div
    class="sticky top-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 border-b bg-white"
  >
    <nav
      class="max-w-[85rem] w-full mx-auto px-4 md:flex md:items-center md:justify-between"
      aria-label="Global"
    >
      <div class="flex items-center justify-between md:w-auto min-w-[200px] w-full">
        <NuxtLink :to="localPath('/')" class="flex-none text-xl font-bold text-gray-800">
          E-Learning Platform
        </NuxtLink>
        <div class="md:hidden flex items-center space-x-3">
          <button
            class="flex font-bold text-xs bg-yellow-500 border-2 shadow border-yellow-200 p-3 text-white rounded-full w-8 h-8 items-center justify-center hover:cursor-pointer hover:bg-yellow-400 transition-all"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>

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
        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
      >
        <div
          class="flex flex-col gap-5 mt-5 md:flex-row md:items-center md:justify-end md:mt-0 md:ps-5 w-auto text-md md:space-x-4"
        >
          <NuxtLink
            to="/learning-paths"
            class="font-bold text-gray-800 hover:text-gray-600 duration-200"
            :class="{
              'text-yellow-500 hover:text-yellow-600': route.fullPath.startsWith('/learning-paths')
            }"
          >
            Learning Paths
          </NuxtLink>

          <a class="font-bold text-gray-800 hover:text-gray-600 duration-200" href="#">
            Quick Tips
          </a>

          <NuxtLink
            to="/blogs"
            class="font-bold text-gray-800 hover:text-gray-600 duration-200"
            :class="{
              'text-yellow-500 hover:text-yellow-600': route.fullPath.startsWith('/blogs')
            }"
          >
            Blogs
          </NuxtLink>

          <div class="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none]">
            <button
              type="button"
              class="sm:py-3 flex items-center w-full font-bold text-gray-800 hover:text-gray-600"
            >
              Browse
              <svg
                class="ms-1 flex-shrink-0 size-4"
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
              class="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 hidden z-10 end-[20rem] top-20 sm:w-[50rem] bg-white sm:shadow-md rounded-lg py-5 sm:px-5"
            >
              <div class="sm:grid sm:grid-cols-3 gap-5">
                <div
                  class="sm:col-span-2 sm:grid sm:grid-cols-2 border-r border-r-gray-300 pr-5 gap-5"
                >
                  <div class="flex flex-col px-2">
                    <div class="px-3 mb-3">
                      <h4 class="text-xs uppercase font-extrabold text-gray-700">Category One</h4>

                      <hr class="mt-3" />
                    </div>

                    <a
                      class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-[0.85rem] hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 hover:text-gray-600"
                      href="#"
                    >
                      About
                    </a>
                    <a
                      class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-[0.85rem] hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 hover:text-gray-600"
                      href="#"
                    >
                      Services
                    </a>
                  </div>
                  <div class="flex flex-col px-2">
                    <div class="px-3 mb-3">
                      <h4 class="text-xs uppercase font-extrabold text-gray-700">Category One</h4>

                      <hr class="mt-3" />
                    </div>

                    <a
                      class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-[0.85rem] hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 hover:text-gray-600"
                      href="#"
                    >
                      About
                    </a>
                    <a
                      class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-[0.85rem] hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 hover:text-gray-600"
                      href="#"
                    >
                      Services
                    </a>
                    <a
                      class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-[0.85rem] hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 hover:text-gray-600"
                      href="#"
                    >
                      Customer Story
                    </a>
                  </div>

                  <div class="flex flex-col px-2">
                    <div class="px-3 mb-3">
                      <h4 class="text-xs uppercase font-extrabold text-gray-700">Category One</h4>

                      <hr class="mt-3" />
                    </div>

                    <a
                      class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-[0.85rem] hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 hover:text-gray-600"
                      href="#"
                    >
                      Services
                    </a>
                    <a
                      class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-[0.85rem] hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 hover:text-gray-600"
                      href="#"
                    >
                      Customer Story
                    </a>
                  </div>

                  <div class="flex flex-col px-2">
                    <div class="px-3 mb-3">
                      <h4 class="text-xs uppercase font-extrabold text-gray-700">Category One</h4>

                      <hr class="mt-3" />
                    </div>

                    <a
                      class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-[0.85rem] hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 hover:text-gray-600"
                      href="#"
                    >
                      Customer Story
                    </a>
                  </div>
                </div>

                <div class="flex flex-col">
                  <a
                    class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 font-bold text-gray-800 hover:text-gray-600"
                    href="#"
                  >
                    All Classes
                  </a>
                  <a
                    class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 font-bold text-gray-800 hover:text-gray-600"
                    href="#"
                  >
                    Student Projects
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <button
              class="flex font-bold p-3 text-gray-700 rounded-full w-10 h-10 items-center justify-center hover:cursor-pointer hover:bg-gray-200 transition-all"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>

            <LanguageDropdown />

            <button
              class="flex font-bold p-3 text-gray-700 rounded-full w-10 h-10 items-center justify-center hover:cursor-pointer hover:bg-gray-200 transition-all"
            >
              <i class="fa-solid fa-bell"></i>
            </button>
          </div>

          <span class="hidden md:block border h-5 border-yellow-500"></span>

          <div
            class="flex items-center justify-start font-bold text-gray-300 hover:text-gray-300 space-x-3"
          >
            <NuxtLink
              v-if="!user"
              to="/auth/sign-in"
              class="text-xs rounded-md font-semibold border border-yellow-500 px-4 py-2.5 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all"
            >
              <i class="fa-solid fa-right-to-bracket mr-1"></i>
              Sign In
            </NuxtLink>

            <UserDropdown v-if="user" />

            <!-- <button
              type="button"
              class="text-xs rounded-md font-semibold bg-yellow-500 px-4 py-2.5 text-white hover:bg-yellow-400 transition-all"
            >
              <i class="fa-solid fa-crown"></i>
              Join Premium
            </button> -->
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
