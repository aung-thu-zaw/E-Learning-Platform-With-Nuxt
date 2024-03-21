import { defineStore } from 'pinia'
import type { Reminder, Form, Error, Course } from '~/types/reminder'
import { useToken } from '~/composables/useToken'

export const useReminderStore = defineStore('reminder', () => {
  const reminders = ref<Reminder[] | null>(null)
  const reminder = ref<Reminder | null>(null)
  const courses = ref<Course[] | null>(null)
  const errors = ref<Error | null>(null)

  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $toast, $i18n } = useNuxtApp()

  const getAllReminder = async (): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/user/reminders`)

      if (!data) throw new Error('Response Data Not Found!')

      reminders.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getReminder = async (id: number): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/user/reminders/${id}`)

      if (!data) throw new Error('Response Data Not Found!')

      reminder.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getResources = async (): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/user/reminder/resources`)

      if (!data) throw new Error('Response Data Not Found!')

      courses.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createReminder = async (form: Form): Promise<string | void> => {
    try {
      form.captcha_token = await generateCaptchaToken('create_reminder')

      const response = await $axiosApi.post('/user/reminders', {
        ...form,
        days: form.days?.length ? form.days : null
      })

      if (!response) throw new Error('Response Not Found!')

      $toast.success($i18n.t('A new reminder added successfully!'))

      return 'success'
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateReminder = async (form: Form, id: number): Promise<string | void> => {
    try {
      form.captcha_token = await generateCaptchaToken('update_reminder')

      const response = await $axiosApi.patch(`/user/reminders/${id}`, {
        ...form,
        days: form.days?.length ? form.days : null
      })

      if (!response) throw new Error('Response Not Found!')

      $toast.success($i18n.t('Reminder updated successfully!'))

      return 'success'
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const deleteReminder = async (id: number): Promise<void> => {
    try {
      const response = await $axiosApi.delete(`/user/reminders/${id}`)

      if (!response) throw new Error('Response Not Found!')

      await getAllReminder()

      $toast.success($i18n.t('Reminder deleted successfully!'))
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    reminders,
    courses,
    reminder,
    errors,
    getAllReminder,
    getReminder,
    getResources,
    createReminder,
    updateReminder,
    deleteReminder
  }
})
