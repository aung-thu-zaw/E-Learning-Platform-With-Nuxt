<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import SelectBox from '~/components/Forms/Fields/SelectBox.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import { useSkillTagStore } from '~/stores/dashboard/admin/skillTag'
import { storeToRefs } from 'pinia'
import type { Form } from '~/types/skillTag'

useHead({ title: 'Edit Skill Tag' })

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const store = useSkillTagStore()
const { errors, categories, subcategories, tag } = storeToRefs(store)
const form: Form = reactive({ name: '', category_id: '', subcategory_id: '' })
const slug = route?.params?.slug.toString()

onMounted(async () => {
  await store.getResources()
  await store.getTag(slug)

  form.name = tag?.value?.name || ''
  form.category_id = tag?.value?.category_id || ''
  form.subcategory_id = tag?.value?.subcategory_id || ''
})

const filteredSubcategories = computed(() => {
  return subcategories.value?.filter(
    (subcategory) => Number(subcategory?.category_id) === Number(form.category_id)
  )
})

watch(
  () => form.category_id,
  () => {
    const hasSubcategories = filteredSubcategories?.value?.some(
      (subcategory) => subcategory.category_id === form.category_id
    )

    if (!hasSubcategories) {
      form.subcategory_id = ''
    }
  }
)
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/skill-tags" icon="fa-tag" label="Skill Tags">
        <BreadcrumbItem label="Edit" />
      </Breadcrumb>

      <!-- Go Back  -->
      <div class="w-full flex items-center justify-end">
        <GoBackButton />
      </div>
    </div>

    <!-- Form Start -->
    <div class="border p-10 bg-white rounded-md">
      <form class="space-y-4 md:space-y-6" @submit.prevent="store.updateTag({ ...form }, slug)">
        <div>
          <InputLabel label="Tag Name" required />

          <InputField
            v-model="form.name"
            type="text"
            name="tag-name"
            placeholder="Enter Tag Name"
            required
          />

          <InputError :message="errors?.name" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            <InputLabel label="Subcategory" required />

            <SelectBox
              v-model="form.subcategory_id"
              name="blog-category"
              :options="filteredSubcategories"
              required
              :selected="form.subcategory_id"
            />

            <InputError :message="errors?.subcategory_id" />
          </div>
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
