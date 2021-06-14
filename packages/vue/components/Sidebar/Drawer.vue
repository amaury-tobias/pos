<template>
  <aside
    style="-webkit-app-region: drag"
    h="full"
    w="300px"
    flex="~ col shrink-0"
    place="items-stretch"
    justify="between"
    p="y-12 x-8"
    space="y-6"
  >
    <router-view v-slot="{ Component }" name="sidebar-content">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <SidebarButtons />
  </aside>
</template>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-transform duration-300 transform;
}

.fade-enter-from,
.fade-leave-to {
  @apply -translate-x-full;
}
</style>
