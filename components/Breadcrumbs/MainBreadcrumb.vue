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
    default: () => 'fa-home'
  }
})

const localePath = useLocalePath()
</script>

<template>
  <nav class="flex mb-5 md:mb-0 overflow-x-auto w-full md:max-w-[1000px] px-0">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center text-gray-800 hover:text-yellow-500 duration-150">
        <NuxtLink
          :to="targetIdentifier ? localePath(`${to}/${targetIdentifier}`) : localePath(to)"
          class="inline-flex items-center text-sm font-bold"
        >
          <span class="mr-2">
            <i class="fa-solid" :class="icon"></i>
          </span>
          {{ $t(label) }}
        </NuxtLink>
      </li>
      <slot />
    </ol>
  </nav>
</template>
