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
  <div v-if="enrollment">
    <div
      class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="flex flex-col rounded-full justify-center overflow-hidden bg-yellow-500 text-xs text-white text-center whitespace-nowrap transition duration-500"
        :style="{ width: enrollment.progress + '%' }"
      ></div>
    </div>

    <div class="flex items-center justify-between text-xs font-medium text-gray-700 mt-1.5">
      <span>Progress</span>
      <span v-if="enrollment.progress < 100 && !enrollment.completed_at">
        {{ enrollment.progress }}% Complete
      </span>
      <span v-else class="text-yellow-500">
        <i class="fa-solid fa-circle-check"></i>
        Completed
      </span>
    </div>
  </div>
</template>
