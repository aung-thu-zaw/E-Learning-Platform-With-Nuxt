<script setup lang="ts">
import AdminLayout from '~/layouts/AdminLayout.vue'
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import SelectBox from '@/components/Forms/Fields/SelectBox.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import { ref } from 'vue'

useHead({ title: 'Create Slider' })

const isCreateAnother: Ref<boolean> = ref(false)
</script>

<template>
  <AdminLayout>
    <div class="h-auto space-y-5">
      <!-- Breadcrumb -->
      <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
        <Breadcrumb to="/admin/sliders" icon="fa-sliders" label="Sliders">
          <BreadcrumbItem label="Create" />
        </Breadcrumb>

        <!-- Go Back  -->
        <div class="w-full flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form class="space-y-4 md:space-y-6" @submit.prevent="">
          <div>
            <InputLabel label="Coupon Code" required />

            <InputField
              type="text"
              name="coupon-code"
              placeholder="Enter Coupon code ( Eg. SUMMER10 )"
              required
            />

            <!-- <InputError message="" /> -->
          </div>

          <div>
            <InputLabel label="Description" required />

            <InputField
              type="text"
              name="coupon-description"
              placeholder="Enter Coupon Description ( Eg. Summer Discount - 10% off )"
              required
            />

            <!-- <InputError message="" /> -->
          </div>

          <div>
            <InputLabel label="Status" required />

            <SelectBox
              name="status"
              :options="[
                {
                  label: 'Active',
                  value: 'active'
                },
                {
                  label: 'Inactive',
                  value: 'inactive'
                }
              ]"
              required
            />

            <!-- <InputError message="" /> -->
          </div>

          <div class="flex items-center justify-end w-full space-x-5">
            <FormButton
              class="w-[200px] text-white bg-gray-600 hover:bg-gray-700 rounded-md"
              @click="isCreateAnother = true"
            >
              Save And Create Another
            </FormButton>

            <FormButton
              class="w-[150px] text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              @click="isCreateAnother = false"
            >
              <i class="fa-solid fa-save"></i>
              Save
            </FormButton>
          </div>
        </form>
      </div>
      <!-- Form End -->
    </div>
  </AdminLayout>
</template>
