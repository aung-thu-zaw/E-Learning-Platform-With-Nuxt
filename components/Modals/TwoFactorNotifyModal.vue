<script setup lang="ts">
import InputField from '~/components/Forms/Fields/InputField.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import Modal from '~/components/ModalContainer.vue'
import { useAuthStore } from '~/stores/auth'
import { useToken } from '~/composables/useToken'

const confirmingTwoFactor = ref(false)
const errors = ref<{ current_password: string; captcha_token: string } | null>(null)
const currentPassword = ref<string>('')

const localePath = useLocalePath()

const { $axiosApi } = useNuxtApp()
const { generateCaptchaToken } = useToken()
const { user } = storeToRefs(useAuthStore())

const confirmTwoFactor = async () => await handleUpdateTwoFactor()

const closeModal = () => (confirmingTwoFactor.value = false)

const handleUpdateTwoFactor = async () => {
  try {
    const captchaToken = await generateCaptchaToken('update_two_factor_authentication')

    await $axiosApi.put('/user/two-factor-authentication', {
      enabled_two_factor: !user.value?.enabled_two_factor,
      current_password: currentPassword.value,
      captcha_token: captchaToken
    })

    window.location.href = localePath('/auth/sign-in')
  } catch (error: any) {
    errors.value = error.response?.data?.errors
  }
}
</script>

<template>
  <div>
    <NormalButton
      class="bg-yellow-500 text-white hover:bg-yellow-600 shadow-none"
      @click="confirmingTwoFactor = true"
    >
      {{ !user?.enabled_two_factor ? $t('Enable') : $t('Disable') }}
    </NormalButton>

    <Modal :show="confirmingTwoFactor" @close="closeModal">
      <div class="p-6 bg-white rounded-md max-w-[700px] mx-auto">
        <h2 class="text-lg font-bold text-gray-800 mb-5">
          {{
            !user?.enabled_two_factor
              ? $t('Enable two-factor authentication')
              : $t('Disable two-factor authentication')
          }}
        </h2>

        <p class="text-sm font-medium text-gray-700">
          {{
            !user?.enabled_two_factor
              ? $t(
                  'Enabling two-factor authentication will log you out of our platform from all currently logged-in devices.'
                )
              : $t(
                  'Disabling two-factor authentication will log you out of our platform from all currently logged-in devices.'
                )
          }}
        </p>

        <form class="space-y-4">
          <div class="mt-6">
            <InputField
              v-model="currentPassword"
              type="password"
              name="password"
              placeholder="Enter Your Current Password"
            />
            <InputError :message="errors?.current_password" />
          </div>

          <InputError :message="errors?.captcha_token" />

          <div class="mt-6 flex justify-end space-x-5">
            <NormalButton
              class="bg-gray-500 hover:bg-gray-600 text-white shadow-none"
              @click="closeModal"
            >
              {{ $t('Cancel') }}
            </NormalButton>
            <NormalButton
              class="bg-yellow-500 hover:bg-yellow-600 text-white shadow-none"
              @click="confirmTwoFactor"
            >
              {{ $t('Confirm') }}
            </NormalButton>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>
