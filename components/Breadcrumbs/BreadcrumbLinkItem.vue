<script setup>
defineProps({
  to: {
    type: String,
    required: true
  },

  targetIdentifier: {
    type: String,
    required: false,
    default: () => ''
  },

  label: {
    type: String,
    required: true
  },

  icon: {
    type: String,
    default: () => ''
  }
})
</script>

<template>
  <li class="text-gray-700 hover:text-yellow-500 duration-150">
    <div class="flex items-center">
      <i class="fa-solid fa-angle-right text-gray-500"></i>

      <NuxtLink
        :to="targetIdentifier ? `${to}/${targetIdentifier}` : to"
        class="inline-flex items-center text-sm font-bold"
      >
        <span class="mr-2">
          <i class="fa-solid" :class="icon"></i>
        </span>
        {{ label }}
      </NuxtLink>
    </div>
  </li>
</template>
