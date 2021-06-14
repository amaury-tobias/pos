import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { EventCallback, WinSuscribe, options } from '@app/window/utils'

export class MainWindow extends WinSuscribe {
  static events: Record<string, Array<EventCallback>> = {}
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

    this.#win.on('focus', () => this.#win?.webContents.send('focus'))
    this.#win.on('blur', () => this.#win?.webContents.send('blur'))
    this.#win.once('ready-to-show', () => this.#win?.show())
  }

  close() {
    if (!this.#win) return
    this.#win.close()
    this.#win = null
  }
}
