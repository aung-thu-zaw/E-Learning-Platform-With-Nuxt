<script setup lang="ts">
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import TextAreaField from '@/components/Forms/Fields/TextAreaField.vue'
import FileInput from '@/components/Forms/Fields/FileInput.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import SettingSideTabs from '~/components/Tabs/SettingSideTabs.vue'
import { useAuthStore } from '~/stores/auth'

useHead({ title: 'Change Email Address' })

definePageMeta({ layout: 'app-layout' })

const store = useAuthStore()

const { user, errors } = storeToRefs(store)

const form = reactive({
  display_name: user.value?.display_name,
  headline: user.value?.headline,
  about_me: user.value?.about_me,
  facebook_url: user.value?.facebook_url,
  twitter_url: user.value?.twitter_url,
  instagram_url: user.value?.instagram_url,
  pinterest_url: user.value?.pinterest_url,
  youtube_url: user.value?.youtube_url,
  github_url: user.value?.github_url,
  personal_website_url: user.value?.personal_website_url,
  avatar: user.value?.avatar
})

watch(
  () => user.value,
  () => {
    form.display_name = user.value?.display_name
    form.headline = user.value?.headline
    form.about_me = user.value?.about_me
    form.facebook_url = user.value?.facebook_url
    form.twitter_url = user.value?.twitter_url
    form.instagram_url = user.value?.instagram_url
    form.pinterest_url = user.value?.pinterest_url
    form.youtube_url = user.value?.youtube_url
    form.github_url = user.value?.github_url
    form.personal_website_url = user.value?.personal_website_url
    form.avatar = user.value?.avatar
  }
)

const handleUpdateInformation = async () => await store.getAuthenticatedUser()
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
            <form class="space-y-4 md:space-y-6" @submit.prevent="handleUpdateInformation">
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
                    v-model="form.confirm_email"
                    type="email"
                    name="confirm_email"
                    icon="fa-envelope"
                    placeholder="Enter Confirm New Email Address"
                    required
                  />

                  <InputError :message="errors?.email" />
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
