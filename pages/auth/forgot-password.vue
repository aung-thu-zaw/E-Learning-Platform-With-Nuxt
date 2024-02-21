<script setup lang="ts">
import FormButton from '~/components/Buttons/FormButton.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'

useHead({ title: 'Forgot Password' })

definePageMeta({ middleware: 'guest' })

const email = ref<string>('')
const store = useAuthStore()
const localPath = useLocalePath()
const { errors, status } = storeToRefs(store)
</script>

<template>
  <section class="flex flex-col items-center justify-start min-h-screen w-full">
    <div
      v-show="status"
      class="font-medium text-sm text-green-600 bg-green-100 p-3 w-full rounded-md text-center"
    >
      {{ status }}
    </div>

    <div class="min-w-[300px] w-[600px] mx-auto mt-32">
      <div class="flex w-full h-full items-center">
        <div class="mt-7 border rounded-xl shadow-sm bg-white border-gray-300 w-full mx-auto">
          <div class="p-4 sm:p-7">
            <div class="text-center">
              <h1 class="block text-2xl font-bold text-gray-700">{{ $t('Forgot password?') }}</h1>
              <p class="mt-2 text-sm text-gray-500">
                {{ $t('Remember your password?') }}
                <NuxtLink
                  :to="localPath('/auth/sign-in')"
                  class="text-yellow-500 decoration-2 hover:underline font-medium"
                >
                  {{ $t('Sign in here') }}
                </NuxtLink>
              </p>
            </div>

            <div class="mt-5">
              <!-- Form -->
              <form @submit.prevent="store.forgotPassword(email)">
                <div class="space-y-5">
                  <!-- Email Input -->
                  <div>
                    <InputLabel label="Email Address" required />

                    <InputField
                      v-model="email"
                      type="email"
                      name="your-email"
                      icon="fa-envelope"
                      placeholder="Enter Email Address"
                      required
                    />

                    <InputError :message="errors?.email" />
                  </div>

                  <InputError :message="errors?.captcha_token" />

                  <FormButton> {{ $t('Submit') }} </FormButton>
                </div>
              </form>
              <!-- End Form -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
