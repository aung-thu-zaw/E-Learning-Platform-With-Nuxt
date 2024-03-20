<script setup lang="ts">
import FormButton from '~/components/Buttons/FormButton.vue'
import SocialAuthButtons from '~/components/Buttons/SocialAuthButtons.vue'
import Checkbox from '~/components/Forms/Fields/Checkbox.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import { useAuthStore } from '~/stores/auth'
import type { RegisterForm } from '~/types/auth'

useHead({ title: 'Sign Up' })

definePageMeta({ layout: 'app-layout', middleware: 'guest' })

const store = useAuthStore()
const localPath = useLocalePath()
const { $toast } = useNuxtApp()
const { errors } = storeToRefs(store)
const acceptTerms = ref<boolean>(false)

const form: RegisterForm = reactive({
  display_name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const handleRegister = async () => {
  if (acceptTerms.value) {
    await store.register(form)
  } else {
    $toast.warning('You Need To Accept Terms And Conditions!')
  }
}
</script>

<template>
  <section class="py-10 pb-16">
    <div class="min-w-[300px] max-w-[600px] w-auto mx-auto">
      <div class="flex w-full h-full items-center">
        <div class="mt-7 border rounded-xl shadow-sm bg-white border-gray-300 w-full mx-auto">
          <div class="p-4 sm:p-7">
            <div class="text-center">
              <h1 class="block text-2xl font-bold text-gray-700">
                {{ $t('Create an account') }}
              </h1>
              <p class="mt-2 text-sm text-gray-500">
                {{ $t('Already have an account?') }}
                <NuxtLink
                  :to="localPath('/auth/sign-in')"
                  class="text-yellow-500 decoration-2 hover:underline font-medium"
                >
                  {{ $t('Sign in here') }}
                </NuxtLink>
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
              <form @submit.prevent="handleRegister">
                <div class="space-y-5">
                  <!-- Username / Name -->
                  <div>
                    <InputLabel label="Display Name" required />

                    <InputField
                      v-model="form.display_name"
                      type="text"
                      name="your-name"
                      icon="fa-user"
                      placeholder="Enter Your Name"
                      required
                    />

                    <InputError :message="errors?.display_name" />
                  </div>

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

                  <!-- Remember me and Forgot Password -->
                  <div class="flex items-center justify-between mb-5">
                    <div>
                      <label class="flex items-center text-sm">
                        <Checkbox v-model:checked="acceptTerms" />
                        <span class="text-gray-600 ml-3"> I accept the</span>

                        &nbsp;

                        <a
                          href="#"
                          class="text-yellow-500 decoration-2 hover:underline font-medium"
                        >
                          {{ $t('Terms & Conditions') }}
                        </a>
                      </label>
                    </div>
                  </div>

                  <InputError :message="errors?.captcha_token" />

                  <FormButton> {{ $t('Create Account') }} </FormButton>
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
