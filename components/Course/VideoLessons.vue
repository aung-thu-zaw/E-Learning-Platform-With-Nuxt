<script setup lang="ts">
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
const videos = ref<{ name: string; video_file: File }[]>([])
const editMode = ref<boolean[]>([])
const editedTitles = ref<string[]>([])
const { errors } = storeToRefs(useCourseStore())

const handleVideos = async (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  const newVideos = Array.from(inputElement.files || [])

  for (const file of newVideos) {
    const lastDotIndex = file.name.lastIndexOf('.')

    if (lastDotIndex !== -1 && lastDotIndex !== 0) {
      const fileNameWithoutExtension = file.name.substring(0, lastDotIndex)
      const durationSeconds = await getVideoDuration(file)
      const thumbnailDataUrl = await getVideoThumbnail(file)

      videos.value.push({
        title: fileNameWithoutExtension,
        video_file: file,
        duration_seconds: durationSeconds,
        thumbnail: thumbnailDataUrl
      })
    } else {
      const durationSeconds = await getVideoDuration(file)
      const thumbnailDataUrl = await getVideoThumbnail(file)
      videos.value.push({
        title: file.name,
        video_file: file,
        duration_seconds: durationSeconds,
        thumbnail: thumbnailDataUrl
      })
    }
  }

  propsForm.videos = videos.value
}

const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = () => {
      // Calculate the duration in seconds
      const durationSeconds = Math.floor(video.duration)
      video.remove()
      resolve(durationSeconds)
    }

    video.onerror = (event) => {
      video.remove()
      reject(event)
    }

    video.src = URL.createObjectURL(file)
  })
}

const getVideoThumbnail = (file) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = async () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')

      video.currentTime = 0
      await new Promise((resolve) => video.addEventListener('seeked', resolve))
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const thumbnailDataUrl = canvas.toDataURL('image/jpeg')

      video.remove()
      canvas.remove()

      resolve(thumbnailDataUrl)
    }

    video.onerror = (event) => {
      video.remove()
      reject(event)
    }

    video.src = URL.createObjectURL(file)
  })
}

const handleRemoveVideo = (index: number) => {
  if (videos.value.length > index) {
    videos.value.splice(index, 1)

    propsForm.videos = videos.value
  }
}

const handleChangeTitle = (index: number) => {
  editMode.value[index] = true
  editedTitles.value[index] = propsForm.videos[index].title
}

const saveTitle = (index: number) => {
  editMode.value[index] = false
  propsForm.videos[index].title = editedTitles.value[index]
}
</script>

<template>
  <div>
    <!-- Form Start -->
    <div class="bg-white border p-10 rounded-md">
      <div class="space-y-3">
        <h1 class="font-bold text-lg text-gray-700">Video Lessons</h1>

        <ul class="list-disc text-xs font-semibold space-y-2 ml-3">
          <li>Include at least 10 minutes of video content.</li>
          <li>Include a standalone introduction video that explains what the course is about.</li>
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
        <div v-if="propsForm.videos?.length" class="space-y-3">
          <div
            v-for="(video, index) in propsForm.videos"
            :key="index"
            class="bg-white border border-gray-300 rounded-md p-3 flex items-start space-x-5"
          >
            <div class="w-56 h-36 overflow-hidden">
              <img
                v-if="video.thumbnail"
                :src="video.thumbnail"
                alt=""
                class="w-full h-full object-cover rounded-md"
              />
              <!-- If thumbnailDataUrl is not valid, you can show a placeholder image or display an error message -->
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500"
              >
                Thumbnail Not Available
              </div>
            </div>

            <div class="flex items-start justify-between w-full">
              <div class="">
                <div v-if="editMode[index]">
                  <input
                    v-model="editedTitles[index]"
                    type="text"
                    class="focus:ring-0 focus:outline-none font-medium text-gray-700 text-md mb-5 border-0"
                    autofocus
                  />

                  <button
                    type="button"
                    class="text-sm text-gray-600 hover:text-gray-700"
                    @click="saveTitle(index)"
                  >
                    <i class="fa-solid fa-check"></i>
                  </button>
                </div>

                <div v-else class="flex items-center space-x-3 mb-5 pl-3">
                  <h1 class="font-bold text-gray-700 text-sm">
                    {{ video.title }}
                  </h1>

                  <button
                    type="button"
                    class="text-sm text-gray-600 hover:text-gray-700"
                    @click="handleChangeTitle(index)"
                  >
                    <i class="fa-solid fa-edit"></i>
                  </button>
                </div>

                <p class="text-xs font-medium text-gray-600 pl-3">{{ video?.video_file?.name }}</p>
              </div>

              <div class="space-x-5 text-sm pr-3">
                <button
                  type="button"
                  class="text-gray-600 hover:text-red-600"
                  @click="handleRemoveVideo(index)"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="text-sm font-gray-700 font-semibold text-center">
          Your course need a lesson videos.
        </p>
      </div>

      <InputError :message="errors?.videos" />

      <div class="my-5">
        <label class="inline-block text-white bg-gray-800 px-5 py-3 rounded-md text-xs font-bold">
          <span>
            <i class="fa-solid fa-video mr-1"></i>
            Upload Videos
          </span>
          <input
            type="file"
            class="hidden"
            accept=".mp4, .mov, .avi, .mkv, .webm, .flv, .wmv, .mpeg, .mpg, .3gp, .ogg, .m4v"
            multiple
            @change="handleVideos"
          />
        </label>
      </div>
    </div>
    <!-- Form End -->
  </div>
</template>
