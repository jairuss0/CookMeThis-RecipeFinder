<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <div class="text-center">
    <div
      class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-500 mx-auto"
    ></div>
    <h2 class="mt-4">{{ title }}</h2>
    <p class="text-base-content/70">{{ description }}</p>
  </div>
</template>
