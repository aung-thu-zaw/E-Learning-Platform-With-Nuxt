<script setup lang="ts">
import UserDropdown from '~/components/Dropdowns/UserDropdown.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'

useHead({ title: 'Checkout' })

const localePath = useLocalePath()
</script>

<template>
  <section class="bg-gray-50 min-h-screen">
    <div
      class="sticky top-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 border-b bg-white"
    >
      <nav
        class="max-w-[85rem] w-full mx-auto px-4 flex items-center justify-between"
        aria-label="Global"
      >
        <div class="flex items-center justify-between min-w-[200px] w-full">
          <NuxtLink :to="localePath('/')" class="flex-none text-xl font-bold text-gray-800">
            E-Learning Platform
          </NuxtLink>

          <UserDropdown />
        </div>
      </nav>
    </div>

    <div class="flex flex-col md:flex-row items-start h-screen">
      <div class="w-full md:w-6/12 p-10 md:min-h-full bg-white">
        <div class="max-w-[700px] ml-auto space-y-10">
          <div>
            <h1 class="font-bold text-3xl text-gray-800 mb-5">Start your free 7 days</h1>
            <p class="text-sm text-gray-600">No commitments. Cancel anytime.</p>
          </div>

          <div>
            <h4 class="font-bold text-lg text-gray-800 mb-5">Select a plan</h4>
            <div>
              <div class="grid sm:grid-cols-3 gap-2">
                <label
                  for="hs-radio-monthly"
                  class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <input
                    id="hs-radio-monthly"
                    type="radio"
                    name="hs-radio-monthly"
                    class="shrink-0 mt-0.5 border-gray-200 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <div class="">
                    <p class="text-md font-bold text-gray-800 ms-3 mb-1.5">Monthly</p>
                    <div class="text-xs ml-3 space-y-1.5">
                      <p>US$10.00/month</p>
                    </div>
                  </div>
                </label>

                <label
                  for="hs-radio-annual"
                  class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <input
                    id="hs-radio-annual"
                    type="radio"
                    name="hs-radio-annual"
                    class="shrink-0 mt-0.5 border-gray-200 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <div class="">
                    <p class="text-md font-bold text-gray-800 ms-3 mb-1.5">Annual</p>
                    <div class="text-xs ml-3 space-y-1.5">
                      <p>US$100.00/year</p>
                      <p>(US$8.33/month)</p>
                    </div>
                  </div>
                </label>

                <label
                  for="hs-radio-lifetime"
                  class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <input
                    id="hs-radio-lifetime"
                    type="radio"
                    name="hs-radio-lifetime"
                    class="shrink-0 mt-0.5 border-gray-200 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <div class="">
                    <p class="text-md font-bold text-gray-800 ms-3 mb-1.5">Lifetime</p>
                    <div class="text-xs ml-3 space-y-1.5">
                      <p>US$299.00</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-bold text-lg text-gray-800 mb-5">Select a payment method</h4>
            <div>
              <div class="grid sm:grid-cols-2 gap-2">
                <label
                  for="hs-radio-paypal"
                  class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <input
                    id="hs-radio-payment"
                    type="radio"
                    name="hs-radio-payment"
                    class="shrink-0 mt-0.5 border-gray-200 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <div class="space-y-3">
                    <div class="ms-3">
                      <img src="~/assets/images/paypal.png" alt="paypal" class="h-6" />
                    </div>
                    <div class="text-xs ml-3 space-y-1.5">
                      <p class="font-semibold text-gray-700">Pay With Paypal</p>
                    </div>
                  </div>
                </label>

                <label
                  for="hs-radio-payment"
                  class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <input
                    id="hs-radio-payment"
                    type="radio"
                    name="hs-radio-payment"
                    class="shrink-0 mt-0.5 border-gray-200 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <div class="space-y-3">
                    <div class="ms-3">
                      <img src="~/assets/images/credit-card.png" alt="paypal" class="h-6" />
                    </div>
                    <div class="text-xs ml-3 space-y-1.5">
                      <p>Other Payment Methods</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <hr />

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est delectus aliquid ab cum vel
          accusantium distinctio corporis, atque vitae obcaecati quo itaque a voluptate sunt ipsam
          repudiandae hic, optio ea.

          <div class="space-y-3">
            <InputLabel label="Discount Code" />
            <div class="flex items-center space-x-3">
              <input
                type="text"
                class="rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 bg-gray-50"
              />
              <NormalButton
                class="bg-yellow-500 text-white shadow-none disabled:bg-gray-300"
                :disabled="true"
              >
                Apply
              </NormalButton>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-6/12 p-10 md:min-h-full bg-gray-100 space-y-5">
        <h1 class="font-bold text-lg text-gray-800">Summary</h1>

        <div class="flex flex-col md:max-w-[400px]">
          <div class="pb-4 border-b border-b-gray-300">
            <div class="text-xs font-medium flex items-start justify-between">
              <p>Annual Membership</p>
              <div class="flex flex-col items-start space-y-1.5">
                <p>US$2.00/month</p>
                <p>(US$24.00 billed annually)</p>
              </div>
            </div>
          </div>

          <div class="flex items-start justify-between pt-4 text-xl font-bold text-gray-800 mb-10">
            <p>Today's Total</p>
            <p>$ 0.00</p>
          </div>

          <button
            type="button"
            class="bg-yellow-500 hover:bg-yellow-600 duration-200 text-white font-bold text-sm px-5 py-2.5 rounded-sm active:animate-press"
          >
            Start Your 7 Days Free Trial
          </button>

          <div class="my-10 text-xs text-gray-600 space-y-2.5">
            <p>
              By clicking 'Start Your 7 Day Free Trial', you agree to our
              <a href="#" class="underline">Terms of Service</a> and authorize this recurring
              charge.
            </p>
            <p>
              Have any questions? Write to our support team at
              <a href="#" class="underline"> help@skillshare.com </a> or visit our
              <a href="#" class="underline">Help Center</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
