<script setup lang="ts">
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import FileInput from '@/components/Forms/Fields/FileInput.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import SettingSideTabs from '~/components/Tabs/SettingSideTabs.vue'
import { useAuthStore } from '~/stores/auth'
import { useImagePreview } from '~/composables/useImagePreview'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

useHead({ title: 'Profile Information' })

definePageMeta({ layout: 'app-layout', middleware: 'auth' })

interface Error {
  display_name: string
  headline: string
  about_me: string
  facebook_url: string
  twitter_url: string
  instagram_url: string
  pinterest_url: string
  youtube_url: string
  github_url: string
  personal_website_url: string
  avatar: string
  captcha_token: string
}

const store = useAuthStore()
const profileInformationForm = ref<HTMLFormElement | null>(null)
const errors = ref<Error | null>(null)
const form = reactive({
  display_name: '',
  headline: '',
  about_me: '',
  facebook_url: '',
  twitter_url: '',
  instagram_url: '',
  pinterest_url: '',
  youtube_url: '',
  github_url: '',
  personal_website_url: '',
  avatar: ''
})

const { $axiosApi, $toast, $i18n } = useNuxtApp()
const { generateCaptchaToken } = useToken()
const { user } = storeToRefs(useAuthStore())

onMounted(() => {
  form.display_name = user.value?.display_name ?? ''
  form.headline = user.value?.headline ?? ''
  form.about_me = user.value?.about_me ?? ''
  form.facebook_url = user.value?.facebook_url ?? ''
  form.twitter_url = user.value?.twitter_url ?? ''
  form.instagram_url = user.value?.instagram_url ?? ''
  form.pinterest_url = user.value?.pinterest_url ?? ''
  form.youtube_url = user.value?.youtube_url ?? ''
  form.github_url = user.value?.github_url ?? ''
  form.personal_website_url = user.value?.personal_website_url ?? ''
  form.avatar = user.value?.avatar ?? ''
})

const { previewImage, setImagePreview } = useImagePreview(user.value?.avatar ?? '')

const handleUpdateProfileInformation = async () => {
  try {
    const captchaToken = await generateCaptchaToken('update_profile_information')

    const { data } = await $axiosApi.post(
      '/user/profile-information',
      {
        ...form,
        _method: 'PUT',
        captcha_token: captchaToken
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    if (data.message) errors.value = null

    store.getAuthenticatedUser()

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
              <div class="flex flex-col items-center overflow-hidden py-5 space-y-3">
                <img
                  :src="previewImage"
                  alt="avatar"
                  class="rounded-full border border-slate-400 ring-2 ring-slate-200 w-32 h-32 object-cover"
                />

                <div class="text-center">
                  <h1 class="font-bold text-xl gray-800">{{ user?.display_name }}</h1>
                </div>
              </div>

              <form
                ref="profileInformationForm"
                class="space-y-4 md:space-y-6"
                @submit.prevent="handleUpdateProfileInformation"
              >
                <div>
                  <InputLabel label="Display Name" required />

                  <InputField
                    v-model="form.display_name"
                    type="text"
                    name="user-name"
                    icon="fa-user"
                    placeholder="Enter Your Full Name"
                  />

                  <InputError :message="errors?.display_name" />
                </div>

                <div>
                  <InputLabel label="Headline" />

                  <InputField
                    v-model="form.headline"
                    type="text"
                    name="headline"
                    icon="fa-trophy"
                    placeholder="Enter Headline"
                  />

                  <InputError :message="errors?.headline" />
                </div>

                <div>
                  <InputLabel label="About" />

                  <ClientOnly>
                    <QuillEditor
                      v-model:content="form.about_me"
                      theme="snow"
                      content-type="html"
                      :toolbar="[
                        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ color: [] }, { background: [] }],
                        ['blockquote', 'code-block'],
                        ['link', 'image', 'video'],
                        [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                        [{ indent: '-1' }, { indent: '+1' }],
                        [{ direction: 'rtl' }]
                      ]"
                    />
                  </ClientOnly>

                  <InputError :message="errors?.about_me" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <InputLabel label="Facebook" />

                    <InputField
                      v-model="form.facebook_url"
                      type="text"
                      name="facebook_url"
                      icon="fa-brands fa-facebook"
                      placeholder="Enter Your Facebook URL"
                    />

                    <InputError :message="errors?.facebook_url" />
                  </div>

                  <div>
                    <InputLabel label="Twitter" />

                    <InputField
                      v-model="form.twitter_url"
                      type="text"
                      name="twitter_url"
                      icon="fa-brands fa-twitter"
                      placeholder="Enter Your Twitter URL"
                    />

                    <InputError :message="errors?.twitter_url" />
                  </div>

                  <div>
                    <InputLabel label="Instagram" />

                    <InputField
                      v-model="form.instagram_url"
                      type="text"
                      name="instagram_url"
                      icon="fa-brands fa-instagram"
                      placeholder="Enter Your Instagram URL"
                    />

                    <InputError :message="errors?.instagram_url" />
                  </div>

                  <div>
                    <InputLabel label="Pinterest" />

                    <InputField
                      v-model="form.pinterest_url"
                      type="text"
                      name="pinterest_url"
                      icon="fa-brands fa-pinterest"
                      placeholder="Enter Your Pinterest URL"
                    />

                    <InputError :message="errors?.pinterest_url" />
                  </div>

                  <div>
                    <InputLabel label="Youtube" />

                    <InputField
                      v-model="form.youtube_url"
                      type="text"
                      name="youtube_url"
                      icon="fa-brands fa-youtube"
                      placeholder="Enter Your Youtube URL"
                    />

                    <InputError :message="errors?.youtube_url" />
                  </div>

                  <div>
                    <InputLabel label="GitHub" />

                    <InputField
                      v-model="form.github_url"
                      type="text"
                      name="github_url"
                      icon="fa-brands fa-github"
                      placeholder="Enter Your GitHub URL"
                    />

                    <InputError :message="errors?.github_url" />
                  </div>
                </div>

                <div>
                  <InputLabel label="Personal Website" />

                  <InputField
                    v-model="form.personal_website_url"
                    type="text"
                    name="personal_website_url"
                    icon="fa-globe"
                    placeholder="Enter Your Personal Website URL"
                  />

                  <InputError :message="errors?.personal_website_url" />
                </div>

                <div>
                  <InputLabel label="Avatar" />

                  <FileInput
                    v-model="form.avatar"
                    name="avatar"
                    text="PNG, JPG or JPEG ( Max File Size : 1.5 MB )"
                    @update:model-value="setImagePreview"
                  />

                  <InputError :message="errors?.avatar" />
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

<style scoped lang="css">
:deep(.ql-editor) {
  min-height: 200px;
}
:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
