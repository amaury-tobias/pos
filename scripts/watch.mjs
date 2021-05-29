#!/usr/bin/node
import { EOL } from 'node:os'
import { join } from 'node:path'
import { spawn } from 'node:child_process'

import { createServer, build } from 'vite'
import electronPath from 'electron'
import chalk from 'chalk'

process.env.NODE_ENV = 'development'
const mode = process.env.NODE_ENV

/** @type {import('vite').LogLevel} */
const LOG_LEVEL = 'warn'

/** @type {import('vite').InlineConfig} */
const sharedConfig = {
  mode,
  build: { watch: {} },
  logLevel: LOG_LEVEL,
}

/**
 * @param param0 {{name:string,configFile:string,writeBundle:()=>void | Promise<void>}}
 */
const getWatcher = ({ name, configFile, writeBundle }) => {
  return build({
    ...sharedConfig,
    configFile,
    plugins: [
      {
        name,
        writeBundle,
      },
    ],
  })
}

/**
 * @param data {string}
 */
const electronLog = (data) => {
  /**
   * @param line {string}
   */
  const colorize = (line) => {
    if (line.startsWith('[INFO]')) return chalk.green('[INFO]') + line.substring(6)
    else if (line.startsWith('[WARN]')) return chalk.green('[WARN]') + line.substring(6)
    else if (line.startsWith('[ERROR]')) return chalk.green('[ERROR]') + line.substring(7)
    return chalk.grey(line)
  }
  console.log(
    data
      .toString()
      .split(EOL)
      .filter((s) => s.trim() !== '')
      .map(colorize)
      .join(EOL)
  )
}

const setupMainPackageWatcher = () => {
  /** @type {import('child_process').ChildProcessWithoutNullStreams | null} */
  let spawnProcess = null

  return getWatcher({
    name: 'reload-app-on-app-package-change',
    configFile: join(process.cwd(), 'packages/app/vite.config.ts'),
    writeBundle() {
      console.log(chalk.greenBright('[ELECTRON] build'))

      if (spawnProcess !== null) {
        console.log(chalk.greenBright('[ELECTRON] restart'))
        spawnProcess.kill('SIGINT')
        spawnProcess = null
      }

      spawnProcess = spawn(electronPath, [
        '--inspect=5858',
        '--remote-debugging-port=9222',
        '--dev',
        join(process.cwd(), 'dist/source/app/index.cjs'),
      ])

      spawnProcess.stdout.on('data', electronLog)
      spawnProcess.stderr.on('data', electronLog)
      spawnProcess.on('exit', (_, signal) => {
        // if (!signal) process.exit(0)
      })
    },
  })
}

/**
 * @param viteDevServer {import('vite').ViteDevServer}
 */
const setupPreloadPackageWatcher = (viteDevServer) => {
  return getWatcher({
    name: 'reload-page-on-preload-package-change',
    configFile: join(process.cwd(), 'packages/preload/vite.config.ts'),
    writeBundle() {
      console.log(chalk.blueBright('[PRELOAD] build'))
      viteDevServer.ws.send({ type: 'full-reload' })
    },
  })
}

const main = async () => {
  const viteDevServer = await createServer({
    ...sharedConfig,
    configFile: join(process.cwd(), 'packages/vue/vite.config.ts'),
  })

  await viteDevServer.listen()
  await setupPreloadPackageWatcher(viteDevServer)
  await setupMainPackageWatcher()
}

main().catch((err) => {
  console.error(err)
  process.exit(-1)
})
