<script setup lang="ts">
import Checkbox from '@/components/Forms/Fields/Checkbox.vue'
import SettingSideTabs from '~/components/Tabs/SettingSideTabs.vue'

useHead({ title: 'Email And Notifications' })

definePageMeta({ layout: 'app-layout', middleware: 'auth' })

interface EmailNotification {
  name: string
  description: string
  pivot: { user_id: number; email_notification_id: number; enabled: boolean }
}

const emailNotifications = ref<EmailNotification[] | null>(null)

const { $axiosApi, $toast, $i18n } = useNuxtApp()

const getEmailNotifications = async () => {
  try {
    const { data } = await $axiosApi.get('/user/email-notifications')

    emailNotifications.value = data
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

const updateEmailNotificationPreference = async (notificationId: number) => {
  try {
    const { data } = await $axiosApi.patch('/user/notification-preferences/update', {
      email_notification_id: notificationId
    })

    $toast.success($i18n.t(data?.message))
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

onMounted(async () => await getEmailNotifications())
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-5">
      <div class="flex flex-col md:flex-row items-start md:space-x-6 space-y-5 md:space-y-0">
        <div class="w-full md:w-3/12">
          <SettingSideTabs />
        </div>
        <div class="w-full md:w-9/12">
          <div class="bg-white border border-gray-200 p-10 rounded-md space-y-10">
            <div>
              <h1 class="font-bold text-xl text-gray-800 mb-8">{{ $t('Email Notifications') }}</h1>

              <div class="space-y-5">
                <div
                  v-for="(emailNotification, index) in emailNotifications"
                  :key="index"
                  class="space-x-5 flex items-start"
                >
                  <Checkbox
                    v-model:checked="emailNotification.pivot.enabled"
                    @change="
                      updateEmailNotificationPreference(
                        emailNotification.pivot.email_notification_id
                      )
                    "
                  />
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-sm text-gray-800">
                      {{ $t(emailNotification.name) }}
                    </h3>
                    <p class="text-xs font-semibold">{{ $t(emailNotification.description) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
