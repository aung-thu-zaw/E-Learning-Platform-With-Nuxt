<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  },

  name: {
    type: String,
    default: ''
  },

  disabled: {
    type: Boolean,
    default: false
  },

  required: {
    type: Boolean,
    default: false
  },

  modelValue: {
    type: [String, Object],
    default: ''
  },

  rounded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const onFileChange = (event) => {
  const selectedFile = event.target.files[0]
  emit('update:modelValue', selectedFile)
}
</script>

<template>
  <div>
    <input
      :name="name"
      :id="name"
      class="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600 file:disabled:opacity-50 file:disabled:pointer-events-none p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
      :class="{
        'rounded-full': rounded,
        'rounded-md': !rounded
      }"
      aria-describedby="file_input_help"
      type="file"
      @change="onFileChange"
      :disabled="disabled"
      :required="required"
    />
    <p v-show="text" class="mt-1 text-xs font-bold text-gray-600" :id="name + '-help'">
      {{ text }}
    </p>
  </div>
</template>
