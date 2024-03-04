import { defineStore } from 'pinia'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import type { dashboardQuery } from '~/types/query'

interface SubscriberPaginate {
  data: {
    id: number
    email: string
    status: string
  }[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

export const useNewsletterSubscriberStore = defineStore('newsletter-subscriber', () => {
  const subscribers = ref<SubscriberPaginate | null>(null)

  const { $axiosApi, $swal } = useNuxtApp()

  const getAllSubscriber = async (query: dashboardQuery | { page: number }): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(
        `/admin/newsletter-subscribers?${generateQueryString(query)}`
      )

      if (!data) throw new Error('Response Data Not Found!')

      subscribers.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const deleteSubscriber = async (id: number): Promise<void> => {
    try {
      const result = await $swal.fire({
        icon: 'question',
        title: 'Delete Newsletter Subscriber',
        text: 'Are you sure you would like to do this?',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d52222',
        cancelButtonColor: '#626262',
        timer: 20000,
        timerProgressBar: true,
        reverseButtons: true
      })

      if (result.isConfirmed) {
        const response = await $axiosApi.delete(`/admin/newsletter-subscribers/${id}`)

        if (!response) throw new Error('Response Not Found!')

        const index = subscribers.value?.data?.findIndex((subscriber) => subscriber.id === id)

        if (index !== undefined && index !== -1) {
          const spliceIndex = index ?? 0

          subscribers.value?.data.splice(spliceIndex, 1)

          if (
            subscribers.value?.meta?.current_page !== undefined &&
            subscribers.value?.meta?.per_page !== undefined &&
            index >= (subscribers.value?.meta?.current_page - 1) * subscribers.value?.meta?.per_page
          ) {
            await getAllSubscriber({ page: subscribers.value?.meta?.current_page })
          }
        }

        if (response.status === 204) {
          $swal.fire({ icon: 'success', title: 'Newsletter subscriber deleted successfully!' })
        }
      }
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    subscribers,
    getAllSubscriber,
    deleteSubscriber
  }
})
