<script setup>
import Default from '@/views/layouts/Default.vue'
import PageTitle from '@/components/atoms/titles/PageTitle.vue'
</script>

<template>
  <Default>
    <div class="container-fluid mw-sm">
      <PageTitle class="mb-5 mt-5 fs-3 text-center"
        >パスワードをリセットする</PageTitle
      >
      <p class="text-center">パスワード再設定用のメールが送信されました。</p>
    </div>
  </Default>
</template>
