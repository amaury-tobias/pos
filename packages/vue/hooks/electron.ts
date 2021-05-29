const { clipboard, dialog, ipcRenderer, shell } = window.electron

type IpcRendererMethods = keyof typeof ipcRenderer

const ipcRendererProxy = new Proxy({} as typeof ipcRenderer, {
  get(_, method: IpcRendererMethods) {
    // @ts-ignore: ..payload as args
    return (...payload: any[]) => ipcRenderer[method](...payload)
  },
})

export function useShell() {
  return shell
}

export function useClipboard() {
  return clipboard
}

export function useDialog() {
  return dialog
}

export function useIpc() {
  return ipcRendererProxy
}
