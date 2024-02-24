<script setup lang="ts">
import { useURLQueryString } from '@/composables/useURLQueryString'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})

const route = useRoute()
const { dashboardDefaultQueryString } = useURLQueryString()
const { generateQueryParams } = useQueryGenerator()

const getSidebarMenuActiveColor = (targetRoute: string): string => {
  return route.path.startsWith(targetRoute)
    ? 'text-yellow-500 hover:text-yellow-600 duration-200'
    : 'text-gray-700 hover:text-gray-600 duration-200'
}
</script>

<template>
  <aside
    :class="{
      'translate-x-0 fixed left-0 top-0 pt-24': collapse,
      '-translate-x-full pt-0': !collapse
    }"
    class="bg-white text-gray-700 shadow-md h-screen overflow-y-scroll min-w-64 z-10 px-3.5 py-5 transition-all duration-500 border-r border-gray-200 scrollbar"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center md:justify-between w-full mx-auto"
    >
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none absolute top-0 left-0 right-0 z-40 h-auto items-center flex-1 py-5 md:py-0 rounded px-3.5 md:px-0"
      >
        <!-- Heading -->
        <h6
          class="md:min-w-full text-gray-700 [text-shadow:_1px_0.5px_1px_rgb(0_0_0_/_30%)] text-xs font-bold block pt-1 pb-4 no-underline px-3"
        >
          {{ $t('Platform Administration') }}
        </h6>

        <ul
          class="hs-accordion-group md:flex-col md:min-w-full flex flex-col list-none text-[13px] font-bold"
        >
          <!-- Dashboard -->
          <li class="items-center">
            <NuxtLink
              to="/admin/dashboard"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/dashboard')"
            >
              <div class="py-3 block">
                <i class="fas fa-tv mr-2" />
                {{ $t('Dashboard') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Analytics -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/analytics')"
            >
              <div class="py-3 block">
                <i class="fas fa-chart-line mr-2" />
                {{ $t('Analytics') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Nav Banner -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/nav-banner')"
            >
              <div class="py-3 block">
                <i class="fa-solid fa-ad mr-2"></i>
                {{ $t('Nav Banner') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Sliders -->
          <li class="items-center">
            <NuxtLink
              :to="'/admin/sliders' + '?' + dashboardDefaultQueryString"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/sliders')"
            >
              <div class="py-3 block">
                <i class="fa-solid fa-sliders-h mr-2"></i>
                {{ $t('Sliders') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Coupons -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/coupons')"
            >
              <div class="py-3 block">
                <i class="fa-solid fa-ticket mr-2"></i>
                {{ $t('Coupons') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Manage catalogues -->
          <li id="category-management-accordion" class="hs-accordion items-center">
            <button
              type="button"
              class="hs-accordion-toggle text-gray-700 hover:text-gray-600 duration-200 py-3.5 flex items-center justify-between w-full hover:bg-gray-200 rounded-lg px-3"
            >
              <span>
                <i class="fas fa-th-large mr-2" />
                {{ $t('Catalogues') }}
              </span>
              <span>
                <svg
                  class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>

                <svg
                  class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </span>
            </button>

            <div
              id="category-management-accordion"
              class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              :class="{
                block:
                  route.fullPath.startsWith('/admin/categories') ||
                  route.fullPath.startsWith('/admin/subcategories'),
                hidden: !(
                  route.fullPath.startsWith('/admin/categories') ||
                  route.fullPath.startsWith('/admin/subcategories')
                )
              }"
            >
              <ul class="pl-8">
                <li class="items-center">
                  <NuxtLink
                    to="/"
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/categories')"
                  >
                    {{ $t('Categories') }}
                  </NuxtLink>
                </li>
                <li class="items-center">
                  <NuxtLink
                    to="/"
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/subcategories')"
                  >
                    {{ $t('Subcategories') }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>

          <!-- Skills -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/skills')"
            >
              <div class="py-3 block">
                <i class="fas fa-tag mr-2" />
                {{ $t('Skill Tags') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Courses -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/courses')"
            >
              <div class="py-3 block">
                <i class="fa-solid fa-graduation-cap mr-2"></i>
                {{ $t('Courses') }}
              </div>

              <span
                class="font-bold text-[0.65rem] bg-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full ml-auto"
              >
                12
              </span>
            </NuxtLink>
          </li>

          <!-- Learning Paths -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/learning-paths')"
            >
              <div class="py-3 block">
                <i class="fas fa-book-open mr-2" />
                {{ $t('Learning Paths') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Rating And Reviews -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/rating-and-reviews')"
            >
              <div class="py-3 block">
                <i class="fa-solid fa-star mr-2"></i>
                {{ $t('Rating & Reviews') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Newsletters -->
          <li id="newsletter-accordion" class="hs-accordion items-center">
            <button
              type="button"
              class="hs-accordion-toggle text-gray-700 hover:text-gray-600 duration-200 py-3.5 flex items-center justify-between w-full hover:bg-gray-200 rounded-lg px-3"
            >
              <span class="">
                <i class="fa-solid fa-envelope-open-text mr-2"></i>
                {{ $t('Newsletter') }}
              </span>
              <span>
                <svg
                  class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>

                <svg
                  class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </span>
            </button>

            <div
              id="newsletter-accordion"
              class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              :class="{
                block:
                  route.fullPath.startsWith('/admin/subscribers') ||
                  route.fullPath.startsWith('/admin/send-newsletter'),
                hidden: !(
                  route.fullPath.startsWith('/admin/subscribers') ||
                  route.fullPath.startsWith('/admin/send-newsletter')
                )
              }"
            >
              <ul class="pl-8">
                <li class="items-center">
                  <NuxtLink
                    to="/"
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/subscribers')"
                  >
                    Subscribers
                  </NuxtLink>
                </li>
                <li class="items-center">
                  <NuxtLink
                    to="/"
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/send-newsletter')"
                  >
                    Send Newsletter
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>

          <!-- Manage Blogs -->
          <li id="blog-management-accordion" class="hs-accordion items-center">
            <button
              type="button"
              class="hs-accordion-toggle text-gray-700 hover:text-gray-600 duration-200 py-3.5 flex items-center justify-between w-full hover:bg-gray-200 rounded-lg px-3"
            >
              <span>
                <i class="fa-solid fa-file-pen mr-2"></i>
                {{ $t('Manage Blog') }}
              </span>
              <span>
                <svg
                  class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>

                <svg
                  class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </span>
            </button>

            <div
              id="blog-management-accordion"
              class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              :class="{
                block:
                  route.fullPath.startsWith('/admin/manage-blog/categories') ||
                  route.fullPath.startsWith('/admin/manage-blog/contents'),
                hidden: !(
                  route.fullPath.startsWith('/admin/manage-blog/categories') ||
                  route.fullPath.startsWith('/admin/manage-blog/contents')
                )
              }"
            >
              <ul class="pl-8">
                <li v-show="can('blog-categories.view')" class="items-center">
                  <NuxtLink
                    :to="
                      '/admin/manage-blog/categories' +
                      '?' +
                      generateQueryParams(dashboardDefaultQueryString)
                    "
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/manage-blog/categories')"
                  >
                    {{ $t('Categories') }}
                  </NuxtLink>
                </li>
                <li v-show="can('blog-contents.view')" class="items-center">
                  <NuxtLink
                    :to="
                      '/admin/manage-blog/contents' +
                      '?' +
                      generateQueryParams(dashboardDefaultQueryString)
                    "
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/manage-blog/contents')"
                  >
                    {{ $t('Contents') }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>

          <!-- Support Chat -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/support-chat')"
            >
              <div class="py-3 block">
                <i class="fa-solid fa-comment-alt mr-2"></i>
                {{ $t('Support Chat') }}
              </div>

              <span
                class="font-bold text-[0.65rem] bg-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full ml-auto"
              >
                23
              </span>
            </NuxtLink>
          </li>
        </ul>

        <hr class="my-4 md:min-w-full" />
        <h6
          class="md:min-w-full text-gray-700 [text-shadow:_1px_0.5px_1px_rgb(0_0_0_/_30%)] text-xs font-bold block pt-1 pb-4 no-underline px-3"
        >
          {{ $t('Subscription Management') }}
        </h6>

        <ul
          class="hs-accordion-group md:flex-col md:min-w-full flex flex-col list-none text-[13px] font-bold"
        >
          <!-- Subscription Plans -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/subscription-plans')"
            >
              <div class="py-3 block">
                <i class="fas fa-money-bill-wave mr-2" />
                {{ $t('Subscription Plans') }}
              </div>
            </NuxtLink>
          </li>

          <!-- User Subscriptions -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/user-subscriptions')"
            >
              <div class="py-3 block">
                <i class="fas fa-users-cog mr-2" />
                {{ $t('User Subscriptions') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Payment Processing -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/payment-processing')"
            >
              <div class="py-3 block">
                <i class="fas fa-money-check-alt mr-2" />
                {{ $t('Payment Processing') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Tracking And Reporting -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/tracking-and-reporting')"
            >
              <div class="py-3 block">
                <i class="fas fa-chart-line mr-2" />
                {{ $t('Tracking And Reporting') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Renewal and Cancellation -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/renewal-and-cancellation')"
            >
              <div class="py-3 block">
                <i class="fas fa-sync-alt mr-2" />
                {{ $t('Renewal and Cancellation') }}
              </div>
            </NuxtLink>
          </li>
        </ul>

        <hr class="my-4 md:min-w-full" />

        <h6
          class="md:min-w-full text-gray-700 [text-shadow:_1px_0.5px_1px_rgb(0_0_0_/_30%)] text-xs font-bold block pt-1 pb-4 no-underline px-3"
        >
          {{ $t('Management And Oversight') }}
        </h6>

        <ul
          class="hs-accordion-group md:flex-col md:min-w-full flex flex-col list-none text-[13px] font-bold"
        >
          <!-- Manage Instructors -->
          <li id="instructor-management-accordion" class="hs-accordion items-center">
            <button
              type="button"
              class="hs-accordion-toggle text-gray-700 hover:text-gray-600 duration-200 py-3.5 flex items-center justify-between w-full hover:bg-gray-200 rounded-lg px-3"
            >
              <span>
                <i class="fa-solid fa-chalkboard-teacher mr-2"></i>
                {{ $t('Manage Instructors') }}
              </span>
              <span>
                <svg
                  class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>

                <svg
                  class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </span>
            </button>

            <div
              id="instructor-management-accordion"
              class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              :class="{
                block:
                  route.fullPath.startsWith('/admin/claims-as-a-instructor') ||
                  route.fullPath.startsWith('/admin/instructors'),
                hidden: !(
                  route.fullPath.startsWith('/admin/claims-as-a-instructor') ||
                  route.fullPath.startsWith('/admin/instructors')
                )
              }"
            >
              <ul class="pl-8">
                <li class="items-center">
                  <NuxtLink
                    to="/"
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/claims-as-a-instructor')"
                  >
                    {{ $t('Claims as a Instructor') }}
                  </NuxtLink>
                </li>
                <li class="items-center">
                  <NuxtLink
                    to="/"
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/instructors')"
                  >
                    {{ $t('Instructors') }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>

          <!-- Manage Authority -->
          <li id="authority-management-accordion" class="hs-accordion items-center">
            <button
              type="button"
              class="hs-accordion-toggle text-gray-700 hover:text-gray-600 duration-200 py-3.5 flex items-center justify-between w-full hover:bg-gray-200 rounded-lg px-3"
            >
              <span>
                <i class="fa-solid fa-shield mr-2"></i>
                {{ $t('Manage Authority') }}
              </span>
              <span>
                <svg
                  class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>

                <svg
                  class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </span>
            </button>

            <div
              id="authority-management-accordion"
              class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              :class="{
                block:
                  route.fullPath.startsWith('/admin/permissions') ||
                  route.fullPath.startsWith('/admin/roles') ||
                  route.fullPath.startsWith('/admin/assign-role-permissions'),
                hidden: !(
                  route.fullPath.startsWith('/admin/permissions') ||
                  route.fullPath.startsWith('/admin/roles') ||
                  route.fullPath.startsWith('/admin/assign-role-permissions')
                )
              }"
            >
              <ul class="pl-8">
                <li class="items-center">
                  <NuxtLink
                    to="/"
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/permissions')"
                  >
                    {{ $t('Permissions') }}
                  </NuxtLink>
                </li>
                <li class="items-center">
                  <NuxtLink
                    to="/"
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/roles')"
                  >
                    {{ $t('Roles') }}
                  </NuxtLink>
                </li>
                <li class="items-center">
                  <NuxtLink
                    to="/"
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/assign-role-permissions')"
                  >
                    {{ $t('Assign Role Permissions') }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>

          <!-- Manage Accounts -->
          <li id="account-management-accordion" class="hs-accordion items-center">
            <button
              type="button"
              class="hs-accordion-toggle text-gray-700 hover:text-gray-600 duration-200 py-3.5 flex items-center justify-between w-full hover:bg-gray-200 rounded-lg px-3"
            >
              <span>
                <i class="fa-solid fa-user-gear mr-2"></i>
                {{ $t('Manage Accounts') }}
              </span>
              <span>
                <svg
                  class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>

                <svg
                  class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </span>
            </button>

            <div
              id="account-management-accordion"
              class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              :class="{
                block:
                  route.fullPath.startsWith('/admin/registered-accounts') ||
                  route.fullPath.startsWith('/admin/admin-manage'),
                hidden: !(
                  route.fullPath.startsWith('/admin/registered-accounts') ||
                  route.fullPath.startsWith('/admin/admin-manage')
                )
              }"
            >
              <ul class="pl-8">
                <li class="items-center">
                  <NuxtLink
                    to="/"
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/registered-accounts')"
                  >
                    {{ $t('Registered Accounts') }}
                  </NuxtLink>
                </li>
                <li class="items-center">
                  <NuxtLink
                    to="/"
                    class="py-3 font-bold block hover:bg-gray-200 rounded-lg px-3"
                    :class="getSidebarMenuActiveColor('/admin/admin-manage')"
                  >
                    {{ $t('Admin Manage') }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>

          <!-- Settings -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/settings')"
            >
              <div class="py-3 block">
                <i class="fas fa-gear mr-2" />
                {{ $t('Settings') }}
              </div>
            </NuxtLink>
          </li>

          <!-- Database Backup -->
          <li class="items-center">
            <NuxtLink
              to="/"
              class="flex h-12 cursor-pointer items-center truncate rounded-lg py-3 outline-none hover:bg-gray-200 px-3"
              :class="getSidebarMenuActiveColor('/admin/database-backup')"
            >
              <div class="py-3 block">
                <i class="fas fa-database mr-2" />
                {{ $t('Database Backup') }}
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
