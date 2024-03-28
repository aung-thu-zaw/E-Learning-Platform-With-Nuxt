<script setup lang="ts">
interface Enrollment {
  id: number
  enrolled_at: string
  completed_at: string
  progress: number
}

defineProps<{ enrollment: Enrollment | null }>()
</script>

<template>
  <div v-if="enrollment" class="w-full px-3 my-5 text-gray-700 font-semibold">
    <div class="mb-2 flex justify-between items-center">
      <h3 class="text-sm">{{ $t('Progress') }}</h3>
      <span class="text-sm">{{ enrollment.progress }}%</span>
    </div>
    <div
      class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="flex flex-col justify-center rounded-full overflow-hidden bg-yellow-500 text-xs text-center whitespace-nowrap transition duration-500"
        :style="{ width: enrollment.progress + '%' }"
      ></div>
    </div>

    <span class="block text-xs text-right ml-auto mt-3">
      {{ $t('Time left in the course') }} : 1 h 04 min
    </span>
  </div>
</template>
