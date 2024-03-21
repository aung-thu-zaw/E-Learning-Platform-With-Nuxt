<script setup lang="ts">
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import Radio from '~/components/Forms/Fields/Radio.vue'
import NormalButton from '~/components/Buttons/NormalButton.vue'
import Modal from '~/components/ModalContainer.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { Form, Reminder, Course } from '~/types/reminder'
import { useReminderStore } from '~/stores/user/reminder'
import { useFormatFunctions } from '@/composables/useFormatFunctions'

const props = defineProps<{ mode: string; reminder?: Reminder }>()

const step = ref(1)
const searchableCourses = ref<Course[] | null>(null)
const search = ref<string>('')
const delayedSearch = ref<NodeJS.Timeout | null>(null)
const confirmingAddReminder = ref(false)
const store = useReminderStore()

const days = [
  { label: 'Su', value: 'sunday' },
  { label: 'Mo', value: 'monday' },
  { label: 'Tu', value: 'tuesday' },
  { label: 'We', value: 'wednesday' },
  { label: 'Th', value: 'thursday' },
  { label: 'Fr', value: 'friday' },
  { label: 'Sa', value: 'saturday' }
]

const { formatDate } = useFormatFunctions()
const { errors, reminder: currentReminder, courses } = storeToRefs(store)

const confirmAddReminder = () => (confirmingAddReminder.value = true)

const closeModal = () => (confirmingAddReminder.value = false)

const form: Form = reactive({
  message: '',
  frequency: 'daily',
  date: '',
  time: '',
  google_calendar_synced: false,
  days: [],
  course_id: null
})

onUpdated(async () => {
  await store.getResources()

  if (props.mode === 'edit' && props.reminder) {
    await store.getReminder(props.reminder?.id)

    form.message = currentReminder.value?.message ?? ''
    form.frequency = currentReminder.value?.frequency ?? 'daily'
    form.date = currentReminder.value?.date ?? ''
    form.time = currentReminder.value?.time ? formatTimeObject(currentReminder.value?.time) : ''
    form.google_calendar_synced = currentReminder.value?.google_calendar_synced ?? false
    form.days = currentReminder.value?.days ?? []
    form.course_id = currentReminder.value?.course?.id ?? null
  }
})

const toggleDay = (selectedDay: string) => {
  const index = form.days.indexOf(selectedDay)
  if (index === -1) {
    form.days.push(selectedDay)
  } else {
    form.days.splice(index, 1)
  }
}

const isSelected = (day: string) => form.days.includes(day)

const filteredCourses = (keyword: string) => {
  if (delayedSearch.value) {
    clearTimeout(delayedSearch.value)
  }
  delayedSearch.value = setTimeout(() => {
    if (!keyword || !courses.value) {
      searchableCourses.value = []
      return
    }
    const regex = new RegExp(keyword, 'i')
    searchableCourses.value = courses.value.filter((course) => regex.test(course.title))
  }, 400)
}

const formatTimeObject = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number)
  return { hours, minutes, seconds }
}

watch(
  () => search.value,
  (newKeyword) => filteredCourses(newKeyword)
)

watch(
  () => form.date,
  (newDate) => (form.date = formatDate(newDate) ?? '')
)

watch(
  () => form.frequency,
  () => {
    form.days = []
    form.date = ''
    form.time = ''
  }
)

const handleReminder = async () => {
  if (props.mode === 'add') {
    const successMessage = await store.createReminder(form)

    if (successMessage) {
      step.value = 1
      form.message = ''
      form.frequency = 'daily'
      form.date = ''
      form.time = ''
      form.google_calendar_synced = false
      form.days = []
      form.course_id = null

      closeModal()

      await store.getAllReminder()
    }
  } else {
    if (props.reminder) {
      const successMessage = await store.updateReminder(form, props.reminder?.id)

      if (successMessage) {
        step.value = 1

        closeModal()

        await store.getAllReminder()
      }
    }
  }
}
</script>

<template>
  <div>
    <NormalButton
      v-if="mode === 'add'"
      class="text-white bg-yellow-500 hover:bg-yellow-600"
      @click="confirmAddReminder"
    >
      <i class="fa-solid fa-plus"></i>
      {{ $t('Add A New Reminder') }}
    </NormalButton>

    <button
      v-if="mode === 'edit'"
      type="button"
      class="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
      @click="confirmAddReminder"
    >
      <i class="fa-solid fa-edit"></i>
      {{ $t('Edit') }}
    </button>

    <Modal :show="confirmingAddReminder" @close="closeModal">
      <div class="p-6 bg-white rounded-md max-w-[700px] min-h-[600px] mx-auto space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-md font-bold text-gray-800">
            <i class="fa-solid fa-clock mr-2"></i>
            {{ $t('Learning Reminders') }}
          </h2>

          <button
            type="button"
            class="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center duration-200"
            @click="closeModal"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form
          class="space-y-4 md:space-y-6 flex flex-col items-end w-full min-h-[600px] justify-between h-full"
          @submit.prevent="handleReminder"
        >
          <div class="w-full">
            <!-- Step One -->
            <div v-show="step === 1" class="space-y-6">
              <div>
                <InputLabel label="Reminder Message" required />

                <InputField
                  v-model="form.message"
                  type="text"
                  name="message"
                  placeholder="Enter Reminder Message ( eg. Learning Reminder )"
                  required
                />

                <InputError :message="errors?.message" />
              </div>

              <div>
                <InputLabel label="Attach content" required />

                <InputField
                  v-model="search"
                  type="text"
                  name="name"
                  placeholder="Search by course title from your enrolled courses"
                  required
                />

                <InputError :message="errors?.course_id" />
              </div>

              <div class="mb-5">
                <h1 class="font-bold text-xs text-gray-800 mb-5">
                  {{ $t('Your Enrolled Courses') }}
                </h1>

                <ul v-if="!search" class="space-y-3">
                  <li v-for="course in courses" :key="course.id" class="flex items-start space-x-2">
                    <Radio
                      :id="'course' + course?.id"
                      v-model:checked="form.course_id"
                      :value="course.id"
                      name="course"
                    />
                    <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                      {{ course?.title }}
                    </p>
                  </li>
                </ul>

                <ul v-else-if="search && searchableCourses?.length" class="space-y-3">
                  <li
                    v-for="course in searchableCourses"
                    :key="course.id"
                    class="flex items-start space-x-2"
                  >
                    <Radio
                      :id="'course' + course?.id"
                      v-model="form.course_id"
                      :value="course.id"
                      name="course"
                    />
                    <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                      {{ course?.title }}
                    </p>
                  </li>
                </ul>

                <div v-else-if="search && !searchableCourses?.length" class="py-20">
                  <p class="text-center font-bold text-xs text-yellow-600">
                    <i class="fa-solid fa-file-circle-xmark"></i>
                    {{ $t("We're sorry we can't find any matches for your filter term.") }}
                  </p>
                </div>

                <div v-else class="py-20">
                  <p class="text-center font-bold text-xs text-yellow-600">
                    <i class="fa-solid fa-file-circle-xmark"></i>
                    {{ $t("You don't have any enrolled course.") }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Step Two -->
            <div v-show="step === 2" class="space-y-6">
              <div>
                <InputLabel label="Frequency" required />

                <div class="space-x-2">
                  <button
                    type="button"
                    class="text-xs font-bold border px-5 py-2 rounded-sm border-gray-400"
                    :class="{
                      'border-gray-700 bg-gray-700 text-white': form.frequency === 'daily'
                    }"
                    @click="form.frequency = 'daily'"
                  >
                    {{ $t('Daily') }}
                  </button>

                  <button
                    type="button"
                    class="text-xs font-bold border px-5 py-2 rounded-sm border-gray-400"
                    :class="{
                      'border-gray-700 bg-gray-700 text-white': form.frequency === 'weekly'
                    }"
                    @click="form.frequency = 'weekly'"
                  >
                    {{ $t('Weekly') }}
                  </button>

                  <button
                    type="button"
                    class="text-xs font-bold border px-5 py-2 rounded-sm border-gray-400"
                    :class="{ 'border-gray-700 bg-gray-700 text-white': form.frequency === 'once' }"
                    @click="form.frequency = 'once'"
                  >
                    {{ $t('Once') }}
                  </button>
                </div>
              </div>

              <div v-if="form.frequency === 'once'">
                <InputLabel label="Date" required />

                <VueDatePicker
                  v-model="form.date"
                  text-input
                  :enable-time-picker="false"
                  placeholder="Select Date"
                />

                <InputError :message="errors?.date" />
              </div>

              <div>
                <div v-if="form.frequency === 'weekly'" class="flex items-center space-x-3">
                  <button
                    v-for="day in days"
                    :key="day.value"
                    type="button"
                    class="w-10 h-10 rounded-full border"
                    :class="{
                      'font-bold text-sm border-gray-700 bg-gray-700 text-white': isSelected(
                        day.value
                      ),
                      'border-gray-500 font-bold text-gray-700 text-sm': !isSelected(day.value)
                    }"
                    @click="toggleDay(day.value)"
                  >
                    {{ day.label }}
                  </button>
                </div>
                <InputError :message="errors?.frequency" />
              </div>

              <div>
                <InputLabel label="Time" required />

                <VueDatePicker v-model="form.time" required time-picker placeholder="Select Time" />

                <InputError :message="errors?.time" />
              </div>

              <div>
                <InputLabel label="Add To Calendar" />

                <div>
                  <button
                    type="button"
                    class="px-4 py-4 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-md border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-white border-gray-300 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                  >
                    <svg class="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                      <path
                        d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                        fill="#34A853"
                      />
                      <path
                        d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                        fill="#EB4335"
                      />
                    </svg>
                    Google
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="mt-6 flex items-center justify-end space-x-5">
              <NormalButton
                class="bg-white text-gray-600 border border-gray-400 shadow-none hover:bg-gray-200"
                :disabled="step === 1"
                @click="step = step - 1"
              >
                <i class="fa-solid fa-angles-left"></i>
                {{ $t('Previous') }}
              </NormalButton>

              <NormalButton
                v-if="step !== 2"
                class="bg-yellow-500 hover:bg-yellow-600 text-white shadow-none"
                @click="step = step + 1"
              >
                {{ $t('Next') }}
                <i class="fa-solid fa-angles-right"></i>
              </NormalButton>

              <NormalButton
                v-if="step === 2"
                class="bg-yellow-500 hover:bg-yellow-600 text-white"
                @click="handleReminder"
              >
                {{ $t('Confirm') }}
              </NormalButton>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>

<style>
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
</style>
