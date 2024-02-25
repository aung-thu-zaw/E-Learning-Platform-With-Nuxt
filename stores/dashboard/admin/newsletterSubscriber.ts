import { defineStore } from 'pinia'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

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

  const getAllSubscriber = async (params) => {
    try {
      const { generateQueryParams } = useQueryGenerator()

      const { data } = await $axiosApi.get(
        `/admin/newsletter-subscribers?${generateQueryParams(params)}`
      )

      if (!data) throw new Error('Response Data Not Found!')

      subscribers.value = data
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const deleteSubscriber = async (id: number) => {
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

        if (index !== -1) {
          subscribers.value?.data.splice(index, 1)

          if (
            index >=
            subscribers.value?.meta?.current_page - 1 * subscribers.value?.meta?.per_page
          ) {
            await getAllSubscriber({ page: subscribers.value?.meta?.current_page })
          }
        }

        if (response.status === 204) {
          $swal.fire({ icon: 'success', title: 'Newsletter subscriber deleted successfully!' })
        }
      }
    } catch (error) {
      return showError({
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
