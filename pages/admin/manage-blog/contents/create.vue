<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import BreadcrumbLinkItem from '~/components/Breadcrumbs/BreadcrumbLinkItem.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import FileInput from '~/components/Forms/Fields/FileInput.vue'
import SelectBox from '~/components/Forms/Fields/SelectBox.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import PreviewImageBox from '~/components/Forms/PreviewImageBox.vue'
import { useBlogContentStore } from '~/stores/dashboard/admin/blogContent'
import { storeToRefs } from 'pinia'
import type { Form } from '~/types/blogContent'
import { useImagePreview } from '@/composables/useImagePreview'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import image from '@/assets/images/no-image.jpeg'

useHead({ title: 'Create Blog Content' })

definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'admin'] })

const store = useBlogContentStore()
const isCreateAnother = ref<boolean>(false)
const createForm = ref<HTMLFormElement | null>(null)
const { errors, blogCategories } = storeToRefs(store)
const { previewImage, setImagePreview } = useImagePreview()
const form: Form = reactive({
  blog_category_id: '',
  title: '',
  status: '',
  content: '',
  thumbnail: ''
})

const handleCreateBlogContent = async () => {
  await store.createBlogContent({ ...form }, isCreateAnother.value)
  if (isCreateAnother.value && !store.errors) {
    createForm?.value?.reset()
    previewImage.value = image
    form.blog_category_id = ''
    form.title = ''
    form.status = ''
    form.content = ''
    form.thumbnail = ''
  }
}

onMounted(async () => await store.getResources())
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/manage-blog/contents" icon="fa-file-pen" label="Manage Blog">
        <BreadcrumbLinkItem to="/admin/manage-blog/contents" label="Contents" />
        <BreadcrumbItem label="Create" />
      </Breadcrumb>

      <!-- Go Back  -->
      <div class="w-full flex items-center justify-end">
        <GoBackButton />
      </div>
    </div>

    <!-- Form Start -->
    <div class="border p-10 bg-white rounded-md">
      <form
        ref="createForm"
        class="space-y-4 md:space-y-6"
        @submit.prevent="handleCreateBlogContent"
      >
        <PreviewImageBox :src="previewImage" />

        <div>
          <InputLabel label="Title" required />

          <InputField
            v-model="form.title"
            type="text"
            name="content-title"
            placeholder="Enter Blog Title"
            required
          />

          <InputError :message="errors?.title" />
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <InputLabel label="Status" required />

            <SelectBox
              v-model="form.status"
              name="category-status"
              :options="[
                {
                  label: 'Draft',
                  value: 'draft'
                },
                {
                  label: 'Published',
                  value: 'published'
                },
                {
                  label: 'Hidden',
                  value: 'hidden'
                }
              ]"
              required
            />

            <InputError :message="errors?.status" />
          </div>

          <div>
            <InputLabel label="Category" required />

            <SelectBox
              v-model="form.blog_category_id"
              name="blog-category"
              :options="blogCategories"
              required
              :selected="form.blog_category_id === null"
            />

            <InputError :message="errors?.blog_category_id" />
          </div>
        </div>

        <div>
          <InputLabel label="Thumbnail" required />

          <FileInput
            v-model="form.thumbnail"
            name="blog-content-thumbnail"
            text="PNG, JPG or JPEG ( Max File Size : 1.5 MB )"
            required
            @update:model-value="setImagePreview"
          />

          <InputError :message="store.errors?.thumbnail" />
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
