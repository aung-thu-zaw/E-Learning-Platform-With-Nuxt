<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useToken } from '~/composables/useToken'

useHead({ title: 'Send Newsletter' })

definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'admin'] })

interface Form {
  subject: string
  content: string
  captcha_token: string | null
}

const { $axiosApi, $toast } = useNuxtApp()
const { generateCaptchaToken } = useToken()
const errors = ref<any>(null)
const newsletterForm = ref<HTMLFormElement | null>(null)
const form: Form = reactive({
  subject: '',
  content: '',
  captcha_token: null
})

const handleSendNewsletter = async () => {
  try {
    form.captcha_token = await generateCaptchaToken('send_newsletter')

    const response = await $axiosApi.post('/admin/send-newsletter', { ...form })

    if (!response) throw new Error('Response Not Found!')

    newsletterForm?.value?.reset()

    $toast.success(response?.data?.message)
  } catch (error) {
    errors.value = error.response?.data?.errors
  }
}
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb
        to="/admin/newsletter/send-subscribers"
        icon="fa-envelope-open-text"
        label="Newsletter"
      >
        <BreadcrumbItem label="Send" />
      </Breadcrumb>

      <!-- Go Back  -->
      <div class="w-full flex items-center justify-end">
        <GoBackButton />
      </div>
    </div>

    <!-- Form Start -->
    <div class="border p-10 bg-white rounded-md">
      <form
        ref="newsletterForm"
        class="space-y-4 md:space-y-6"
        @submit.prevent="handleSendNewsletter"
      >
        <div>
          <InputLabel label="Subject" required />

          <InputField
            v-model="form.subject"
            type="text"
            name="subject"
            placeholder="Enter Subject"
            required
          />

          <InputError :message="errors?.subject" />
        </div>

        <div>
          <InputLabel label="Content" required />

          <ClientOnly>
            <QuillEditor
              v-model:content="form.content"
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

          <InputError :message="errors?.content" />
        </div>

        <InputError :message="errors?.captcha_token" />

        <div class="flex items-center justify-end w-full space-x-5">
          <FormButton class="text-white bg-yellow-600 hover:bg-yellow-700 rounded-md w-full">
            <i class="fa-solid fa-paper-plane mr-2"></i>
            Send Newsletter
          </FormButton>
        </div>
      </form>
    </div>
    <!-- Form End -->
  </div>
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
