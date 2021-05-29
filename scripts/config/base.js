/** @type {import('electron-builder').Configuration} */
const config = {
  productName: 'pos',
  appId: 'dev.amaurytq.pos',
  copyright: 'Copyright © 2021 Amaury Tobias',
  electronVersion: process.env.ELECTRON_VERSION,
  directories: {
    output: 'dist/app',
    buildResources: 'dist',
    app: 'dist/source',
  },
}

module.exports = config
