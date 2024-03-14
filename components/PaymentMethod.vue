<script setup lang="ts">
const selectedMethod = ref<string | null>(null)
const emit = defineEmits(['paymentSelected'])

const emitPaymentSelection = () => {
  if (selectedMethod.value !== null) emit('paymentSelected', selectedMethod.value)
}

onMounted(() => {
  if (!selectedMethod.value) {
    selectedMethod.value = 'paypal'
    emit('paymentSelected', 'paypal')
  }
})
</script>

<template>
  <div>
    <h4 class="font-bold text-lg text-gray-800 mb-5">Select a payment method</h4>
    <div>
      <div class="grid sm:grid-cols-2 gap-2">
        <label
          for="hs-radio-paypal"
          class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <input
            id="hs-radio-paypal"
            v-model="selectedMethod"
            type="radio"
            name="hs-radio-paypal"
            class="shrink-0 mt-0.5 border-gray-200 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
            value="paypal"
            @change="emitPaymentSelection"
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
          for="hs-radio-card"
          class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <input
            id="hs-radio-card"
            v-model="selectedMethod"
            type="radio"
            name="hs-radio-card"
            class="shrink-0 mt-0.5 border-gray-200 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
            value="card"
            @change="emitPaymentSelection"
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
</template>
