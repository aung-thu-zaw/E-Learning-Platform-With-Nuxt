<script setup lang="ts">
const options = [
  { label: 'Monthly', value: 'price_1Otm2nLOhkUjdRduKZO6l8FK', price: 'US$10.00/month' },
  {
    label: 'Annual',
    value: 'price_1Otm3OLOhkUjdRducl5BjjOe',
    price: 'US$100.00/year (US$8.33/month)'
  },
  { label: 'Lifetime', value: 'price_1Otm4SLOhkUjdRduMk9aBoGw', price: 'US$299.00' }
]

const selectedPlan = ref<string | null>(null)
const emit = defineEmits(['planSelected'])

const emitPlanSelection = () => {
  if (selectedPlan.value !== null) emit('planSelected', selectedPlan.value)
}

onMounted(() => {
  if (!selectedPlan.value) {
    selectedPlan.value = options[0].value
    emit('planSelected', options[0].value)
  }
})
</script>

<template>
  <div>
    <h4 class="font-bold text-lg text-gray-800 mb-5">Select a plan</h4>
    <div>
      <div class="grid sm:grid-cols-3 gap-2">
        <label
          v-for="(option, index) in options"
          :key="index"
          :for="'hs-radio-' + option.value"
          class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 cursor-pointer"
        >
          <input
            :id="'hs-radio-' + option.value"
            v-model="selectedPlan"
            type="radio"
            :name="'hs-radio-' + option.value"
            :value="option.value"
            class="shrink-0 mt-0.5 border-gray-200 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
            @change="emitPlanSelection"
          />
          <div>
            <p class="text-md font-bold text-gray-800 ms-3 mb-1.5">{{ option.label }}</p>
            <div class="text-xs ml-3 space-y-1.5">
              <p v-if="option.price">{{ option.price }}</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
