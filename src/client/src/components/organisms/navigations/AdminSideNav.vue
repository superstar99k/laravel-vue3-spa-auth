<template>
  <NScrollbar>
    <nav class="pt-3 pb-5 w-100">
      <h5 class="px-3 fw-bold pt-3 pb-0 mb-4 text-white">業務管理システム</h5>
      <div>
        <NMenu
          :options="menuOptions"
          :root-indent="20"
          :icon-size="15"
          :inverted="true"
          :default-value="$route.name"
          :default-expanded-keys="defaultExpandedKeys($route.name)"
        />
      </div>
    </nav>
  </NScrollbar>
</template>

<script setup>
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon, NMenu, NScrollbar } from 'naive-ui'
import {
  HomeOutlined as HomeIcon,
  // BookOutlined as BookIcon,
  PersonOutlined as PersonIcon,
  // ShoppingCartOutlined as CartIcon,
  // BusinessOutlined as BusinessIcon,
  // HelpOutlineSharp as HelpIcon,
  // LocalLibraryOutlined as LibraryIcon,
  // EditCalendarOutlined as CalendarIcon,
  // ConstructionOutlined as ConstructIcon,
  // NewspaperOutlined as NewspaperIcon,
  // PriceChangeOutlined as PriceIcon,
} from '@vicons/material'

function renderIcon(icon) {
  return () => h(NIcon, { color: 'white' }, { default: () => h(icon) })
}

const menuOptions = [
  {
    key: 'admin-dashboard',
    label: () =>
      h(
        RouterLink,
        { to: { name: 'admin-dashboard' } },
        { default: () => 'ダッシュボード' }
      ),
    icon: renderIcon(HomeIcon),
  },
  {
    key: 'admin-users',
    label: () =>
      h(
        RouterLink,
        { to: { name: 'admin-users' } },
        { default: () => 'ユーザー管理' }
      ),
    icon: renderIcon(PersonIcon),
  },
]

const defaultExpandedKeys = (name) => {
  switch (name) {
    case 'processing-list':
      return ['process']
    case 'processing-order-list':
      return ['process']
    case 'order-entry':
      return ['order']
    case 'order-list':
      return ['order']
    default:
      return []
  }
}
</script>
