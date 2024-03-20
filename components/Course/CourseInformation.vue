import type { Field } from '#build/components';
<script setup lang="ts">
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import SelectBox from '~/components/Forms/Fields/SelectBox.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import FileInput from '~/components/Forms/Fields/FileInput.vue'
import PreviewImageBox from '~/components/Forms/PreviewImageBox.vue'
import { storeToRefs } from 'pinia'
import type { Form } from '~/types/course'
import { useCourseStore } from '~/stores/dashboard/instructor/course'
import { useImagePreview } from '@/composables/useImagePreview'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
  form: {
    type: Object as () => Form,
    default: () => ({})
  }
})

const propsForm = props.form

const store = useCourseStore()
const { errors, categories, subcategories, skillTags } = storeToRefs(store)
const { previewImage, setImagePreview } = useImagePreview()

onMounted(async () => await store.getResources())

const filteredSubcategories = computed(() => {
  return subcategories.value?.filter(
    (subcategory) => Number(subcategory?.category_id) === Number(propsForm.category_id)
  )
})

const filteredSkillTags = computed(() => {
  return skillTags.value?.filter(
    (skillTag) =>
      Number(skillTag?.category_id) === Number(propsForm.category_id) &&
      Number(skillTag?.subcategory_id) === Number(propsForm.subcategory_id)
  )
})

const addSuggestedSkillTag = (id: number) => {
  const index = propsForm.tags.indexOf(id)
  if (index !== -1) {
    propsForm.tags.splice(index, 1)
  } else {
    propsForm.tags.push(id)
  }
}

watch(
  () => propsForm.category_id,
  () => (propsForm.subcategory_id = '')
)

// const emit = defineEmits(['update-form'])

// const updateForm = (field: string, value: any) => {
//   // Emit an update event with the field name and value

//   emit('update-form', { field, value })
// }
</script>

<template>
  <div>
    <div class="bg-white border p-10 rounded-md">
      <div class="space-y-3">
        <h1 class="font-bold text-lg text-gray-700">Course Overview</h1>

        <p class="text-xs font-semibold text-gray-600">
          Add class details to help students discover your course on platform and better understand
          what they'll learn, what they'll need, and what to except.
        </p>
      </div>

      <hr class="my-6" />

      <div class="space-y-4 md:space-y-6">
        <PreviewImageBox :src="previewImage" />

        <div>
          <InputLabel label="Thumbnail" required />

          <FileInput
            v-model="propsForm.thumbnail"
            name="course-thumbnail"
            text="PNG, JPG or JPEG ( Max File Size : 1.5 MB )"
            required
            @update:model-value="setImagePreview"
          />

          <InputError :message="errors?.thumbnail" />
        </div>

        <div>
          <InputLabel label="Course Language" required />

          <p class="text-xs font-semibold text-gray-600 mb-3">
            Select the language you are teaching your course in. This information will help us
            accurately translate your class for students around the world.
          </p>

          <SelectBox
            v-model="propsForm.language"
            name="language"
            :options="[
              {
                label: 'English',
                value: 'english'
              },
              {
                label: 'Myanmar',
                value: 'myanmar'
              },
              {
                label: 'Arabic',
                value: 'arabic'
              },
              {
                label: 'Spanish',
                value: 'spanish'
              },
              {
                label: 'French',
                value: 'french'
              }
            ]"
            required
          />
          <!-- @update:model-value="updateForm('language', $event)" -->

          <InputError :message="errors?.language" />
        </div>

        <div>
          <InputLabel label="Course Title" required />

          <InputField
            v-model="propsForm.title"
            type="text"
            name="course-title"
            placeholder="Enter Course Title"
            required
          />

          <InputError :message="errors?.title" />
        </div>

        <div>
          <InputLabel label="Course Description" required />

          <ClientOnly>
            <QuillEditor
              v-model:content="propsForm.course_description"
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

          <InputError :message="errors?.course_description" />
        </div>

        <div>
          <InputLabel label="Project Description" />

          <ClientOnly>
            <QuillEditor
              v-model:content="propsForm.project_description"
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

          <InputError :message="errors?.project_description" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <InputLabel label="Category" required />

            <SelectBox
              v-model="propsForm.category_id"
              name="course-category"
              :options="categories"
              required
              :selected="propsForm.category_id === null"
            />

            <InputError :message="errors?.category_id" />
          </div>

          <div>
            <InputLabel label="Subcategory" required />

            <SelectBox
              v-model="propsForm.subcategory_id"
              name="blog-category"
              :options="filteredSubcategories ?? {}"
              required
              :selected="propsForm.subcategory_id === null"
              :disabled="!propsForm.category_id"
            />

            <InputError :message="errors?.subcategory_id" />
          </div>

          <div>
            <InputLabel label="Course Level" required />

            <SelectBox
              v-model="propsForm.level"
              name="type"
              :options="[
                {
                  label: 'Beginner',
                  value: 'beginner'
                },
                {
                  label: 'Intermediate',
                  value: 'intermediate'
                },
                {
                  label: 'Advanced',
                  value: 'advanced'
                },
                {
                  label: 'All Levels',
                  value: 'all_levels'
                }
              ]"
              required
            />

            <InputError :message="errors?.level" />
          </div>
        </div>

        <div
          v-show="propsForm.category_id && propsForm.subcategory_id && filteredSkillTags?.length"
        >
          <hr class="my-5" />

          <div class="space-y-5">
            <h2 class="font-bold text-sm text-gray-700">
              <i class="fa-solid fa-tag"></i>
              Suggest Skills For your Course
            </h2>

            <p class="text-xs font-semibold text-gray-600 mb-3">
              Skill tags help students find your course.Our platform may also add tags to make your
              course more discoverable in search result.
            </p>

            <div class="flex items-start flex-wrap">
              <button
                v-for="skillTag in filteredSkillTags"
                :key="skillTag?.id"
                type="button"
                class="text-xs font-bold text-gray-800 hover:bg-yellow-500 hover:text-white duration-200 hover:border-yellow-500 border px-3 py-1.5 rounded-md mb-2 ml-2 transition-all"
                :class="{
                  'bg-yellow-500 text-white border-yellow-500': propsForm.tags.includes(skillTag.id)
                }"
                @click="addSuggestedSkillTag(skillTag?.id)"
              >
                {{ skillTag?.name }}
                <i
                  class="fa-solid ml-2"
                  :class="{
                    'fa-xmark': propsForm.tags.includes(skillTag.id),
                    'fa-plus': !propsForm.tags.includes(skillTag.id)
                  }"
                ></i>
              </button>
            </div>
          </div>
        </div>

        <InputError :message="errors?.captcha_token" />
      </div>
    </div>
    <!-- Form End -->
  </div>
</template>
