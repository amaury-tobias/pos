<template>
  <div
    bg="cool-gray-900"
    text="cool-gray-100"
    h="screen"
    flex="~ row"
    place="items-stretch"
    overflow="hidden"
    select="none"
  >
    <aside
      style="-webkit-app-region: drag"
      h="full"
      w="min-[300px] [calc(100%/4)] lg:[calc(100%/3)] xl:[calc(100%/4)]"
      flex="~ col shrink-0"
      place="items-stretch"
      p="y-12 x-8"
      space="y-6"
    >
      <div flex="~" place="items-center" select="none">
        <h1 font="bold" text="4xl" flex="grow">Orders</h1>
        <icon-mdi:plus-box text="2xl gray-500 hover:gray-50" border="rounded-full" />
      </div>

      <ul space="y-4" overflow="scroll" flex="grow">
        <template v-for="i in 26" :key="i">
          <li
            flex="~ row"
            space="x-2"
            place="items-center"
            border="rounded-lg"
            p="x-3 y-4"
            :class="i === 1 ? 'bg-teal-600 !text-white' : ''"
          >
            <div>
              <p text="base gray-300" font="semibold">Order #00{{ i }}</p>
              <p text="xs gray-600">extra</p>
            </div>
          </li>
        </template>
      </ul>

      <div
        bg="cool-gray-800"
        border="rounded-lg"
        flex="~"
        justify="around"
        place="items-center"
        text="gray-500"
        p="y-2"
      >
        <a flex="~" p="x-3 y-2" border="rounded-lg">
          <icon-ri:home-line />
        </a>
        <a flex="~" p="x-3 y-2" border="rounded-lg">
          <icon-ri:function-line />
        </a>
        <a bg="cool-gray-700" flex="~" p="x-3 y-2" border="rounded-lg">
          <icon-ri:file-list-line text="white" />
        </a>
        <a flex="~" p="x-3 y-2" border="rounded-lg">
          <icon-ri:user-line />
        </a>
        <a flex="~" p="x-3 y-2" border="rounded-lg">
          <icon-ri:settings-line />
        </a>
      </div>
    </aside>

    <main p="y-6 r-6" flex="grow">
      <div flex="~ col" h="full" grid="gap-4">
        <div flex="~" justify="between">
          <h2 text="2xl" font="semibold">ORDER #005</h2>
          <p text="cool-gray-600">Sab, 29 May 2021, 02:33 PM</p>
        </div>

        <div bg="cool-gray-800" border="rounded-xl">
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

        <section bg="cool-gray-800" border="rounded-2xl" flex="grow" p="4" overflow="hidden">
          <div overflow="scroll" h="full">
            <div grid="~ cols-4 gap-4">
              <div
                v-for="i in 20"
                :key="i"
                class="aspect-4/3"
                overflow="hidden"
                border="rounded-xl"
              >
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
      </div>
    </main>
  </div>
  <Modal v-if="isModalVisible">
    <template #body="{ closeModal }">
      <button @click="closeModal">close</button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useService } from '@/hooks'

const isModalVisible = ref(false)
const info = reactive({
  platform: '',
  version: '',
  root: '',
})

const { getBasicInformation } = useService('WindowService')

getBasicInformation().then((res) => {
  info.platform = res.platform
  info.version = res.version
  info.root = res.root
})
</script>
