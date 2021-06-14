import useSWRV from 'swrv'
import { useService } from '@/hooks'

export function useCashierStore() {
  const { getCashiers, createCashier } = useService('StoreService')
  const { data, error, mutate } = useSWRV('cashierItems', getCashiers)

  return {
    items: data,
    error,
    isLoading: !error.value && !data.value,
    reload: () => mutate(),
    createCashier,
  }
}
