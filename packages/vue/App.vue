<template>
  <div
    bg="cool-gray-200 dark:cool-gray-900"
    text="cool-gray-900 dark:cool-gray-100"
    h="screen"
    flex="~ row"
    place="items-stretch"
    overflow="hidden"
    select="none"
  >
    <router-view name="sidebar" />

    <main style="-webkit-app-region: drag" p="y-6 r-6" flex="grow">
      <div flex="~ col" h="full" grid="gap-4">
        <DrawerHeader />
        <router-view />
      </div>
    </main>
  </div>
</template>

<style lang="postcss">
html {
  font-size: 14px;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont;
}

*,
a,
button {
  @apply select-none !cursor-default;
}
</style>
