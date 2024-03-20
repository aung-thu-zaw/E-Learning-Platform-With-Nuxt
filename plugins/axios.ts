import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const { backendBaseUrl, backendApiBaseUrl } = useRuntimeConfig().public

  const axiosInstance = axios.create({
    baseURL: backendBaseUrl,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  const axiosApiInstance = axios.create({
    baseURL: backendApiBaseUrl,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  nuxtApp.provide('axios', axiosInstance)
  nuxtApp.provide('axiosApi', axiosApiInstance)
})
