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

useHead({ title: 'Edit Coupon' })

definePageMeta({ layout: 'admin-layout' })

const store = useCouponStore()
const route = useRoute()
const { errors, coupon } = storeToRefs(store)
const { formatDate } = useFormatFunctions()
const id = route?.params?.id
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

onMounted(async () => {
  await store.getCoupon(Number(id))

  form.code = coupon?.value?.code || ''
  form.description = coupon?.value?.description || ''
  form.type = coupon?.value?.type || ''
  form.value = coupon?.value?.value || ''
  form.max_uses = coupon?.value?.max_uses || ''
  form.expiry_date = coupon?.value?.expiry_date || ''
  form.is_redeemable =
    coupon?.value?.is_redeemable !== undefined ? coupon?.value?.is_redeemable : ''
  form.free_trial_days = coupon?.value?.free_trial_days || ''
})

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
        @submit.prevent="store.updateCoupon({ ...form }, Number(id))"
      >
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
              :selected="form.type"
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
            :selected="form.is_redeemable"
          />

          <InputError :message="errors?.is_redeemable" />
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
