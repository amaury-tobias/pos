import { platform } from 'os'
import { app } from 'electron'
import { Service } from '@app/services/Service'

export class WindowService extends Service {
  async getBasicInformation() {
    return {
      platform: platform(),
      version: app.getVersion(),
      root: app.getPath('appData'),
    }
  }
}
