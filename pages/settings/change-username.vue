<script setup lang="ts">
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import Checkbox from '@/components/Forms/Fields/Checkbox.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import SettingSideTabs from '~/components/Tabs/SettingSideTabs.vue'
import { useToken } from '~/composables/useToken'
import { useAuthStore } from '~/stores/auth'

useHead({ title: 'Change Username' })

definePageMeta({ layout: 'app-layout', middleware: 'auth' })

interface Error {
  username: string
  captcha_token: string
}
const errors = ref<Error | null>(null)
const form = reactive({
  username: '',
  profile_private: false,
  remove_from_search: false
})

const { $axiosApi, $toast, $i18n } = useNuxtApp()
const { generateCaptchaToken } = useToken()
const { user } = storeToRefs(useAuthStore())

onMounted(() => {
  form.username = user.value?.username ?? ''
  form.profile_private = user.value?.profile_private ?? false
  form.remove_from_search = user.value?.remove_from_search ?? false
})

const handleUpdateProfile = async () => {
  try {
    const captchaToken = await generateCaptchaToken('update_profile')

    const { data } = await $axiosApi.put('/user/profile', {
      ...form,
      captcha_token: captchaToken
    })

    if (data.message) errors.value = null

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
            <form class="space-y-4 md:space-y-6" @submit.prevent="handleUpdateProfile">
              <div>
                <InputLabel label="Username" />

                <p class="text-xs font-semibold text-gray-700 mb-3">
                  {{ $t('Your Profile URL') }}: https://www.skillshare.com/en/user/{{
                    form.username
                  }}
                </p>

                <InputField v-model="form.username" type="text" name="username" icon="fa-user" />

                <InputError :message="errors?.username" />
              </div>

              <div class="space-y-3">
                <h1 class="font-bold text-md text-gray-700">{{ $t('Privacy') }}</h1>

                <div class="space-x-3 flex items-start">
                  <Checkbox v-model:checked="form.profile_private" />
                  <h3 class="font-semibold text-sm text-gray-700">
                    {{ $t('Make my profile private') }}
                  </h3>
                </div>

                <div class="space-x-3 flex items-start">
                  <Checkbox v-model:checked="form.remove_from_search" />
                  <h3 class="font-semibold text-sm text-gray-700">
                    {{ $t('Remove my profile from web search results') }}
                  </h3>
                </div>
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
  </section>
</template>
