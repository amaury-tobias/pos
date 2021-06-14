import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { WindowService } from '@app/services/WindowService'
import { StoreService } from '@app/services/StoreService'

export interface Services {
  WindowService: WindowService
  StoreService: StoreService
}

let _services!: Services

export function createServicesHandler() {
  _init({
    WindowService: new WindowService(),
    StoreService: new StoreService(),
  })
}

function _init(services: Services) {
  if (!services) throw new Error('Should not initializae services multiple times!')
  _services = services
}

ipcMain.handle('service:call', (_event, name: keyof Services, method: string, ...args: any[]) => {
  if (!_services) throw new Error('Cannot call any service until the services are ready!')
  const service = _services[name]
  if (!service) throw new Error(`Cannot find service named ${name}`)
  if (!(method in service))
    throw new Error(`Cannot find method named ${method} in service [${name}]`)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (service as any)[method](...args)
})
