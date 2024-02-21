<script setup lang="ts">
import FormButton from '~/components/Buttons/FormButton.vue'
import SocialAuthButtons from '~/components/Buttons/SocialAuthButtons.vue'
import Checkbox from '~/components/Forms/Fields/Checkbox.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import { useAuthStore } from '~/stores/auth'

useHead({ title: 'Sign In' })

definePageMeta({ layout: 'app-layout', middleware: 'guest' })

const store = useAuthStore()
const localPath = useLocalePath()
const { errors, status } = storeToRefs(store)

interface Form {
  email: string
  password: string
  remember: boolean
}

const form: Form = reactive({
  email: '',
  password: '',
  remember: false
})
</script>

<template>
  <section class="py-10 pb-16">
    <div class="min-w-[300px] max-w-[600px] w-auto mx-auto">
      <div class="flex w-full h-full items-center">
        <div class="mt-7 border rounded-xl shadow-sm bg-white border-gray-300 w-full mx-auto">
          <div class="p-4 sm:p-7">
            <div class="text-center">
              <h1 class="block text-2xl font-bold text-gray-700">{{ $t('Welcome Back') }}</h1>
              <p class="mt-2 text-sm text-gray-500">
                {{ $t("Don't have an account yet?") }}
                <NuxtLink
                  :to="localPath('/auth/sign-up')"
                  class="text-yellow-500 decoration-2 hover:underline font-medium"
                >
                  {{ $t('Sign up here') }}
                </NuxtLink>
              </p>

              <p class="text-sm font-medium text-green-600 text-center">
                {{ status }}
              </p>
            </div>

            <div class="mt-5">
              <SocialAuthButtons />

              <div
                class="py-3 flex items-center text-xs uppercase before:flex-[1_1_0%] before:border-t before:me-6 after:flex-[1_1_0%] after:border-t after:ms-6 text-gray-500 before:border-gray-600 after:border-gray-600"
              >
                Or
              </div>

              <!-- Form -->
              <form @submit.prevent="store.login(form)">
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

                    <InputError :message="errors?.email" />
                  </div>

                  <!-- Password Input -->
                  <div>
                    <InputLabel label="Password" required />

                    <InputField
                      v-model="form.password"
                      type="password"
                      name="your-password"
                      icon="fa-lock"
                      placeholder="Enter Password"
                      required
                    />

                    <InputError :message="errors?.password" />
                  </div>

                  <!-- Remember me and Forgot Password -->
                  <div class="flex items-center justify-between mb-5">
                    <div>
                      <label class="flex items-center">
                        <Checkbox v-model:checked="form.remember" />
                        <span class="ml-2 text-sm text-slate-600">{{ $t('Remember Me') }}</span>
                      </label>
                    </div>

                    <div>
                      <NuxtLink
                        :to="localPath('/auth/forgot-password')"
                        class="underline text-sm text-slate-600 font-[500] rounded-md hover:text-yellow-600"
                      >
                        {{ $t('Forgot Password ?') }}
                      </NuxtLink>
                    </div>
                  </div>

                  <InputError :message="errors?.captcha_token" />

                  <FormButton> {{ $t('Sign In') }} </FormButton>
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
