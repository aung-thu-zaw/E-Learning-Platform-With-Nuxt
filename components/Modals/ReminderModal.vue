<script setup lang="ts">
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import Radio from '~/components/Forms/Fields/Radio.vue'
import GoogleCalendarButton from '~/components/Buttons/GoogleCalendarButton.vue'
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
                  <GoogleCalendarButton />
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
