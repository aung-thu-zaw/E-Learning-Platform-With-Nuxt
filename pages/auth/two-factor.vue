<script setup lang="ts">
import FormButton from '~/components/Buttons/FormButton.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import { useToken } from '~/composables/useToken'

useHead({ title: 'Two Factor' })

definePageMeta({ middleware: 'auth' })

const { generateCaptchaToken } = useToken()
const { $axios } = useNuxtApp()

interface Error {
  two_factor_code: string
  captcha_token: string
}

const localePath = useLocalePath()
const code = ref(new Array(6).fill(''))
const errors = ref<Error | null>(null)
const submitting = ref(false)
const status = ref('')

const submitTwoFactorCode = async () => {
  try {
    submitting.value = true
    const captchaToken = await generateCaptchaToken('verify_two_factor_code')

    const { data } = await $axios.post('/verify-otp', {
      two_factor_code: code.value.join(''),
      captcha_token: captchaToken
    })

    if (data.message) useRouter().push({ path: localePath('/') })
  } catch (error: any) {
    errors.value = error.response?.data?.errors
  } finally {
    submitting.value = false
  }
}

const resendANewCode = async () => {
  try {
    const { data } = await $axios.post('/resend-otp')

    console.log(data)

    status.value = data.status
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

const handleCodeInput = (index: number, value: string) => {
  if (value.length === 1) {
    if (index < code.value.length) {
      code.value[index] = value
    } else {
      const nextInput = document.querySelector(`#codeInput_${index + 1}`) as HTMLInputElement
      if (nextInput) {
        nextInput.focus()
      }
    }
  }
}
</script>

<template>
  <section class="flex flex-col items-center justify-start min-h-screen w-full">
    <div class="py-10 container">
      <div class="max-w-[400px] space-y-14 w-full mx-auto flex flex-col">
        <h2 class="font-bold text-lg text-gray-800 py-5 border-b border-b-gray-300 text-center">
          {{ $t('Two-factor Authentication') }}
        </h2>

        <div class="flex items-center justify-center">
          <img src="~/assets/images/authentication.png" alt="authentication" />
        </div>

        <p class="text-sm font-medium text-center">
          {{ $t("Check your inbox, we've sent you a 6-digit code.") }}
        </p>

        <form @submit.prevent="submitTwoFactorCode">
          <div class="space-y-5">
            <div>
              <div class="flex items-center justify-center space-x-3" data-hs-pin-input>
                <input
                  v-for="(digit, index) in code"
                  :id="'codeInput_' + index"
                  :key="index"
                  v-model="code[index]"
                  type="number"
                  class="block w-[38px] text-center border-gray-300 rounded-md text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-300 duration-200"
                  :disabled="submitting"
                  maxlength="1"
                  max="9"
                  min="0"
                  data-hs-pin-input-item
                  :autofocus="index === 0"
                  @input="handleCodeInput(index, ($event.target as HTMLInputElement)?.value)"
                />
              </div>

              <div class="flex items-center justify-center">
                <InputError :message="errors?.two_factor_code" />
              </div>
            </div>

            <InputError :message="errors?.captcha_token" />

            <FormButton :loading="submitting"> {{ $t('Submit') }} </FormButton>
          </div>
        </form>

        <div v-show="status" class="mt-2 font-medium text-sm text-green-600">
          {{ $t(status) }}
        </div>

        <p class="text-sm font-medium text-center">
          {{ $t("Don't get a code?") }}
          <button type="button" class="text-yellow-500 hover:underline" @click="resendANewCode">
            {{ $t('Resend Code') }}
          </button>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
