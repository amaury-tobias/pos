import { dirname, join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { app } from 'electron'

import { MainWindow } from '@app/window'
import { createServicesHandler } from '@app/services'

global.__windowURLs = new Proxy(
  {},
  {
    get(_, page) {
      return import.meta.env.DEV
        ? `http://localhost:3000/${page.toString()}.html`
        : pathToFileURL(
            join(dirname(fileURLToPath(import.meta.url)), `../vue/${page.toString()}.html`)
          ).href
    },
  }
)

if (!app.requestSingleInstanceLock()) app.quit()

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

let mainWindow: MainWindow | null

function init() {
  mainWindow = new MainWindow()
  createServicesHandler()

  const mainWindowOpen = () => {
    mainWindow?.open()
  }

  mainWindowOpen()
}

app.whenReady().then(() => {
  init()
})
