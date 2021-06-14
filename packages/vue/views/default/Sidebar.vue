<template>
  <div style="-webkit-app-region: no-drag" space="y-6" overflow="hidden">
    <SidebarHeader name="Home">
      <icon-ri:home-line text="2xl gray-500" />
    </SidebarHeader>

    <ul space="y-4" overflow="scroll" h="full">
      <li
        v-for="i in 4"
        :key="i"
        flex="~ row"
        space="x-2"
        place="items-center"
        border="rounded-lg"
        p="x-3 y-4"
      >
        <div>
          <p text="base cool-gray-700 dark:gray-300" font="semibold">Opcion #001</p>
          <p text="xs gray-600">extra</p>
        </div>
      </li>
    </ul>
  </div>
</template>
