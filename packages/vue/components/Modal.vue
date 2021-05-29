<template>
  <teleport to="body">
    <div pos="fixed inset-0" z="50" backdrop="~ blur">
      <div class="h-full" backdrop="~ blur-3xl"></div>

      <div role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <slot name="body" :closeModal="closeModal">Body goes here ...</slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { defineEmit } from 'vue'

const emit = defineEmit({
  'close-modal': null,
})
const closeModal = () => emit('close-modal')
</script>
