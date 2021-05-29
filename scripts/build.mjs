#!/usr/bin/node
import { join, dirname } from 'node:path'
import { writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import { build } from 'vite'
import chalk from 'chalk'

const mode = process.env.NODE_ENV

const packagesConfigs = [
  'packages/app/vite.config.ts',
  'packages/preload/vite.config.ts',
  'packages/vue/vite.config.ts',
]

async function generatePackageJson() {
  const original = JSON.parse(await readFile(new URL('../package.json', import.meta.url)))
  const result = {
    name: original.name,
    author: original.author,
    version: original.version,
    license: original.license,
    main: original.main,
    dependencies: Object.entries(original.dependencies)
      .filter(([name]) => original.external.includes(name))
      .reduce((object, entry) => ({ ...object, [entry[0]]: entry[1] }), {}),
  }
  const destination = join(dirname(fileURLToPath(import.meta.url)), '../dist/source/package.json')
  await writeFile(destination, JSON.stringify(result))
  console.log(chalk.green('\npackage.json generated\n'))
}

const buildByConfig = (configFile) => build({ configFile, mode })

const main = async () => {
  const totalTimeLabel = 'Total bundling time'
  console.time(totalTimeLabel)

  for (const packageConfigPath of packagesConfigs) {
    const groupName = `${dirname(packageConfigPath)}/`
    console.group(groupName)
    const timeLabel = 'Bundling time'
    console.time(timeLabel)

    await buildByConfig(packageConfigPath)

    console.timeEnd(timeLabel)
    console.groupEnd()
    console.log('\n')
  }
  await generatePackageJson()
  console.timeEnd(totalTimeLabel)
}

main().catch((err) => {
  console.error(chalk.red(err))
  process.exit(-1)
})
