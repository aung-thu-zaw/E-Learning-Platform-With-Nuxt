import { defineStore } from 'pinia'
import type { SliderPaginate, Slider, Form, Error } from '~/types/slider'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'

export const useSliderStore = defineStore('slider', () => {
  const sliders = ref<SliderPaginate | null>(null)
  const slider = ref<Slider | null>(null)
  const errors = ref<Error | null>(null)
  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router, $toast } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllSlider = async (params) => {
    try {
      const { generateQueryParams } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/sliders?${generateQueryParams(params)}`)

      if (!data) throw new Error('Response Data Not Found!')

      sliders.value = data
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getSlider = async (slug: string) => {
    try {
      const { data } = await $axiosApi.get(`/admin/sliders/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      slider.value = data
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createSlider = async (form: Form, createAnother: boolean) => {
    try {
      form.captcha_token = await generateCaptchaToken('create_slider')

      const response = await $axiosApi.post(
        '/admin/sliders',
        { ...form },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (!response) throw new Error('Response Not Found!')

      if (!createAnother) {
        $router.push({ path: '/admin/sliders', query: { ...queryString.value } })

        $swal.fire({ icon: 'success', title: 'Slider created successfully!' })
      } else {
        $toast.success('Slider created successfully!')
      }
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateSlider = async (form: Form, slug: string) => {
    try {
      form.captcha_token = await generateCaptchaToken('update_slider')

      form._method = 'PATCH'

      const response = await $axiosApi.post(
        `/admin/sliders/${slug}`,
        { ...form },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (!response) throw new Error('Response Not Found!')

      $router.push({ path: '/admin/sliders', query: { ...queryString.value } })

      $swal.fire({ icon: 'success', title: 'Slider updated successfully!' })
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const changeStatus = async (status: boolean, slug: string) => {
    try {
      const response = await $axiosApi.put(`/admin/sliders/${slug}/change-status`, {
        status
      })

      if (!response) throw new Error('Response Not Found!')

      const index = sliders.value.data.findIndex((slider) => slider.slug === slug)

      sliders.value.data[index] = { ...response.data }

      $toast.success('Slider status changed successfully!')
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const deleteSlider = async (slug: string) => {
    try {
      const result = await $swal.fire({
        icon: 'question',
        title: 'Delete Slider',
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
        const response = await $axiosApi.delete(`/admin/sliders/${slug}`)

        if (!response) throw new Error('Response Not Found!')

        const index = sliders.value?.data?.findIndex((slider) => slider.slug === slug)

        if (index !== -1) {
          sliders.value?.data.splice(index, 1)

          if (index >= sliders.value?.meta?.current_page - 1 * sliders.value?.meta?.per_page) {
            await getAllSlider({ page: sliders.value?.meta?.current_page })
          }
        }

        if (response.status === 204) {
          $swal.fire({ icon: 'success', title: 'Slider deleted successfully!' })
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
    sliders,
    slider,
    errors,
    getAllSlider,
    getSlider,
    createSlider,
    updateSlider,
    changeStatus,
    deleteSlider
  }
})
