<script setup lang="ts">
import Breadcrumb from '~/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '~/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '~/components/Forms/Fields/InputLabel.vue'
import InputError from '~/components/Forms/Fields/InputError.vue'
import InputField from '~/components/Forms/Fields/InputField.vue'
import FormButton from '~/components/Buttons/FormButton.vue'
import GoBackButton from '~/components/Buttons/GoBackButton.vue'
import Checkbox from '~/components/Forms/Fields/Checkbox.vue'
import { storeToRefs } from 'pinia'
import { useAssignRolePermissionStore } from '~/stores/dashboard/admin/assignRolePermission'

useHead({ title: 'Add Role To Permissions' })

definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'admin'] })

const roleName = ref(null)
const route = useRoute()
const slug = route?.params?.slug.toString()
const store = useAssignRolePermissionStore()
const { permissionGroups, permissions, role } = storeToRefs(store)
const form = reactive({ role_id: '', permission_id: '' })

onMounted(async () => {
  await store.getResources()
  await store.getRole(slug)

  roleName.value = role?.value?.name
  permissions.value = store.permissions
  permissionGroups.value = store.permissionGroups

  form.role_id = role?.value?.id
  form.permission_id = role?.value?.permissions.map((permission: any) => permission.id)
})

const allPermissionsSelected = computed(
  () => form.permission_id?.length === permissions.value?.length
)

const selectAllPermissions = () => {
  if (allPermissionsSelected.value) {
    form.permission_id = []
  } else {
    form.permission_id = permissions.value.map((permission) => permission.id)
  }
}
</script>

<template>
  <div class="h-auto space-y-5">
    <!-- Breadcrumb -->
    <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-10">
      <Breadcrumb
        to="/admin/manage-authority/assign-role-permissions"
        icon="fa-shield"
        label="Assign Role Permissions"
      >
        <BreadcrumbItem label="Add Permissions" />
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
        @submit.prevent="store.updateAssignRolePermission({ ...form }, slug)"
      >
        <div>
          <InputLabel label="Role" required />

          <InputField v-model="roleName" type="text" name="role-name" disabled />
        </div>

        <!-- Permissions Checkbox -->
        <div class="mb-6">
          <div class="flex items-start w-full space-x-5 my-5 text-md">
            <div class="w-1/3">
              <h3 class="font-bold text-md text-primary">Groups</h3>
            </div>
            <div class="w-full flex items-center justify-between">
              <h3 class="font-bold text-md text-primary">
                <i class="fa-solid fa-key"></i>
                Permissions
              </h3>

              <button
                type="button"
                class="px-3 py-2 text-xs font-semibold rounded-full text-white transition-all"
                :class="{
                  'bg-red-600 hover:bg-red-500': allPermissionsSelected,
                  'bg-yellow-500 hover:bg-yellow-600': !allPermissionsSelected
                }"
                @click="selectAllPermissions"
              >
                <span v-if="!allPermissionsSelected"> Select All </span>
                <span v-else>Deselect All</span>
              </button>
            </div>
          </div>

          <hr class="my-5" />

          <div
            v-for="permissionGroup in permissionGroups"
            :key="permissionGroup.id"
            class="flex items-start space-x-5 mb-10"
          >
            <div class="w-1/3">
              <div class="flex items-center">
                <h3 class="ml-2 text-md font-bold text-gray-800 capitalize">
                  {{ permissionGroup.group }}
                </h3>
              </div>
            </div>

            <div class="w-full space-y-1">
              <div
                v-for="permission in permissions"
                v-show="permission.group === permissionGroup.group"
                :key="permission.id"
                class="flex items-center"
              >
                <Checkbox v-model:checked="form.permission_id" :value="permission.id" />

                <span class="ml-2 text-sm font-bold text-gray-700">
                  {{ permission?.name }}
                </span>
              </div>
            </div>
          </div>

          <InputError class="mt-2" :message="store.errors?.permission_id" />
        </div>

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
