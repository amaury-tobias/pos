<template inherit-attrs="false">
  <router-link :to="to" :replace="replace" custom>
    <a
      v-bind="$attrs"
      :href="href"
      :class="isExactActive ? activeClass : inactiveClass"
      @click="navigate"
    >
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { RouterLink, useLink } from 'vue-router'

import type { PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps({
  activeClass: String,
  inactiveClass: String,
  to: {
    type: String as PropType<RouteLocationRaw>,
    required: true,
  },
  replace: Boolean,
})
const { navigate, href, isExactActive } = useLink(props)
</script>
