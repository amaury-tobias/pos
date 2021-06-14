<template>
  <teleport to="body">
    <div pos="fixed left-0 top-0" z="10" backdrop="~ blur" w="300px" h="full" p="t-24 r-2">
      <aside
        flex="~ col"
        border="rounded-t-xl"
        place="items-stretch"
        bg="cool-gray-200"
        h="full"
        p="4"
        space="y-4"
      >
        <div flex="~" place="items-center" select="none">
          <h1 font="bold" text="3xl cool-gray-900" flex="grow">Order #{{ number }}</h1>
          <button outline="focus:none" @click="close">
            <icon-mdi:close-circle text="2xl gray-500 hover:gray-800" border="rounded-full" />
          </button>
        </div>

        <ul space="y-6" overflow="scroll" flex="grow" text="cool-gray-700">
          <template v-for="i in 26" :key="i">
            <li flex="~ row" space="x-2" place="items-stretch" border="dotted gray-300 b" p="2">
              <p text="base truncate" font="semibold" flex="grow">
                {{ title }}
              </p>
              <div flex="~">
                <button
                  bg="cool-gray-300"
                  border="rounded-lg"
                  h="8"
                  w="8"
                  flex="~"
                  justify="center"
                  place="items-center"
                >
                  <icon-mdi:minus />
                </button>

                <span flex="~" place="items-center" p="x-3">0</span>

                <button
                  bg="cool-gray-300"
                  border="rounded-lg"
                  h="8"
                  w="8"
                  flex="~"
                  justify="center"
                  place="items-center"
                >
                  <icon-mdi:plus />
                </button>
              </div>
            </li>
          </template>
        </ul>

        <div
          bg="purple-800 hover:purple-600"
          border="rounded-lg"
          flex="~"
          justify="center"
          text="gray-200"
          p="y-2"
        >
          <span>PAGAR</span>
        </div>
      </aside>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, defineEmit, defineProps, ref, toRefs } from 'vue'

const emit = defineEmit({
  close: null,
})

const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
})

const title = computed(() => {
  if (props.number < 10) return `Order #00${props.number}`
  if (props.number < 100) return `Order #0${props.number}`
  return `Item #${props.number}`
})

const close = () => emit('close')
const updateItems = () => {}
</script>
