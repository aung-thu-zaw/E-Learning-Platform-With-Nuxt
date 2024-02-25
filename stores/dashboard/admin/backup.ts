import { defineStore } from 'pinia'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

export const useBackupStore = defineStore('database-backup', () => {
  const backups = ref<any>(null)
  const backup = ref<any>(null)
  const overallInformation = ref<any>(null)
  const errors = ref<any>(null)
  const { $axiosApi, $swal, $toast, $router } = useNuxtApp()

  const getAllBackup = async (params) => {
    try {
      const { generateQueryParams } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/database-backups?${generateQueryParams(params)}`)

      if (!data) throw new Error('Response Data Not Found!')

      backups.value = data.backups
      overallInformation.value = data.overallInformation
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createBackup = async () => {
    try {
      const response = await $axiosApi.post('/admin/database-backups')

      if (!response) throw new Error('Response Not Found!')

      await getAllBackup({ page: 1 })

      $toast.success('Backup completed successfully')
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const deleteBackup = async (filename: string) => {
    try {
      const result = await $swal.fire({
        icon: 'question',
        title: 'Delete Backup',
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
        const response = await $axiosApi.delete(`/admin/database-backups/${filename}`)

        if (!response) throw new Error('Response Not Found!')

        const index = backups.value?.data?.findIndex((file) => file.filename === filename)

        if (index !== -1) {
          backups.value.data.splice(index, 1)

          const currentPageIndex = backups.value.current_page - 1
          const itemsPerPage = backups.value.per_page

          if (index >= currentPageIndex * itemsPerPage) {
            await getAllBackup({ page: backups.value.current_page })
          }
        }

        if (response.status === 204)
          $swal.fire({ icon: 'success', title: 'Backup deleted successfully!' })
      }
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const downloadBackup = async (filename: string) => {
    try {
      const response = await $axiosApi.get(`/admin/database-backups/${filename}/download`)

      if (!response) throw new Error('Response Not Found!')

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')

      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      $swal.fire({
        icon: 'error',
        title: 'Failed to download backup file. Please try again.'
      })
    }
  }

  return {
    backups,
    backup,
    overallInformation,
    errors,
    getAllBackup,
    createBackup,
    deleteBackup,
    downloadBackup
  }
})
