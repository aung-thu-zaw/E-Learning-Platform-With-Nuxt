<script setup lang="ts">
import FormButton from '~/components/Buttons/FormButton.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import { useAuthStore } from '~/stores/auth'
import type { ResetPasswordForm } from '~/types/auth'

useHead({ title: 'Reset Password' })

definePageMeta({ middleware: 'guest' })

const route = useRoute()
const store = useAuthStore()
const localPath = useLocalePath()
const { errors } = storeToRefs(store)

const form: ResetPasswordForm = reactive({
  token: route.params.token ? route.params.token.toString() : '',
  email: route.query.email ? route.query.email.toString() : '',
  password: '',
  password_confirmation: ''
})
</script>

<template>
  <section class="flex items-center justify-center min-h-screen w-full">
    <div class="min-w-[300px] w-[600px] mx-auto">
      <div class="flex w-full h-full items-center">
        <div class="mt-7 border rounded-xl shadow-sm bg-white border-gray-300 w-full mx-auto">
          <div class="p-4 sm:p-7">
            <div class="text-center">
              <h1 class="block text-2xl font-bold text-gray-700">E-Learning Platform</h1>
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
              <form @submit.prevent="store.resetPassword(form)">
                <div class="space-y-5">
                  <!-- Email Input -->
                  <div>
                    <InputLabel label="Email Address" required />

                    <InputField
                      v-model="form.email"
                      type="email"
                      name="your-email"
                      icon="fa-envelope"
                      placeholder="Enter Email Address"
                      required
                    />

                    <InputError :message="errors?.email || undefined" />
                  </div>

                  <!-- Password Input -->
                  <div>
                    <InputLabel label="New Password" required />

                    <InputField
                      v-model="form.password"
                      type="password"
                      name="your-password"
                      icon="fa-lock"
                      placeholder="Enter Password"
                      required
                    />

                    <InputError :message="errors?.password || undefined" />
                  </div>

                  <!-- Confirm Password Input -->
                  <div>
                    <InputLabel label="Confirm Password" required />

                    <InputField
                      v-model="form.password_confirmation"
                      type="password"
                      name="confirm-password"
                      icon="fa-lock"
                      placeholder="Re-type Password"
                      required
                    />
                  </div>

                  <InputError :message="errors?.captcha_token" />

                  <FormButton> Reset Password </FormButton>
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
