<script setup lang="ts">
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import SettingSideTabs from '~/components/Tabs/SettingSideTabs.vue'
import { useAuthStore } from '~/stores/auth'
import { useToken } from '~/composables/useToken'

useHead({ title: 'Change Email Address' })

definePageMeta({ layout: 'app-layout', middleware: 'auth' })

const store = useAuthStore()

const { $axiosApi, $toast, $i18n } = useNuxtApp()
const { user, status } = storeToRefs(store)
const { generateCaptchaToken } = useToken()

interface Error {
  current_email: string
  email: string
  email_confirmation: string
  captcha_token: string
}

const errors = ref<Error | null>(null)
const form = reactive({
  current_email: '',
  email: '',
  email_confirmation: ''
})

const handleUpdateEmailAddress = async () => {
  try {
    const captchaToken = await generateCaptchaToken('change_email')

    const { data } = await $axiosApi.put('/user/change-email', {
      ...form,
      captcha_token: captchaToken
    })

    if (data.message) {
      errors.value = null
      form.email = ''
      form.email_confirmation = ''
    }

    await store.getAuthenticatedUser()

    form.current_email = user.value?.email ?? form.current_email

    $toast.success($i18n.t(data.message))
  } catch (error: any) {
    errors.value = error.response?.data?.errors
  }
}

onMounted(() => (form.current_email = user.value?.email ?? ''))
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-5">
      <div class="flex flex-col md:flex-row items-start md:space-x-6 space-y-5 md:space-y-0">
        <div class="w-full md:w-3/12">
          <SettingSideTabs />
        </div>
        <div class="w-full md:w-9/12">
          <div class="bg-white border border-gray-300 p-10 rounded-md">
            <form class="space-y-4 md:space-y-6" @submit.prevent="handleUpdateEmailAddress">
              <div>
                <InputLabel label="Current Email Address" />

                <InputField
                  v-model="form.current_email"
                  type="email"
                  name="current_email"
                  icon="fa-envelope"
                  disabled
                />

                <InputError :message="errors?.current_email" />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <InputLabel label="New Email Address" required />

                  <InputField
                    v-model="form.email"
                    type="email"
                    name="new_email"
                    icon="fa-envelope"
                    placeholder="Enter New Email Address"
                    required
                  />

                  <InputError :message="errors?.email" />
                </div>

                <div>
                  <InputLabel label="Confirm New Email Address" required />

                  <InputField
                    v-model="form.email_confirmation"
                    type="email"
                    name="confirm_email"
                    icon="fa-envelope"
                    placeholder="Enter Confirm New Email Address"
                    required
                  />
                </div>
              </div>

              <InputError :message="errors?.captcha_token" />

              <div v-show="user?.email_verified_at === null" class="text-center">
                <p class="text-sm mt-2 text-main-orange">
                  Your email address is unverified.
                  <button
                    type="button"
                    class="underline text-sm font-semibold text-yellow-600 hover:text-yellow-500"
                    @click="store.sendVerificationEmail()"
                  >
                    Click here to re-send the verification email.
                  </button>
                </p>

                <div
                  v-show="status === 'verification-link-sent'"
                  class="mt-2 font-medium text-sm text-green-600"
                >
                  A new verification link has been sent to your email address.
                </div>
              </div>

              <div class="space-y-3">
                <p class="font-semibold text-sm text-gray-700">
                  {{
                    $t(
                      "For security purposes, we'll send a verification link to update your email address. Please follow the instructions provided in the verification email for the change to take effect."
                    )
                  }}
                </p>

                <p class="font-semibold text-sm text-gray-700">
                  {{
                    $t(
                      "If you encounter any issues or need assistance, please don't hesitate to contact our support team."
                    )
                  }}
                </p>

                <p class="font-semibold text-sm text-gray-700">
                  {{
                    $t(
                      'Please be aware that if your account was previously linked to a social media account, updating your email address might unlink them.'
                    )
                  }}
                </p>
              </div>

              <div class="w-[200px] ml-auto">
                <FormButton> {{ $t('Update Email') }} </FormButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
