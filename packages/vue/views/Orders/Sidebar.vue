<template>
  <div style="-webkit-app-region: no-drag" space="y-6" overflow="hidden">
    <SidebarHeader name="Ordenes">
      <icon-mdi:plus-box text="2xl gray-500 hover:gray-50" border="rounded-full" />
    </SidebarHeader>

    <ul space="y-4" overflow="scroll" h="full">
      <li
        v-for="i in 10"
        :key="i"
        flex="~ row"
        space="x-2"
        place="items-center"
        border="rounded-lg"
        p="x-3 y-4"
      >
        <div>
          <p text="base gray-300" font="semibold">Opa #001</p>
          <p text="xs gray-600">extra</p>
        </div>
      </li>
    </ul>
  </div>
</template>
