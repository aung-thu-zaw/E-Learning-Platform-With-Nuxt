import type { AxiosInstance } from 'axios'
import Vue from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    can(permission: string): boolean
  }
}

declare module '#app' {
  interface NuxtApp {
    $axiosApi: AxiosInstance
    $axios: AxiosInstance
    $toast: any
    $swal: any
  }
}

Vue
