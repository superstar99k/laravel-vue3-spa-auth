<script setup>
import AdminSideNav from '@/components/organisms/navigations/AdminSideNav.vue'
import HeaderNav from '@/components/organisms/headers/HeaderNav.vue'
</script>

<template>
  <AdminSideNav class="side-nav" />
  <div class="side-body">
    <HeaderNav />
    <main class="my-5 pt-2 px-3">
      <slot></slot>
    </main>
  </div>
</template>
