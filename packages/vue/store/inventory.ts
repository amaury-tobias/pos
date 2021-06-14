import useSWRV from 'swrv'
import { computed } from 'vue'
import { useService } from '@/hooks'

export function useInventoryStore() {
  const { getProducts, createProduct } = useService('StoreService')
  const { data, error, mutate } = useSWRV('inventoryItems', getProducts)

  return {
    items: data,
    error,
    isLoading: computed(() => !error.value && !data.value),
    reload: () => mutate(),
    createProduct,
  }
}
