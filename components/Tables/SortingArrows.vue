<script setup>
defineProps({
  params: {
    type: Object,
    required: true
  },
  sort: {
    type: String,
    default: 'desc'
  },
  direction: {
    type: String,
    default: 'desc'
  }
})
</script>

<template>
  <div class="inline-block">
    <span
      v-if="sort === params?.sort || direction === params.direction"
      class="flex flex-col items-center justify-center relative"
    >
      <i
        class="fa-solid fa-sort-up text-[.7rem] cursor-pointer"
        :class="{
          'text-primary': params?.direction === 'asc' && params?.sort === sort,
          'visually-hidden':
            params?.direction !== '' && params?.direction !== 'asc' && params?.sort === sort
        }"
      ></i>
      <i
        class="fa-solid fa-sort-down text-[.7rem] cursor-pointer absolute"
        :class="{
          'text-primary': params?.direction === 'desc' && params?.sort === sort,
          'visually-hidden':
            params?.direction !== '' && params?.direction !== 'desc' && params?.sort === sort
        }"
      ></i>
    </span>
    <span v-else>
      <i class="fa-solid fa-sort text-[.7rem] text-slate-600 hover:text-primary cursor-pointer"></i>
    </span>
  </div>
</template>
