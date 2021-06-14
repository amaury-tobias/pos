<template>
  <ul space="y-4" overflow="scroll" h="full">
    <li
      v-for="item in items"
      :key="item[keyField]"
      flex="~ row"
      space="x-2"
      place="items-center"
      border="rounded-lg"
      hover="bg-cool-gray-700"
      p="x-3 y-4"
    >
      <slot :item="item" />
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'

defineProps({
  items: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  keyField: {
    type: String,
    default: 'id',
  },
})
</script>
