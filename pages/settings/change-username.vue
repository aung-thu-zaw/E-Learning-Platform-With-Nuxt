<script setup lang="ts">
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import Checkbox from '@/components/Forms/Fields/Checkbox.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import SettingSideTabs from '~/components/Tabs/SettingSideTabs.vue'
import { useAuthStore } from '~/stores/auth'

useHead({ title: 'Change Username' })

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
                <InputLabel label="Username" />

                <p class="text-xs font-semibold text-gray-700 mb-3">
                  {{ $t('Your Profile URL') }}: https://www.skillshare.com/en/user/aung_thu_zaw
                </p>

                <InputField
                  v-model="form.current_email"
                  type="text"
                  name="username"
                  icon="fa-user"
                />

                <InputError :message="errors?.current_email" />
              </div>

              <div class="space-y-3">
                <h1 class="font-bold text-md text-gray-700">{{ $t('Privacy') }}</h1>

                <div class="space-x-3 flex items-start">
                  <Checkbox />
                  <h3 class="font-semibold text-sm text-gray-700">
                    {{ $t('Make my profile private') }}
                  </h3>
                </div>

                <div class="space-x-3 flex items-start">
                  <Checkbox />
                  <h3 class="font-semibold text-sm text-gray-700">
                    {{ $t('Remove my profile from web search results') }}
                  </h3>
                </div>
              </div>

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
