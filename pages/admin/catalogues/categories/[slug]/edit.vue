<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import BreadcrumbLinkItem from '~/components/Breadcrumbs/BreadcrumbLinkItem.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import TextAreaField from '~/components/Forms/Fields/TextAreaField.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import SelectBox from '~/components/Forms/Fields/SelectBox.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import PreviewImageBox from '~/components/Forms/PreviewImageBox.vue'
import FileInput from '~/components/Forms/Fields/FileInput.vue'
import { useCategoryStore } from '~/stores/dashboard/admin/category'
import { useImagePreview } from '@/composables/useImagePreview'
import { storeToRefs } from 'pinia'
import type { Form } from '~/types/category'
import image from '@/assets/images/no-image.jpeg'

useHead({ title: 'Edit Category' })

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const store = useCategoryStore()
const { errors, category } = storeToRefs(store)
const existingImage = ref<string>('')
const form: Form = reactive({ name: '', description: '', status: '', image: '' })
const slug = route?.params?.slug.toString()

onMounted(async () => {
  await store.getCategory(slug)

  form.name = category?.value?.name || ''
  form.description = category?.value?.description || ''
  form.status = category?.value?.status !== undefined ? category?.value?.status : ''
  form.image = category?.value?.image || ''
  existingImage.value = store.category?.image || ''
})

const { previewImage, setImagePreview } = useImagePreview(existingImage || image)
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/catalogues/categories" icon="fa-th-large" label="Catalogues">
        <BreadcrumbLinkItem to="/admin/catalogues/categories" label="Categories" />
        <BreadcrumbItem label="Edit" />
      </Breadcrumb>

      <!-- Go Back  -->
      <div class="w-full flex items-center justify-end">
        <GoBackButton />
      </div>
    </div>

    <!-- Form Start -->
    <div class="border p-10 bg-white rounded-md">
      <form
        class="space-y-4 md:space-y-6"
        @submit.prevent="store.updateCategory({ ...form }, slug)"
      >
        <PreviewImageBox :src="previewImage" />

        <div>
          <InputLabel label="Category Name" required />

          <InputField
            v-model="form.name"
            type="text"
            name="category-name"
            placeholder="Enter Category Name"
            required
          />

          <InputError :message="errors?.name" />
        </div>

        <div>
          <InputLabel label="Description" required />

          <TextAreaField
            v-model="form.description"
            name="category-description"
            placeholder="Enter Category Description"
            required
          />

          <InputError :message="errors?.description" />
        </div>

        <div>
          <InputLabel label="Status" required />

          <SelectBox
            v-model="form.status"
            name="category-status"
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
            name="category-background"
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
