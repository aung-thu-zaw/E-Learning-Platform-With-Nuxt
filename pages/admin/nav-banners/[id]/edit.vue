<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import SwitchCheckbox from '~/components/Forms/Fields/SwitchCheckbox.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import { storeToRefs } from 'pinia'
import type { Form } from '~/types/navBanner'
import { useNavBannerStore } from '~/stores/dashboard/admin/navBanner'
import { useFormatFunctions } from '@/composables/useFormatFunctions'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

useHead({ title: 'Edit Nav Banner' })

definePageMeta({ layout: 'admin-layout' })

const store = useNavBannerStore()
const route = useRoute()
const addCountdown = ref<boolean>(false)
const { errors, navBanner } = storeToRefs(store)
const { formatDateTime } = useFormatFunctions()
const id = route?.params?.id
const form: Form = reactive({
  description: '',
  url: '',
  button: '',
  countdown: null,
  start_date_time: '',
  end_date_time: ''
})

onMounted(async () => {
  await store.getNavBanner(Number(id))

  form.description = navBanner?.value?.description || ''
  form.url = navBanner?.value?.url || ''
  form.button = navBanner?.value?.button || ''
  form.countdown = navBanner?.value?.countdown || ''
  form.start_date_time = navBanner?.value?.start_date_time || ''
  form.end_date_time = navBanner?.value?.end_date_time || ''

  addCountdown.value = form.countdown ? true : false
})

watch(
  () => form.start_date_time,
  (newDateTime) => (form.start_date_time = formatDateTime(newDateTime) ?? '')
)

watch(
  () => form.end_date_time,
  (newDateTime) => (form.end_date_time = formatDateTime(newDateTime) ?? '')
)

watch(
  () => form.countdown,
  (newDateTime) => (form.countdown = formatDateTime(newDateTime) ?? '')
)

watch(
  () => addCountdown.value,
  () => {
    if (!addCountdown.value) form.countdown = ''
  }
)
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/nav-banners" icon="fa-ad" label="Nav Banners">
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
        @submit.prevent="store.updateNavBanner({ ...form }, Number(id))"
      >
        <div>
          <InputLabel label="Description" required />

          <InputField
            v-model="form.description"
            type="text"
            name="banner-description"
            placeholder="Enter Nav Banner Description"
            required
          />

          <InputError :message="errors?.description" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <InputLabel label="URL" required />

            <InputField
              v-model="form.url"
              type="text"
              name="slider-url"
              placeholder="Enter Slider Url"
              required
            />

            <InputError :message="errors?.url" />
          </div>

          <div>
            <InputLabel label="Button Text" required />

            <InputField
              v-model="form.button"
              type="text"
              name="button-text"
              placeholder="Enter Button Text"
              required
            />

            <InputError :message="errors?.button" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <InputLabel label="Start Date Time" required />

            <VueDatePicker
              v-model="form.start_date_time"
              text-input
              placeholder="Select Start Date Time "
              required
            />

            <InputError :message="errors?.start_date_time" />
          </div>

          <div>
            <InputLabel label="End Date Time" required />

            <VueDatePicker
              v-model="form.end_date_time"
              text-input
              placeholder="Select End Date Time "
              required
            />

            <InputError :message="errors?.end_date_time" />
          </div>
        </div>

        <div class="space-x-3 mr-auto w-full flex items-center justify-start">
          <label for="Discount" class="text-sm font-bold text-slate-800">Add Countdown</label>
          <SwitchCheckbox v-model:checked="addCountdown" />
        </div>

        <div v-show="addCountdown">
          <InputLabel label="Countdown" :required="addCountdown" />

          <VueDatePicker
            v-model="form.countdown"
            text-input
            placeholder="Select Countdown ( Date Time )"
            :required="addCountdown"
          />

          <InputError :message="errors?.countdown" />
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
