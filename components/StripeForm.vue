<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
import type { Stripe, StripeCardElement } from '@stripe/stripe-js'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'

const props = defineProps<{ plan: string }>()

let stripe: Stripe | null = null
let card: StripeCardElement | null = null
let clientSecret: string = ''
const cardholderName = ref<string>('')
const phoneNumber = ref<string>('')

const { $axiosApi } = useNuxtApp()

onMounted(async () => {
  try {
    stripe = await loadStripe(useRuntimeConfig().public.stripe.STRIPE_KEY)
    if (stripe) {
      const elements = stripe.elements()
      if (elements) {
        card = elements.create('card')
        if (card) {
          card.mount('#card-element')

          card.on('change', (event) => {
            const displayError = document.getElementById('card-errors')
            if (displayError) {
              if (event.error) {
                displayError.textContent = event.error.message
              } else {
                displayError.textContent = ''
              }
            }
          })

          await getClientSecret()
        }
      }
    }
  } catch (error) {
    console.error('Error loading Stripe:', error)
  }
})

const getClientSecret = async () => {
  const { data } = await $axiosApi.get('/user/stripe-intent')

  clientSecret = data.intent.client_secret
}

const handleSubmit = async () => {
  try {
    if (!stripe) {
      throw new Error('Stripe is not initialized')
    }

    if (!card) {
      throw new Error('Card element is not initialized')
    }

    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card,
        billing_details: { name: cardholderName.value, phone: phoneNumber.value }
      }
    })

    if (error) {
      const displayError = document.getElementById('card-errors')
      if (displayError) {
        displayError.textContent = error?.message ?? ''
      }
    } else {
      await $axiosApi.post('/subscribe', {
        subscription_plan: props.plan,
        payment_method: setupIntent.payment_method
      })
    }
  } catch (error: any) {
    console.error('Error processing payment:', error.message)
  }
}
</script>

<template>
  <div>
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <div>
        <InputLabel label="Cardholder Name" required />

        <input
          v-model="cardholderName"
          type="text"
          placeholder="Enter Cardholder Name"
          class="px-5 py-3.5 text-sm border border-gray-300 rounded-md font-medium w-full focus:outline-none focus:ring-0 focus:border-gray-300"
          required
        />
      </div>

      <div>
        <InputLabel label="Phone Number" required />

        <input
          v-model="phoneNumber"
          type="text"
          placeholder="Enter Your Phone Number"
          class="px-5 py-3.5 text-sm border border-gray-300 rounded-md font-medium w-full focus:outline-none focus:ring-0 focus:border-gray-300"
          required
        />
      </div>

      <div>
        <InputLabel label="Credit Card / Debit Card" required />
        <div
          id="card-element"
          class="form-control px-2 py-4 border border-gray-300 rounded-md"
        ></div>
      </div>
      <div id="card-errors" role="alert" class="text-red-600"></div>
    </form>
  </div>
</template>
