<template>
  <nav>
    <h1>{{ msg }}</h1>
  </nav>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<style lang="postcss" scoped>
nav {
  -webkit-app-region: drag;

  @apply bg-white select-none;
}
</style>
