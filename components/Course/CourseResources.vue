<script setup lang="ts">
import { useFormatFunctions } from '~/composables/useFormatFunctions'
import InputError from '~/components/Forms/Fields/InputError.vue'
import type { Form } from '~/types/course'
import { useCourseStore } from '~/stores/dashboard/instructor/course'

const props = defineProps({
  form: {
    type: Object as () => Form,
    default: () => ({})
  }
})

const propsForm = props.form

const files = ref<any[]>([])

const { humanReadableFileSize } = useFormatFunctions()
const { errors } = storeToRefs(useCourseStore())

const handleFiles = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  const newFiles = Array.from(inputElement.files || [])
  files.value = [...files.value, ...newFiles]
  propsForm.resources = files.value
}

const handleRemoveFile = (index: number) => {
  if (files.value.length) {
    files.value.splice(index, 1)
    propsForm.resources = files.value
  }
}
</script>

<template>
  <div>
    <!-- Form Start -->
    <div class="bg-white border p-10 rounded-md">
      <div class="space-y-3">
        <h1 class="font-bold text-lg text-gray-700">Course Resources</h1>

        <p class="text-xs font-semibold text-gray-600">
          If your course includes additional resources for students, such as readings, worksheets,
          or supplementary materials, feel free to add them here. You can upload multiple zip files
          containing the resources, ensuring they are organized and easily accessible for students.
        </p>
      </div>

      <hr class="my-6" />

      <div class="bg-gray-50 p-10 rounded-md border">
        <div v-if="propsForm.resources?.length" class="flex items-start flex-wrap">
          <div
            v-for="(file, index) in propsForm.resources"
            :key="index"
            class="relative border bg-white text-gray-700 rounded-md px-5 py-3 ml-3 mb-3"
          >
            <div class="flex items-start space-x-3">
              <div>
                <i class="fa-solid fa-file-zipper"></i>
              </div>
              <div class="space-y-3">
                <h1 class="font-bold text-sm text-gray-700">
                  {{ file?.name }}
                </h1>

                <p class="font-medium text-xs">
                  {{ humanReadableFileSize(file?.size) }}
                </p>
              </div>
            </div>

            <button
              type="button"
              class="absolute -top-2 -right-2 hover:text-red-600 transition-all"
              @click="handleRemoveFile(index)"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </div>
        <p v-else class="text-sm font-gray-700 font-semibold text-center">
          There are no resources.
        </p>
      </div>

      <InputError :message="errors?.videos" />

      <div class="my-5">
        <label class="inline-block text-white bg-gray-800 px-5 py-3 rounded-md text-xs font-bold">
          <span>
            <i class="fa-solid fa-file-zipper mr-1"></i>
            Resources
          </span>
          <input type="file" class="hidden" accept=".zip" multiple @change="handleFiles" />
        </label>
      </div>
    </div>
    <!-- Form End -->
  </div>
</template>
