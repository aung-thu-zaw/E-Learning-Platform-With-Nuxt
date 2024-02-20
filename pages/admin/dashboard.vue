<script setup lang="ts">
import AdminLayout from '~/layouts/AdminLayout.vue'

useHead({ title: 'Dashboard' })
</script>

<template>
  <AdminLayout>
    {{ $t('Hello') }}
  </AdminLayout>
</template>
