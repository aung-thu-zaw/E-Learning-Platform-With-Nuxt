<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import SelectBox from '~/components/Forms/Fields/SelectBox.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import FileInput from '~/components/Forms/Fields/FileInput.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import PreviewImageBox from '~/components/Forms/PreviewImageBox.vue'
import { storeToRefs } from 'pinia'
import type { Form } from '~/types/coupon'
import { useCourseStore } from '~/stores/dashboard/admin/course'
import { useImagePreview } from '@/composables/useImagePreview'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

useHead({ title: 'Create Course' })

definePageMeta({ layout: 'admin-layout' })

const store = useCourseStore()
const { errors, categories, subcategories, skillTags, instructors } = storeToRefs(store)
const { previewImage, setImagePreview } = useImagePreview()
const form: Form = reactive({
  instructor_id: '',
  category_id: '',
  subcategory_id: '',
  thumbnail: '',
  title: '',
  slug: '',
  course_description: '',
  project_description: '',
  type: '',
  level: '',
  tag: '',
  language: '',
  status: ''
})

const handleCreateCourse = async () => {
  await store.createCourse({ ...form })
  if (!store.errors) {
    createForm?.value?.reset()
    form.instructor_id = ''
    form.category_id = ''
    form.subcategory_id = ''
    form.thumbnail = ''
    form.title = ''
    form.slug = ''
    form.course_description = ''
    form.project_description = ''
    form.type = ''
    form.level = ''
    form.tag = ''
    form.language = ''
    form.status = ''
  }
}

onMounted(async () => await store.getResources())

const filteredSubcategories = computed(() => {
  return subcategories.value?.filter(
    (subcategory) => Number(subcategory?.category_id) === Number(form.category_id)
  )
})

const instructorsWithFormattedNames = computed(() => {
  return instructors.value?.map((instructor) => ({
    id: instructor.id,
    name: instructor.display_name
  }))
})

watch(
  () => form.category_id,
  () => (form.subcategory_id = '')
)
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/courses" icon="fa-graduation-cap" label="Courses">
        <BreadcrumbItem label="Create" />
      </Breadcrumb>

      <!-- Go Back  -->
      <div class="w-full flex items-center justify-end">
        <GoBackButton />
      </div>
    </div>

    <div class="flex flex-col items-center justify-center">
      <div class="border w-auto px-10 py-1 bg-white rounded-lg">
        <nav class="-mb-0.5 flex justify-center space-x-6" aria-label="Tabs" role="tablist">
          <button
            id="horizontal-alignment-item-1"
            type="button"
            class="hs-tab-active:font-bold hs-tab-active:text-yellow-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-[13px] font-semibold whitespace-nowrap text-gray-700 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 disabled:opacity-50 disabled:pointer-events-none active"
            data-hs-tab="#horizontal-alignment-1"
            aria-controls="horizontal-alignment-1"
            role="tab"
          >
            Course Information
          </button>
          <button
            id="horizontal-alignment-item-2"
            type="button"
            class="hs-tab-active:font-bold hs-tab-active:text-yellow-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-[13px] font-semibold whitespace-nowrap text-gray-700 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-tab="#horizontal-alignment-2"
            aria-controls="horizontal-alignment-2"
            role="tab"
          >
            Video Lessons
          </button>

          <button
            id="horizontal-alignment-item-3"
            type="button"
            class="hs-tab-active:font-bold hs-tab-active:text-yellow-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-[13px] font-semibold whitespace-nowrap text-gray-700 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-tab="#horizontal-alignment-3"
            aria-controls="horizontal-alignment-3"
            role="tab"
          >
            Course Resources
          </button>
        </nav>
      </div>

      <div class="mt-3 w-full">
        <div
          id="horizontal-alignment-1"
          role="tabpanel"
          aria-labelledby="horizontal-alignment-item-1"
        >
          <!-- Form Start -->
          <div class="bg-white border p-10 rounded-md">
            <div class="space-y-3">
              <h1 class="font-bold text-lg text-gray-700">Course Overview</h1>

              <p class="text-xs font-semibold text-gray-600">
                Add class details to help students discover your course on platform and better
                understand what they'll learn, what they'll need, and what to except.
              </p>
            </div>

            <hr class="my-6" />

            <form
              ref="createForm"
              class="space-y-4 md:space-y-6"
              @submit.prevent="handleCreateCourse"
            >
              <PreviewImageBox :src="previewImage" />

              <div>
                <InputLabel label="Thumbnail" required />

                <FileInput
                  v-model="form.thumbnail"
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
                  v-model="form.language"
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

                <InputError :message="errors?.language" />
              </div>

              <div>
                <InputLabel label="Instructor" required />

                <SelectBox
                  v-model="form.instructor_id"
                  name="instructor"
                  :options="instructorsWithFormattedNames"
                  required
                />

                <InputError :message="errors?.instructor_id" />
              </div>

              <div>
                <InputLabel label="Course Title" required />

                <InputField
                  v-model="form.title"
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
                    v-model:content="form.course_description"
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
                    v-model:content="form.project_description"
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

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <InputLabel label="Category" required />

                  <SelectBox
                    v-model="form.category_id"
                    name="course-category"
                    :options="categories"
                    required
                    :selected="form.category_id === null"
                  />

                  <InputError :message="errors?.category_id" />
                </div>

                <div>
                  <InputLabel label="Subcategory" required />

                  <SelectBox
                    v-model="form.subcategory_id"
                    name="blog-category"
                    :options="filteredSubcategories ?? {}"
                    required
                    :selected="form.subcategory_id === null"
                    :disabled="!form.category_id"
                  />

                  <InputError :message="errors?.subcategory_id" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <InputLabel label="Course Type" required />

                  <SelectBox
                    v-model="form.type"
                    name="type"
                    :options="[
                      {
                        label: 'Free',
                        value: 'free'
                      },
                      {
                        label: 'Premium',
                        value: 'premium'
                      }
                    ]"
                    required
                  />

                  <InputError :message="errors?.type" />
                </div>

                <div>
                  <InputLabel label="Course Level" required />

                  <SelectBox
                    v-model="form.level"
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

              <div>
                <InputLabel label="Skill Tag" required />

                <p class="text-xs font-semibold text-gray-600 mb-3">
                  Skill tags help students find your course.Our platform may also add tags to make
                  your course more discoverable in search result.
                </p>

                <InputField
                  v-model="form.tag"
                  type="text"
                  name="skill-tag"
                  placeholder="Enter Tag"
                  required
                />

                <InputError :message="errors?.tag" />
              </div>

              <hr class="my-5" />

              <div class="space-y-5">
                <h2 class="font-bold text-sm text-gray-700">
                  <i class="fa-solid fa-tag"></i>
                  Suggest Skills For your Course
                </h2>

                <p class="text-xs font-semibold text-gray-600 mb-3">
                  Skill tags help students find your course.Our platform may also add tags to make
                  your course more discoverable in search result.
                </p>

                <div class="flex items-start flex-wrap">
                  <button
                    v-for="index in 100"
                    :key="index"
                    type="button"
                    class="text-xs font-bold text-gray-800 hover:bg-yellow-500 hover:text-white duration-200 hover:border-yellow-500 border px-3 py-1.5 rounded-md mb-2 ml-2"
                  >
                    Html
                    <i class="fa-solid fa-plus ml-2"></i>
                  </button>
                </div>
              </div>

              <InputError :message="errors?.captcha_token" />

              <div class="flex items-center justify-end w-full space-x-5">
                <FormButton
                  class="w-[100px] text-white bg-yellow-600 hover:bg-yellow-700 rounded-md"
                >
                  Save
                </FormButton>
              </div>
            </form>
          </div>
          <!-- Form End -->
        </div>
        <div
          id="horizontal-alignment-2"
          class="hidden"
          role="tabpanel"
          aria-labelledby="horizontal-alignment-item-2"
        >
          <!-- Form Start -->
          <div class="bg-white border p-10 rounded-md">
            <div class="space-y-3">
              <h1 class="font-bold text-lg text-gray-700">Video Lessons</h1>

              <ul class="list-disc text-xs font-semibold space-y-2 ml-3">
                <li>Include at least 10 minutes of video content.</li>
                <li>
                  Include a standalone introduction video that explains what the course is about.
                </li>
                <li>Limit self-promotion to first and last video lessons</li>
                <li>Provide clear learning objectives for each lesson.</li>
                <li>Include interactive elements to engage students.</li>
                <li>Ensure all course materials are accessible to students.</li>
                <li>Offer timely feedback on assignments and questions.</li>
                <li>Regularly update course content to reflect industry changes.</li>
              </ul>
            </div>

            <hr class="my-6" />

            <div class="bg-gray-50 p-10 rounded-md border">
              <p class="text-sm font-gray-700 font-semibold text-center">
                Your course need a lesson videos.
              </p>
            </div>

            <div class="my-5">
              <label
                class="inline-block text-white bg-gray-800 px-5 py-3 rounded-md text-xs font-bold"
              >
                <span>
                  <i class="fa-solid fa-video mr-1"></i>
                  Upload Videos</span
                >
                <input type="file" class="hidden" />
              </label>
            </div>
          </div>
          <!-- Form End -->
        </div>
        <div
          id="horizontal-alignment-3"
          class="hidden"
          role="tabpanel"
          aria-labelledby="horizontal-alignment-item-3"
        >
          <!-- Form Start -->
          <div class="bg-white border p-10 rounded-md">
            <div class="space-y-3">
              <h1 class="font-bold text-lg text-gray-700">Course Resources</h1>

              <p class="text-xs font-semibold text-gray-600">
                If your course includes additional resources for students, such as readings,
                worksheets, or supplementary materials, feel free to add them here. You can upload
                multiple zip files containing the resources, ensuring they are organized and easily
                accessible for students.
              </p>
            </div>

            <hr class="my-6" />

            <div class="bg-gray-50 p-10 rounded-md border">
              <p class="text-sm font-gray-700 font-semibold text-center">There are no resources.</p>
            </div>

            <div class="my-5">
              <label
                class="inline-block text-white bg-gray-800 px-5 py-3 rounded-md text-xs font-bold"
              >
                <span>
                  <i class="fa-solid fa-file-zipper mr-1"></i>
                  Resources
                </span>
                <input type="file" class="hidden" />
              </label>
            </div>
          </div>
          <!-- Form End -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
:root {
  --dp-font-family: poppins;
  --dp-border-radius: 6px;
  --dp-input-padding: 15px;
  --dp-font-size: 0.875rem;
  --dp-preview-font-size: 0.8rem;
  --dp-time-font-size: 0.8rem;
}

.dp__theme_light {
  --dp-background-color: #f9fafb;
  --dp-text-color: rgb(31 41 55);
  --dp-border-color: rgb(209 213 219);
  --dp-menu-border-color: rgb(209 213 219);
}

.input-slot-image {
  width: auto;
  margin-left: 5px;
}

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
