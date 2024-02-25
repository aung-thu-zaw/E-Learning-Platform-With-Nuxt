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
import { useSubcategoryStore } from '~/stores/dashboard/admin/subcategory'
import { storeToRefs } from 'pinia'
import type { Form } from '~/types/subcategory'

useHead({ title: 'Edit Subcategory' })

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const store = useSubcategoryStore()
const { errors, categories, subcategory } = storeToRefs(store)
const form: Form = reactive({ name: '', status: '', category_id: '' })
const slug = route?.params?.slug.toString()

onMounted(async () => {
  await store.getResources()
  await store.getSubcategory(slug)

  form.category_id = subcategory?.value?.category_id || ''
  form.name = subcategory?.value?.name || ''
  form.status = subcategory?.value?.status !== undefined ? subcategory?.value?.status : ''
})
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/catalogues/subcategories" icon="fa-th-large" label="Catalogues">
        <BreadcrumbLinkItem to="/admin/catalogues/subcategories" label="Subcategories" />
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
        @submit.prevent="store.updateSubcategory({ ...form }, slug)"
      >
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
            :selected="form.category_id"
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
            :selected="form.status"
          />

          <InputError :message="errors?.status" />
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
