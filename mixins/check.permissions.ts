import { useAbilityStore } from '~/stores/dashboard/ability'
import { App } from 'vue'

export const Can = {
  install: (app: App) => {
    const store = useAbilityStore()

    store.getUserAbilities()

    const can = (permission: string): boolean => store?.permissions?.includes(permission)

    app.mixin({ methods: { can } })
  }
}
