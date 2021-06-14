import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Envidia Store',
    },
    components: {
      default: () => import('@/components/Drawer/Drawer.vue'),
      sidebar: () => import('@/components/Sidebar/Drawer.vue'),
    },
    children: [
      {
        path: '',
        name: 'Inventory',
        components: {
          default: () => import('@/views/default/Drawer.vue'),
          'sidebar-content': () => import('@/views/default/Sidebar.vue'),
        },
      },
      {
        path: 'orders',
        name: 'Orders',
        meta: {
          title: 'Orders',
        },
        components: {
          default: () => import('@/views/Orders/Drawer.vue'),
          'sidebar-content': () => import('@/views/Orders/Sidebar.vue'),
        },
      },
      {
        path: 'cashiers',
        name: 'Cashiers',
        meta: {
          title: 'Cajeros',
        },
        components: {
          default: () => import('@/views/Cashier/Drawer.vue'),
          'sidebar-content': () => import('@/views/Cashier/Sidebar.vue'),
        },
      },
      {
        path: 'settings',
        name: 'Settings',
        meta: {
          title: 'Ajustes',
        },
        components: {
          default: () => import('@/views/Settings/Drawer.vue'),
          'sidebar-content': () => import('@/views/Settings/Sidebar.vue'),
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export const installRouter = (app: App) => app.use(router)
