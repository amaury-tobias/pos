<template>
  <div flex="~" grid="gap-4">
    <div bg="cool-gray-50 dark:cool-gray-800" border="rounded-xl" w="full">
      <input
        ref="searchBar"
        v-model="search"
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
      bg="cool-gray-50 dark:cool-gray-800"
      hover="bg-cool-gray-100 dark:bg-cool-gray-700"
      border="rounded-xl"
      flex="~ shrink-0"
      place="items-center"
      justify="center"
      w="14"
      outline="focus:none"
      @click="listModeToggle"
    >
      <icon-ri:apps-line v-show="isListMode" />
      <icon-ri:list-check-2 v-show="!isListMode" />
    </button>
    <button
      bg="cool-gray-50 dark:cool-gray-800"
      hover="bg-cool-gray-100 dark:bg-cool-gray-700"
      border="rounded-xl"
      flex="~ shrink-0"
      place="items-center"
      justify="center"
      w="14"
      outline="focus:none"
      @click="isAdding = true"
    >
      <icon-ri:add-fill />
    </button>
  </div>

  <section
    bg="cool-gray-50 dark:cool-gray-800"
    border="rounded-2xl"
    flex="grow"
    p="4"
    overflow="hidden"
  >
    <div v-if="error">
      <p>Error al cargar la lista</p>
    </div>
    <p v-else-if="isLoading">Cargando...</p>
    <div v-else overflow="scroll" h="full">
      <div class="grid gap-4" :class="isListMode ? 'grid-cols-2' : 'grid-cols-5'">
        <div
          v-for="product in filteredItems"
          :key="product.id"
          :class="isListMode ? 'h-24 flex' : 'aspect-4/3'"
          overflow="hidden"
          border="rounded-xl"
        >
          <img :src="`https://picsum.photos/500?random=${product.id}`" loading="lazy" />

          <div
            pos="bottom-0"
            bg="blue-gray-900 opacity-70"
            w="full"
            p="y-2 x-2"
            text="sm cool-gray-50"
          >
            <h3>{{ product.name }}</h3>
            <p text="xs cool-gray-400">
              {{ product.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Modal v-if="isAdding" @close-modal="isAdding = false">
    <template #body>
      <div>
        <p>hola</p>
        <button @click="addNewProduct">ADD</button>
      </div>
    </template>
  </Modal>

  <!-- <OrdersDrawer :number="2" /> -->
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef } from 'vue'
import { onStartTyping, useToggle, invoke } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import { useInventoryStore } from '@/store'

const searchBar = shallowRef<HTMLInputElement | null>(null)
const search = ref('')
const [isAdding] = useToggle()
const [isListMode, listModeToggle] = useToggle()
const { success, error: toastError } = useToast()
const { items, error, reload, isLoading, createProduct } = useInventoryStore()

onStartTyping(() => searchBar.value?.focus())

const filteredItems = computed(() =>
  items.value?.filter(
    (i) =>
      i.name.toLowerCase().includes(search.value.toLowerCase()) ||
      i.sku.toLowerCase().includes(search.value.toLowerCase())
  )
)

const addNewProduct = async () => {
  try {
    const created = await createProduct({
      name: '',
      description: '',
      img: '',
      price: 0,
      sku: '',
      qty: 0,
    })
    await reload()
    success(`New Product: ${created.name} created`)
  } catch {
    toastError('ocurrio un error')
  }
}

const onCloseModal = () => {
  isAdding.value = false
}
</script>
