<script setup lang="ts">
import ReminderCard from '~/components/Cards/ReminderCard.vue'
import ReminderModal from '~/components/Modals/ReminderModal.vue'

useHead({ title: 'Learning Reminders' })

definePageMeta({ layout: 'my-learning-layout', middleware: 'auth' })
</script>

<template>
  <div class="space-y-10">
    <div class="text-gray-800">
      <h1 class="text-3xl font-extrabold mb-6">{{ $t('Learning Reminders') }}</h1>

      <p class="text-sm font-medium">
        {{
          $t(
            'Learning a little each day adds up. Research shows that students who make learning a habit are more likely to reach their goals. Set time aside to learn and get reminders using your learning scheduler.'
          )
        }}
      </p>

      <div class="mt-14">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <ReminderCard v-for="index in 6" :key="index" />
        </div>

        <div>
          <!-- <NormalButton class="text-white bg-yellow-500 hover:bg-yellow-600">
            Add A New Reminder
          </NormalButton> -->
          <ReminderModal mode="add" />
        </div>
      </div>
    </div>
  </div>
</template>
