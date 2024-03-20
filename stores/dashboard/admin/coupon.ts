import { defineStore } from 'pinia'
import type { CouponPaginate, Coupon, Form, Error } from '~/types/coupon'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'
import type { dashboardQuery } from '~/types/query'

export const useCouponStore = defineStore('coupon', () => {
  const coupons = ref<CouponPaginate | null>(null)
  const coupon = ref<Coupon | null>(null)
  const errors = ref<Error | null>(null)

  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router, $toast } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllCoupon = async (query: dashboardQuery | { page: number }): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/coupons?${generateQueryString(query)}`)

      if (!data) throw new Error('Response Data Not Found!')

      coupons.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getCoupon = async (id: number): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/admin/coupons/${id}`)

      if (!data) throw new Error('Response Data Not Found!')

      coupon.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createCoupon = async (form: Form, createAnother: boolean): Promise<void> => {
    try {
      form.captcha_token = await generateCaptchaToken('create_coupon')

      const response = await $axiosApi.post('/admin/coupons', { ...form })

      if (!response) throw new Error('Response Not Found!')

      if (!createAnother) {
        $router.push({ path: '/admin/coupons', query: { ...queryString.value } })

        $swal.fire({ icon: 'success', title: 'Coupon created successfully!' })
      } else {
        $toast.success('Coupon created successfully!')
      }
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateCoupon = async (form: Form, id: number): Promise<void> => {
    try {
      form.captcha_token = await generateCaptchaToken('update_coupon')

      const response = await $axiosApi.patch(`/admin/coupons/${id}`, { ...form })

      if (!response) throw new Error('Response Not Found!')

      $router.push({ path: '/admin/coupons', query: { ...queryString.value } })

      $swal.fire({ icon: 'success', title: 'Coupon updated successfully!' })
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const changeStatus = async (is_redeemable: boolean, id: number): Promise<void> => {
    try {
      const response = await $axiosApi.put(`/admin/coupons/${id}/change-status`, {
        is_redeemable
      })

      if (!response) throw new Error('Response Not Found!')

      if (coupons.value) {
        const index = coupons.value.data.findIndex((coupon) => coupon.id === id)

        coupons.value.data[index] = { ...response.data }
      }

      $toast.success('Coupon status changed successfully!')
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const deleteCoupon = async (id: number): Promise<void> => {
    try {
      const result = await $swal.fire({
        icon: 'question',
        title: 'Delete Coupon',
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
        const response = await $axiosApi.delete(`/admin/coupons/${id}`)

        if (!response) throw new Error('Response Not Found!')

        const index = coupons.value?.data?.findIndex((coupon) => coupon.id === id)

        if (index !== undefined && index !== -1) {
          const spliceIndex = index ?? 0

          coupons.value?.data.splice(spliceIndex, 1)

          if (
            coupons.value?.meta?.current_page !== undefined &&
            coupons.value?.meta?.per_page !== undefined &&
            index >= (coupons.value?.meta?.current_page - 1) * coupons.value?.meta?.per_page
          ) {
            await getAllCoupon({ page: coupons.value?.meta?.current_page })
          }
        }

        if (response.status === 204) {
          $swal.fire({ icon: 'success', title: 'Coupon deleted successfully!' })
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
    coupons,
    coupon,
    errors,
    getAllCoupon,
    getCoupon,
    createCoupon,
    updateCoupon,
    changeStatus,
    deleteCoupon
  }
})
