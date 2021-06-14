<template>
  <div flex="~" place="items-center" select="none">
    <h1 font="bold" text="4xl" flex="grow">{{ name }}</h1>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>
