<template>
  <teleport to="body">
    <transition name="fade" appear>
      <div
        pos="fixed inset-0"
        z="50"
        backdrop="~ blur"
        flex="~"
        justify="center"
        place="items-center"
      >
        <div
          ref="target"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          bg="cool-gray-50 dark:cool-gray-800"
          p="y-6 x-20"
          border="rounded-xl"
          pos="relative"
          flex="~ col"
          place="items-center"
          justify="center"
        >
          <button
            pos="absolute right-4 top-4"
            text="2xl gray-500 hover:gray-600"
            border="rounded-full"
            outline="focus:none"
            @click="closeModal"
          >
            <icon-ri:close-circle-line />
          </button>
          <slot name="body" :closeModal="closeModal">Body goes here ...</slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { defineEmit, shallowRef, watch } from 'vue'
import { onClickOutside, useMagicKeys } from '@vueuse/core'

const emit = defineEmit<{ (e: 'close-modal'): void }>()
const target = shallowRef<HTMLElement | null>(null)
const { escape } = useMagicKeys()
const closeModal = () => emit('close-modal')

watch(escape, () => emit('close-modal'))
onClickOutside(target, () => emit('close-modal'))
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition transition-opacity ease;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
