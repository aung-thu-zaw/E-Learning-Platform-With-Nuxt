<script setup lang="ts">
import ReminderCard from '~/components/Cards/ReminderCard.vue'
import ReminderModal from '~/components/Modals/ReminderModal.vue'
import { useReminderStore } from '~/stores/user/reminder'

useHead({ title: 'Learning Reminders' })

definePageMeta({ layout: 'my-learning-layout', middleware: 'auth' })

const store = useReminderStore()

const { reminders } = storeToRefs(store)

onMounted(async () => await store.getAllReminder())
</script>

<template>
  <div class="space-y-10">
    <div class="text-gray-800">
      <h1 class="text-3xl font-extrabold mb-6">{{ $t('Learning Reminders') }}</h1>

      <p v-if="!reminders?.length" class="text-sm font-medium mb-6">
        {{
          $t(
            'Set up push notifications or calendar events to stay on track for your learning goals.'
          )
        }}
      </p>

      <p class="text-sm font-medium mb-6">
        {{
          $t(
            'Learning a little each day adds up. Research shows that students who make learning a habit are more likely to reach their goals. Set time aside to learn and get reminders using your learning scheduler.'
          )
        }}
      </p>

      <div class="mt-14">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <ReminderCard v-for="reminder in reminders" :key="reminder?.id" :reminder="reminder" />
        </div>

        <div>
          <ReminderModal mode="add" />
        </div>
      </div>
    </div>
  </div>
</template>
