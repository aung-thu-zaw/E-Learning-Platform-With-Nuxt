<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import TextAreaField from '~/components/Forms/Fields/TextAreaField.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import SelectBox from '~/components/Forms/Fields/SelectBox.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import PreviewImageBox from '~/components/Forms/PreviewImageBox.vue'
import FileInput from '~/components/Forms/Fields/FileInput.vue'
import { useSliderStore } from '~/stores/dashboard/admin/slider'
import { useImagePreview } from '@/composables/useImagePreview'
import { storeToRefs } from 'pinia'
import type { Form } from '~/types/slider'
import image from '@/assets/images/no-image.jpeg'

useHead({ title: 'Edit Slider' })

definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'admin'] })

const route = useRoute()
const store = useSliderStore()
const { errors, slider } = storeToRefs(store)
const existingImage = ref<string>('')
const slug = route?.params?.slug.toString()
const form: Form = reactive({
  title: '',
  description: '',
  button: '',
  url: '',
  image: '',
  status: ''
})

onMounted(async () => {
  await store.getSlider(slug)

  form.title = slider?.value?.title || ''
  form.description = slider?.value?.description || ''
  form.status = slider?.value?.status !== undefined ? slider?.value?.status : ''
  form.url = slider?.value?.url || ''
  form.image = slider?.value?.image || ''
  form.button = slider?.value?.button || ''

  existingImage.value = slider?.value?.image || ''
})

const { previewImage, setImagePreview } = useImagePreview(existingImage || image)
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/sliders" icon="fa-sliders" label="Sliders">
        <BreadcrumbItem label="Edit" />
      </Breadcrumb>

      <!-- Go Back  -->
      <div class="w-full flex items-center justify-end">
        <GoBackButton />
      </div>
    </div>

    <!-- Form Start -->
    <div class="border p-10 bg-white rounded-md">
      <form class="space-y-4 md:space-y-6" @submit.prevent="store.updateSlider({ ...form }, slug)">
        <PreviewImageBox :src="previewImage" />

        <div>
          <InputLabel label="Title" required />

          <InputField
            v-model="form.title"
            type="text"
            name="slider-title"
            placeholder="Enter Slider Title"
            required
          />

          <InputError :message="errors?.title" />
        </div>

        <div>
          <InputLabel label="Description" required />

          <TextAreaField
            v-model="form.description"
            name="slider-description"
            placeholder="Enter Slider Description"
            required
          />

          <InputError :message="errors?.description" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <InputLabel label="URL" required />

            <InputField
              v-model="form.url"
              type="text"
              name="slider-url"
              placeholder="Enter Slider Url"
              required
            />

            <InputError :message="errors?.url" />
          </div>

          <div>
            <InputLabel label="Button Text" required />

            <InputField
              v-model="form.button"
              type="text"
              name="button-text"
              placeholder="Enter Button Text"
              required
            />

            <InputError :message="errors?.button" />
          </div>
        </div>

        <div>
          <InputLabel label="Status" required />

          <SelectBox
            v-model="form.status"
            name="slider-status"
            :options="[
              {
                label: 'Show',
                value: true
              },
              {
                label: 'Hide',
                value: false
              }
            ]"
            required
            :selected="form.status"
          />

          <InputError :message="errors?.status" />
        </div>

        <div>
          <InputLabel label="Background Image" required />

          <FileInput
            v-model="form.image"
            name="slider-background"
            text="PNG, JPG or JPEG ( Max File Size : 1.5 MB )"
            @update:model-value="setImagePreview"
          />

          <InputError :message="store.errors?.image" />
        </div>

        <InputError :message="errors?.captcha_token" />

        <div class="flex items-center justify-end w-full space-x-5">
          <FormButton class="w-[150px] text-white bg-yellow-600 hover:bg-yellow-700 rounded-md">
            Save Changes
          </FormButton>
        </div>
      </form>
    </div>
    <!-- Form End -->
  </div>
</template>
