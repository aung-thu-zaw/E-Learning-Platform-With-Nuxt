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
import { useBlogCategoryStore } from '~/stores/dashboard/admin/blogCategory'
import { storeToRefs } from 'pinia'
import type { Form } from '~/types/blogCategory'

useHead({ title: 'Create Blog Category' })

definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'admin'] })

const store = useBlogCategoryStore()
const isCreateAnother = ref<boolean>(false)
const { errors } = storeToRefs(store)
const form: Form = reactive({ name: '', description: '', status: '' })

const handleCreateBlogCategory = async () => {
  await store.createBlogCategory({ ...form }, isCreateAnother.value)
  if (isCreateAnother.value && !store.errors) {
    form.name = ''
    form.description = ''
    form.status = ''
  }
}
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/manage-blog/categories" icon="fa-file-pen" label="Manage Blog">
        <BreadcrumbLinkItem to="/admin/manage-blog/categories" label="Categories" />
        <BreadcrumbItem label="Create" />
      </Breadcrumb>

      <!-- Go Back  -->
      <div class="w-full flex items-center justify-end">
        <GoBackButton />
      </div>
    </div>

    <!-- Form Start -->
    <div class="border p-10 bg-white rounded-md">
      <form class="space-y-4 md:space-y-6" @submit.prevent="handleCreateBlogCategory">
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
          />

          <InputError :message="errors?.status" />
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
