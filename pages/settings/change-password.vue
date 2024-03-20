<script setup lang="ts">
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import SettingSideTabs from '~/components/Tabs/SettingSideTabs.vue'
import { useToken } from '~/composables/useToken'

useHead({ title: 'Change Password' })

definePageMeta({ layout: 'app-layout', middleware: 'auth' })

const { $axiosApi, $toast, $i18n } = useNuxtApp()
const { generateCaptchaToken } = useToken()

interface Error {
  current_password: string
  password: string
  captcha_token: string
}

const errors = ref<Error | null>(null)
const form = reactive({
  current_password: '',
  password: '',
  password_confirmation: ''
})

const handleChangePassword = async () => {
  try {
    const captchaToken = await generateCaptchaToken('change_password')

    const { data } = await $axiosApi.put('/user/change-password', {
      ...form,
      captcha_token: captchaToken
    })

    if (data.message) {
      errors.value = null
      form.current_password = ''
      form.password = ''
      form.password_confirmation = ''
    }

    $toast.success($i18n.t(data.message))
  } catch (error: any) {
    errors.value = error.response?.data?.errors
  }
}
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-5">
      <div class="flex flex-col md:flex-row items-start md:space-x-6 space-y-5 md:space-y-0">
        <div class="w-full md:w-3/12">
          <SettingSideTabs />
        </div>
        <div class="w-full md:w-9/12">
          <div class="bg-white border border-gray-200 p-10 rounded-md">
            <div>
              <form class="space-y-4 md:space-y-6" @submit.prevent="handleChangePassword">
                <div>
                  <InputLabel label="Current Password" required />

                  <InputField
                    v-model="form.current_password"
                    type="password"
                    name="current-password"
                    icon="fa-lock"
                    placeholder="Enter Your Current Password"
                  />

                  <InputError :message="errors?.current_password" />
                </div>
                <div>
                  <InputLabel label="New Password" required />

                  <InputField
                    v-model="form.password"
                    type="password"
                    name="new-password"
                    icon="fa-lock"
                    placeholder="Enter New Password"
                  />

                  <InputError :message="errors?.password" />
                </div>

                <div>
                  <InputLabel label="Confirm Password" required />

                  <InputField
                    v-model="form.password_confirmation"
                    type="password"
                    name="password-confirmation"
                    icon="fa-lock"
                    placeholder="Retype Password"
                  />
                </div>

                <InputError :message="errors?.captcha_token" />

                <div class="w-[250px] ml-auto">
                  <FormButton> {{ $t('Save Changes') }} </FormButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
