<template>
  <div style="-webkit-app-region: no-drag" space="y-6" overflow="hidden">
    <SidebarHeader name="Cajeros">
      <button
        text="2xl gray-500 hover:gray-600"
        border="rounded-full"
        outline="focus:none"
        @click="isAdding = true"
      >
        <icon-mdi:plus-box />
      </button>
    </SidebarHeader>

    <SidebarList v-if="items" :items="items" key-field="name">
      <template #default="{ item }">
        <span :style="`background: ${item.color}`" h="4" w="4" border="rounded-1" />
        <div>
          <p text="base gray-300" font="semibold">
            {{ item.name }}
          </p>
        </div>
      </template>
    </SidebarList>

    <Modal v-if="isAdding" @close-modal="onCloseModal">
      <template #body>
        <div>
          <div>
            <input
              v-model="cashierName"
              type="text"
              placeholder="Nombre del cajero"
              outline="focus:none"
            />
          </div>
          <button @click="addNewCashier">ADD</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useToggle } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import { useCashierStore } from '@/store'

const { success, error } = useToast()
const [isAdding] = useToggle()

const cashierName = ref('')

const { items, reload, createCashier } = useCashierStore()

const addNewCashier = async () => {
  try {
    const created = await createCashier({
      name: cashierName.value,
    })
    await reload()
    success(`New Cashier: ${created.name} created`)
  } catch {
    error('Ocurrio un error')
  }
}

const onCloseModal = () => {
  cashierName.value = ''
  isAdding.value = false
}
</script>
