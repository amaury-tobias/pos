<template>
  <div
    style="-webkit-app-region: no-drag"
    bg="cool-gray-800"
    border="rounded-lg"
    flex="~"
    justify="around"
    place="items-center"
    text="gray-500"
    p="2"
    grid="gap-1"
  >
    <AppLink
      to="/"
      flex="~ shrink-0"
      justify="center"
      place="items-center"
      w="10"
      h="10"
      hover="bg-cool-gray-600"
      border="rounded-lg"
      :active-class="isFocus ? '!bg-purple-700 text-cool-gray-200' : 'bg-purple-300'"
    >
      <icon-ri:home-line />
    </AppLink>

    <!-- <AppLink
      to="orders"
      flex="~ shrink-0"
      justify="center"
      place="items-center"
      w="10"
      h="10"
      hover="bg-cool-gray-600"
      border="rounded-lg"
      :active-class="isFocus ? '!bg-purple-700 text-cool-gray-200' : 'bg-purple-300'"
    >
      <icon-ri:file-list-line />
    </AppLink> -->

    <AppLink
      to="cashiers"
      flex="~ shrink-0"
      justify="center"
      place="items-center"
      w="10"
      h="10"
      hover="bg-cool-gray-600"
      border="rounded-lg"
      :active-class="isFocus ? '!bg-purple-700 text-cool-gray-200' : 'bg-purple-300'"
    >
      <icon-ri:user-line />
    </AppLink>

    <AppLink
      to="settings"
      flex="~ shrink-0"
      justify="center"
      place="items-center"
      w="10"
      h="10"
      hover="bg-cool-gray-600"
      border="rounded-lg"
      :active-class="isFocus ? '!bg-purple-700 text-cool-gray-200' : 'bg-purple-300'"
    >
      <icon-ri:settings-line />
    </AppLink>

    <button
      flex="~ shrink-0"
      w="10"
      h="10"
      justify="center"
      place="items-center"
      border="rounded-lg"
      outline="focus:none"
      text="cool-gray-200"
      :class="isDark ? 'bg-orange-400' : 'bg-purple-600'"
      @click="toggle"
    >
      <icon-ri:sun-line v-if="isDark" />
      <icon-ri:moon-line v-else />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { useWindowFocus } from '@/hooks'

const isFocus = useWindowFocus()

const isDark = useDark()
const toggle = useToggle(isDark)
</script>
