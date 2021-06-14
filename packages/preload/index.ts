import { clipboard, contextBridge, Dialog, ipcRenderer, shell } from 'electron'

type IpcRenderedListener = (event: Electron.IpcRendererEvent, ...args: any[]) => void

const ipcRendererWrapper = (event: string, listener: IpcRenderedListener) => {
  ipcRenderer.on(event, listener)
  return () => ipcRenderer.off(event, listener)
}

const ipcRenderedListeners = {
  onFocus: (listener: IpcRenderedListener) => ipcRendererWrapper('focus', listener),
  onBlur: (listener: IpcRenderedListener) => ipcRendererWrapper('blur', listener),
}

const api = {
  shell,
  clipboard,
  ipcRenderer: {
    callService: (service: string, functionName: string, ...payload: any[]) =>
      ipcRenderer.invoke('service:call', service, functionName, ...payload),
    ...ipcRenderedListeners,
  },
  dialog: {},
}

export type ElectronAPI = typeof api

try {
  contextBridge.exposeInMainWorld('electron', api)
} catch {
  window.electron = api
}
