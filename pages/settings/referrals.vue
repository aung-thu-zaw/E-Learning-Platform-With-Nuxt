<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCopy } from '~/composables/useCopy'

useHead({ title: 'Referrals' })

definePageMeta({ layout: 'app-layout' })

const referralCode = ref<string>('')

const { $axiosApi } = useNuxtApp()
const { isAuthenticated } = storeToRefs(useAuthStore())
const { copyText } = useCopy()

const getReferralCode = async () => {
  try {
    const { data } = await $axiosApi.get('/user/referral-code')

    referralCode.value = data?.code
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (isAuthenticated.value) await getReferralCode()
})
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-5">
      <div class="space-y-10 mb-32">
        <div class="flex flex-col items-center justify-center space-y-5">
          <img src="~/assets/images/invite.png" alt="invite" />

          <h1 class="font-bold text-3xl text-gray-800">Invite Friends, Get Free Month</h1>

          <p class="font-semibold text-gray-800 text-sm mx-auto max-w-[700px] text-center">
            Invite your friends to join and enjoy our platform! When they sign up using your
            referral code and make their first payment, you'll receive a free month as our thank you
            gift. Spread the word and enjoy your extended subscription on us!
          </p>
        </div>

        <div class="space-x-3 flex items-center justify-center">
          <input
            v-model="referralCode"
            type="text"
            class="border border-gray-300 rounded-full py-3 px-5 max-w-[300px] w-full font-bold text-gray-700"
            disabled
          />

          <button
            type="button"
            class="w-12 h-12 flex items-center justify-center bg-yellow-500 font-bold text-white text-sm rounded-full active:animate-press border border-yellow-500 ring-2 ring-yellow-200"
            @click="copyText(referralCode)"
          >
            <i class="fa-solid fa-copy"></i>
          </button>
        </div>
      </div>

      <div class="my-20 text-center space-y-10">
        <h1 class="font-bold text-3xl text-gray-800">How It Work</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="space-y-3 flex flex-col items-center justify-center">
            <img src="~/assets/images/world.png" alt="world" />

            <h1 class="font-bold text-xl text-gray-800">Spread the Word</h1>

            <p class="font-medium text-gray-800 text-sm">
              Share your unique referral link with friends via email, social media, or any other way
              you prefer. They'll get started with a free trial using your link.
            </p>
          </div>

          <div class="space-y-3 flex flex-col items-center justify-center">
            <img src="~/assets/images/subscription.png" alt="subscription" />

            <h1 class="font-bold text-xl text-gray-800">Earn Free Months</h1>

            <p class="font-medium text-gray-800 text-sm">
              For each friend who signs up and completes their first payment using your link, you'll
              earn a free month of subscription.
            </p>
          </div>

          <div class="space-y-3 flex flex-col items-center justify-center">
            <img src="~/assets/images/reward.png" alt="reward" />

            <h1 class="font-bold text-xl text-gray-800">Automatic Rewards</h1>

            <p class="font-medium text-gray-800 text-sm">
              Your earned free months will be automatically applied to your account, ensuring you
              enjoy uninterrupted access to our platform. They'll be utilized before your next
              billing period.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
