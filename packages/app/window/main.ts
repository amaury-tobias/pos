import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { EventCallback, WinSuscribe, options } from '@app/window/utils'

export class MainWindow extends WinSuscribe {
  static events: Record<string, Array<EventCallback>>
  #win: BrowserWindow | null = null
  #url = __windowURLs.index
  #opts: BrowserWindowConstructorOptions

  constructor(opts: BrowserWindowConstructorOptions = {}) {
    super(MainWindow.events)
    this.#opts = opts
  }

  open() {
    this.#win = new BrowserWindow({
      ...options,
      title: 'Main',
      ...this.#opts,
    })
    this.#win.setContentProtection(true)
    this.#win.loadURL(this.#url)
    this.#win.center()
  }

  close() {
    if (!this.#win) return
    this.#win.close()
    this.#win = null
  }
}
