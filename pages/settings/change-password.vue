<script setup lang="ts">
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import SettingSideTabs from '~/components/Tabs/SettingSideTabs.vue'
import { useAuthStore } from '~/stores/auth'

useHead({ title: 'Change Password' })

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
            <div>
              <form @submit.prevent="" class="space-y-4 md:space-y-6">
                <div>
                  <InputLabel label="Current Password" required />

                  <InputField
                    type="password"
                    name="current-password"
                    icon="fa-lock"
                    v-model="form.current_password"
                    placeholder="Enter Your Current Password"
                  />

                  <InputError :message="errors?.current_password" />
                </div>
                <div>
                  <InputLabel label="New Password" required />

                  <InputField
                    type="password"
                    name="new-password"
                    icon="fa-lock"
                    v-model="form.password"
                    placeholder="Enter New Password"
                  />

                  <InputError :message="errors?.password" />
                </div>

                <div>
                  <InputLabel label="Confirm Password" required />

                  <InputField
                    type="password"
                    name="password-confirmation"
                    icon="fa-lock"
                    v-model="form.password_confirmation"
                    placeholder="Retype Password"
                  />

                  <InputError :message="errors?.password_confirmation" />
                </div>

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
