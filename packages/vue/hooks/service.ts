import { useIpc } from '@/hooks/electron'
import type { Services } from '@app/services'

const { callService } = useIpc()

function createProxy(service: string) {
  return new Proxy(
    {},
    {
      get(_, functionName) {
        return (...payload: any[]) => callService(service, functionName.toString(), ...payload)
      },
    }
  )
}

const servicesProxy: Services = new Proxy({} as Services, {
  get(_, serviceName) {
    return createProxy(serviceName.toString())
  },
})

export function useService<T extends keyof Services>(name: T): Services[T] {
  return servicesProxy[name]
}
