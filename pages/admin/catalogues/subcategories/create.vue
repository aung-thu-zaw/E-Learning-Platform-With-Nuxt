<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import BreadcrumbLinkItem from '~/components/Breadcrumbs/BreadcrumbLinkItem.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import SelectBox from '~/components/Forms/Fields/SelectBox.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import TextAreaField from '~/components/Forms/Fields/TextAreaField.vue'
import FileInput from '~/components/Forms/Fields/FileInput.vue'
import PreviewImageBox from '~/components/Forms/PreviewImageBox.vue'
import { useImagePreview } from '@/composables/useImagePreview'
import { useSubcategoryStore } from '~/stores/dashboard/admin/subcategory'
import image from '~/assets/images/no-image.jpeg'

import { storeToRefs } from 'pinia'
import type { Form } from '~/types/subcategory'

useHead({ title: 'Create Subcategory' })

definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'admin'] })

const store = useSubcategoryStore()
const isCreateAnother = ref<boolean>(false)
const { errors, categories } = storeToRefs(store)
const { previewImage, setImagePreview } = useImagePreview()
const form: Form = reactive({ name: '', status: '', category_id: '', description: '', image: '' })

const handleCreateSubcategory = async () => {
  await store.createSubcategory({ ...form }, isCreateAnother.value)
  if (isCreateAnother.value && !store.errors) {
    previewImage.value = image
    form.name = ''
    form.status = ''
    form.category_id = ''
    form.description = ''
    form.image = ''
  }
}

onMounted(async () => await store.getResources())
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/catalogues/subcategories" icon="fa-th-large" label="Catalogues">
        <BreadcrumbLinkItem to="/admin/catalogues/subcategories" label="Subcategories" />
        <BreadcrumbItem label="Create" />
      </Breadcrumb>

      <!-- Go Back  -->
      <div class="w-full flex items-center justify-end">
        <GoBackButton />
      </div>
    </div>

    <!-- Form Start -->
    <div class="border p-10 bg-white rounded-md">
      <form class="space-y-4 md:space-y-6" @submit.prevent="handleCreateSubcategory">
        <PreviewImageBox :src="previewImage" />

        <div>
          <InputLabel label="Subcategory Name" required />

          <InputField
            v-model="form.name"
            type="text"
            name="subcategory-name"
            placeholder="Enter Subcategory Name"
            required
          />

          <InputError :message="errors?.name" />
        </div>

        <div>
          <InputLabel label="Category" required />

          <SelectBox
            v-model="form.category_id"
            name="blog-category"
            :options="categories"
            required
            :selected="form.category_id === null"
          />

          <InputError :message="errors?.category_id" />
        </div>

        <div>
          <InputLabel label="Status" required />

          <SelectBox
            v-model="form.status"
            name="subcategory-status"
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
          />

          <InputError :message="errors?.status" />
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
          <InputLabel label="Background Image" required />

          <FileInput
            v-model="form.image"
            name="category-background"
            text="PNG, JPG or JPEG ( Max File Size : 1.5 MB )"
            required
            @update:model-value="setImagePreview"
          />

          <InputError :message="errors?.image" />
        </div>

        <InputError :message="errors?.captcha_token" />

        <div class="flex items-center justify-end w-full space-x-5">
          <FormButton
            class="w-[250px] text-white bg-gray-600 hover:bg-gray-700 rounded-md"
            @click="isCreateAnother = true"
          >
            Save And Create Another
          </FormButton>

          <FormButton
            class="w-[100px] text-white bg-yellow-600 hover:bg-yellow-700 rounded-md"
            @click="isCreateAnother = false"
          >
            Save
          </FormButton>
        </div>
      </form>
    </div>
    <!-- Form End -->
  </div>
</template>
