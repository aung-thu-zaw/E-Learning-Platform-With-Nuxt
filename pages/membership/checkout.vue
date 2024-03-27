<script setup lang="ts">
import UserDropdown from '~/components/Dropdowns/UserDropdown.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import StripeForm from '~/components/StripeForm.vue'
import PaymentMethod from '~/components/PaymentMethod.vue'
import SubscriptionPlan from '~/components/SubscriptionPlan.vue'
import SubscriptionSummary from '~/components/SubscriptionSummary.vue'

useHead({ title: 'Checkout' })

definePageMeta({ middleware: 'auth' })

const localePath = useLocalePath()

const selectedPlan = ref<string | null>(null)
const selectedPayment = ref<string | null>(null)

const handlePlanSelection = (plan: string) => (selectedPlan.value = plan)
const handlePaymentSelection = (paymentMethod: string) => (selectedPayment.value = paymentMethod)
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

          <SubscriptionPlan @plan-selected="handlePlanSelection" />

          <PaymentMethod @payment-selected="handlePaymentSelection" />

          <hr />

          <div v-if="selectedPayment === 'card'">
            <div v-if="selectedPlan">
              <StripeForm :plan="selectedPlan" />
            </div>
            <div v-else>
              <p class="text-center font-bold text-sm text-yellow-500">
                You need to select plan first.
              </p>
            </div>
          </div>
          <div v-if="selectedPayment === 'paypal'" class="flex items-center justify-between">
            <div>
              <h1 class="font-bold text-lg text-gray-800">PayPal</h1>

              <p class="text-xs">Start your free 7 days by using PayPal Checkout.</p>
            </div>

            <button
              type="submit"
              class="bg-yellow-500 hover:bg-yellow-600 duration-200 text-white font-bold text-xs px-5 py-2.5 rounded-sm active:animate-press"
            >
              Checkout with Paypal
            </button>
          </div>

          <div class="space-y-3">
            <InputLabel label="Discount Code" />
            <div class="flex items-center space-x-3">
              <input
                type="text"
                class="text-sm border py-3 border-gray-300 rounded-md font-medium focus:outline-none focus:ring-0 focus:border-gray-300"
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
      <div class="w-full md:w-6/12 p-10 md:min-h-full bg-gray-100">
        <SubscriptionSummary />
      </div>
    </div>
  </section>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
