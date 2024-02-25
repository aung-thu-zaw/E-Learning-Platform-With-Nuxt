<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import { storeToRefs } from 'pinia'
import { useRoleStore } from '~/stores/dashboard/admin/role'

useHead({ title: 'Create Role' })

definePageMeta({ layout: 'admin-layout' })

const store = useRoleStore()
const isCreateAnother = ref<boolean>(false)
const { errors } = storeToRefs(store)
const name = ref<string>('')

const handleCreateRole = async () => {
  await store.createRole(name.value, isCreateAnother.value)
  if (isCreateAnother.value && !store.errors) {
    name.value = ''
  }
}
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb to="/admin/manage-authority/roles" icon="fa-shield" label="Roles">
        <BreadcrumbItem label="Create" />
      </Breadcrumb>

      <!-- Go Back  -->
      <div class="w-full flex items-center justify-end">
        <GoBackButton />
      </div>
    </div>

    <!-- Form Start -->
    <div class="border p-10 bg-white rounded-md">
      <form class="space-y-4 md:space-y-6" @submit.prevent="handleCreateRole">
        <div>
          <InputLabel label="Role Name" required />

          <InputField
            v-model="name"
            type="text"
            name="role-name"
            placeholder="Enter Role Name"
            required
          />

          <InputError :message="errors?.name" />
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
