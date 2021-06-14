<template>
  <div flex="~" justify="end">
    <p text="cool-gray-600">
      {{ time }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'

const time = ref('')
const interval = setInterval(() => {
  time.value = Intl.DateTimeFormat(navigator.language, {
    hour12: true,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
  }).format()
}, 1000)

onUnmounted(() => clearInterval(interval))
</script>
