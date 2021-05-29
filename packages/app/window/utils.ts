import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import { BrowserWindowConstructorOptions, ipcMain, IpcMainInvokeEvent } from 'electron'

export const options: BrowserWindowConstructorOptions = {
  width: 1080,
  height: 650,
  frame: false,
  titleBarStyle: 'hiddenInset',
  transparent: true,
  webPreferences: {
    contextIsolation: true,
    preload: join(dirname(fileURLToPath(import.meta.url)), '../preload/index.cjs'),
  },
  ...(import.meta.env.PROD
    ? {
        // Production
      }
    : {
        // Development
      }),
}

export type EventCallback = (event: IpcMainInvokeEvent, ...args: any[]) => void

export class WinSuscribe {
  constructor(protected events: Record<string, Array<EventCallback>>) {
    this.events = events
  }

  public subscribe(name: string, cb: EventCallback) {
    if (!Array.isArray(this.events[name])) this.events[name] = []
    this.registerHandler(name, cb)
    return () => this.unsuscribe(name, cb)
  }

  protected unsuscribe(name: string, cb: EventCallback) {
    if (!Array.isArray(this.events[name])) return
    this.events[name] = this.events[name].filter((_) => _ !== cb)
  }

  protected registerHandler(name: string, cb: EventCallback) {
    this.events[name].push(cb)
    // @ts-ignore: `_invokeHandlers` is a hidden property
    if ((ipcMain._invokeHandlers as Map<string, unknown>).has(name)) return
    ipcMain.handle(name, async (event, ...args: any[]) => {
      if (!Array.isArray(this.events[name])) throw new Error(`No callback find for '${name}' event`)
      this.events[name].forEach((c) => c(event, ...args))
    })
  }
}
