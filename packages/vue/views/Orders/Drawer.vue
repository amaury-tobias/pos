<template>
  <div flex="~" grid="gap-4">
    <div bg="cool-gray-800" border="rounded-xl" w="full">
      <input
        type="text"
        appearance="none"
        h="full"
        w="full"
        bg="transparent"
        p="4"
        placeholder="Enter item code."
        text="placeholder-cool-gray-600"
        outline="none"
      />
    </div>
    <button
      transform="~"
      bg="cool-gray-800"
      hover="bg-cool-gray-700 scale-105"
      border="rounded-xl"
      flex="~"
      place="items-center"
      justify="center"
      w="14"
      outline="focus:none"
      @click="listModeToggle"
    >
      <icon-ri:apps-line v-show="isListMode" key="grid" />
      <icon-ri:list-check-2 v-show="!isListMode" key="list" />
    </button>
  </div>

  <section bg="cool-gray-800" border="rounded-2xl" flex="grow" p="4" overflow="hidden">
    <div overflow="scroll" h="full">
      <div grid="~ cols-5 gap-4">
        <div v-for="i in 30" :key="i" class="aspect-4/3" overflow="hidden" border="rounded-xl">
          <img :src="`https://picsum.photos/500?random=${i}`" />

          <div>
            <div
              pos="absolute bottom-0"
              bg="blue-gray-900 opacity-70"
              w="full"
              p="y-2 x-2"
              text="sm"
            >
              <h3>article {{ i }}</h3>
              <p text="xs gray-500">Lorem ipsum dolor sit amet sit ipsum.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isListMode = ref(false)
const listModeToggle = () => {
  if (isListMode.value) isListMode.value = false
  else isListMode.value = true
}
</script>
