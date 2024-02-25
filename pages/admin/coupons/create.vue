<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import SelectBox from '~/components/Forms/Fields/SelectBox.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import { storeToRefs } from 'pinia'
import type { Form } from '~/types/coupon'
import { useCouponStore } from '~/stores/dashboard/admin/coupon'
import { useFormatFunctions } from '@/composables/useFormatFunctions'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

useHead({ title: 'Create Coupon' })

definePageMeta({ layout: 'admin-layout' })

const store = useCouponStore()
const isCreateAnother = ref<boolean>(false)
const createForm = ref<HTMLFormElement | null>(null)
const { errors } = storeToRefs(store)
const { formatDate } = useFormatFunctions()
const form: Form = reactive({
  code: '',
  description: '',
  type: '',
  value: '',
  max_uses: '',
  expiry_date: '',
  is_redeemable: '',
  free_trial_days: ''
})

const handleCreateCoupon = async () => {
  await store.createCoupon({ ...form }, isCreateAnother.value)
  if (isCreateAnother.value && !store.errors) {
    createForm?.value?.reset()

    form.code = ''
    form.description = ''
    form.type = ''
    form.value = ''
    form.max_uses = ''
    form.expiry_date = ''
    form.is_redeemable = ''
    form.free_trial_days = ''
  }
}

watch(
  () => form.expiry_date,
  (newDate) => (form.expiry_date = formatDate(newDate) ?? '')
)
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/coupons" icon="fa-ticket" label="Coupons">
        <BreadcrumbItem label="Create" />
      </Breadcrumb>

      <!-- Go Back  -->
      <div class="w-full flex items-center justify-end">
        <GoBackButton />
      </div>
    </div>

    <!-- Form Start -->
    <div class="border p-10 bg-white rounded-md">
      <form ref="createForm" class="space-y-4 md:space-y-6" @submit.prevent="handleCreateCoupon">
        <div>
          <InputLabel label="Coupon Code" required />

          <InputField
            v-model="form.code"
            type="text"
            name="coupon-code"
            placeholder="Enter Coupon code ( Eg. SUMMER10 )"
            required
          />

          <InputError :message="errors?.code" />
        </div>

        <div>
          <InputLabel label="Description" required />

          <InputField
            v-model="form.description"
            type="text"
            name="coupon-description"
            placeholder="Enter Coupon Description ( Eg. Summer Discount - 10% off )"
            required
          />

          <InputError :message="errors?.description" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <InputLabel label="Coupon Type" required />

            <SelectBox
              v-model="form.type"
              name="type"
              :options="[
                {
                  label: 'Percentage',
                  value: 'percentage'
                },
                {
                  label: 'Fixed Amount',
                  value: 'fixed_amount'
                }
              ]"
              required
            />

            <InputError :message="errors?.type" />
          </div>

          <div>
            <InputLabel label="Value" required />

            <InputField
              v-model="form.value"
              type="number"
              name="value"
              placeholder="Enter Coupon Value"
              required
            />

            <InputError :message="errors?.value" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <InputLabel label="Max Uses" />

            <InputField
              v-model="form.max_uses"
              type="number"
              name="max-uses"
              placeholder="Enter Maximum Usuage"
            />

            <InputError :message="errors?.max_uses" />
          </div>

          <div>
            <InputLabel label="Expiry Date" />

            <VueDatePicker
              v-model="form.expiry_date"
              text-input
              :enable-time-picker="false"
              placeholder="Select Expiry Date"
            />

            <InputError :message="errors?.expiry_date" />
          </div>

          <div>
            <InputLabel label="Free Trials ( Days )" />

            <InputField
              v-model="form.free_trial_days"
              type="number"
              name="free-trial"
              placeholder="Enter Free Trials"
            />

            <InputError :message="errors?.free_trial_days" />
          </div>
        </div>

        <div>
          <InputLabel label="Is Redeemable" required />

          <SelectBox
            v-model="form.is_redeemable"
            name="is-redeemable"
            :options="[
              {
                label: 'Yes',
                value: true
              },
              {
                label: 'No',
                value: false
              }
            ]"
            required
          />

          <InputError :message="errors?.is_redeemable" />
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
