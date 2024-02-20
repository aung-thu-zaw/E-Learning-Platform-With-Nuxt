import Vue from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    can(permission: string): boolean
  }
}

Vue
