<script setup lang="ts">
import SocialLinkTab from '~/components/Tabs/SocialLinkTab.vue'
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
import ShareDropdown from '~/components/Dropdowns/ShareDropdown.vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'app-layout' })

const userInformation = ref<any>(null)
const currentUsername = useRoute().params.username.toString()

const { $axiosApi, $toast } = useNuxtApp()
const { user, isAuthenticated } = storeToRefs(useAuthStore())

const getUserInformation = async (username: string) => {
  try {
    const { data } = await $axiosApi.get(`/user/${username}/information`)

    if (!data) throw new Error('Response Data Not Found!')

    userInformation.value = data
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

const handleFollowUser = async (userId: number) => {
  try {
    const { data } = await $axiosApi.post(`/user/${userId}/follow`)

    if (!data) throw new Error('Response Data Not Found!')

    await getUserInformation(currentUsername)

    $toast.success(`You're now following ${userInformation.value.display_name}.`)
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

const handleUnFollowUser = async (userId: number) => {
  try {
    const { data } = await $axiosApi.post(`/user/${userId}/unfollow`)

    if (!data) throw new Error('Response Data Not Found!')

    await getUserInformation(currentUsername)

    $toast.success(`You've unfollowed ${userInformation.value.display_name}.`)
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

onMounted(async () => await getUserInformation(currentUsername))

watch(
  () => userInformation.value,
  (newValue) => useHead({ title: newValue?.display_name })
)
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-5">
      <div class="flex flex-col md:flex-row items-start md:space-x-6 space-y-5 md:space-y-0">
        <div class="w-full md:w-3/12">
          <div class="flex flex-col items-center justify-center space-y-10 w-[250px] mx-auto">
            <div
              class="w-44 h-44 rounded-full overflow-hidden ring-2 ring-gray-100 border border-gray-300"
            >
              <img
                :src="userInformation?.avatar"
                alt="user-profile"
                class="w-full h-full object-cover"
              />
            </div>

            <div
              class="flex items-center justify-center py-5 space-x-10 border-b border-t border-gray-300 w-full"
            >
              <div class="text-center">
                <p class="text-gray-600 text-sm font-bold">Followers</p>
                <p class="text-gray-700 text-xl font-extrabold">
                  {{ userInformation?.followers_count }}
                </p>
              </div>
              <div class="text-center">
                <p class="text-gray-600 text-sm font-bold">Following</p>
                <p class="text-gray-700 text-xl font-extrabold">
                  {{ userInformation?.following_count }}
                </p>
              </div>
            </div>

            <SocialLinkTab v-if="userInformation" :user="userInformation" />
          </div>
        </div>
        <div class="w-full md:w-9/12">
          <div class="space-y-10">
            <div class="flex items-start justify-between">
              <div class="space-y-3">
                <p class="capitalize text-sm font-bold text-gray-600">
                  {{ userInformation?.role }}
                </p>
                <h1 class="font-bold text-3xl text-gray-800">
                  {{ userInformation?.display_name }}
                </h1>
                <p class="text-sm font-semibold text-gray-800">
                  {{ userInformation?.headline }}
                </p>
              </div>

              <div class="space-x-5">
                <button
                  v-show="user?.id !== userInformation?.id && isAuthenticated"
                  type="button"
                  class="text-yellow-500 border border-yellow-500 duration-200 px-5 py-2 rounded-md text-xs font-semibold active:animate-press hover:bg-yellow-500 hover:text-white"
                  @click="
                    userInformation?.is_followed
                      ? handleUnFollowUser(userInformation.id)
                      : handleFollowUser(userInformation.id)
                  "
                >
                  <span v-if="!userInformation?.is_followed">
                    <i class="fa-solid fa-plus"></i>
                    Follow
                  </span>
                  <span v-else>
                    <i class="fa-solid fa-check"></i>
                    Following
                  </span>
                </button>

                <ShareDropdown />
              </div>
            </div>

            <div class="flex items-center space-x-10">
              <div class="">
                <p class="text-gray-600 text-sm font-bold">Total students</p>
                <p class="text-gray-700 text-xl font-extrabold">
                  {{ userInformation?.students_count }}
                </p>
              </div>
              <div class="">
                <p class="text-gray-600 text-sm font-bold">Total Reviews</p>
                <p class="text-gray-700 text-xl font-extrabold">
                  {{ userInformation?.reviews_count }}
                </p>
              </div>
            </div>

            <div class="space-y-5">
              <h1 class="text-lg font-bold text-gray-700">About Me</h1>
              <p class="text-gray-800 text-sm" v-html="userInformation?.about_me"></p>
            </div>

            <div v-if="userInformation?.courses" class="space-y-5">
              <h1 class="text-lg font-bold text-gray-700">
                My Courses ( {{ userInformation.courses?.length }} )
              </h1>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <VideoCourseCard
                  v-for="course in userInformation?.courses"
                  :key="course"
                  :course="course"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
