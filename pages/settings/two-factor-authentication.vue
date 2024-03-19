<script setup lang="ts">
import SettingSideTabs from '~/components/Tabs/SettingSideTabs.vue'
import TwoFactorNotifyModal from '~/components/Modals/TwoFactorNotifyModal.vue'

useHead({ title: 'Two-Factor Authentication' })

definePageMeta({ layout: 'app-layout', middleware: 'auth' })
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-5">
      <div class="flex flex-col md:flex-row items-start md:space-x-6 space-y-5 md:space-y-0">
        <div class="w-full md:w-3/12">
          <SettingSideTabs />
        </div>
        <div class="w-full md:w-9/12">
          <div class="bg-white border border-gray-300 p-10 rounded-md space-y-5">
            <h1 class="font-bold text-lg text-gray-800">{{ $t('Two-factor Authentication') }}</h1>
            <p class="text-sm">
              {{
                $t(
                  'Increase your account security by requiring that a code emailed to you be entered when you log in.'
                )
              }}
            </p>

            <TwoFactorNotifyModal />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
