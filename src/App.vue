<script setup lang="ts">
import { useAppStore } from '@/stores/useApp'
const appStore = useAppStore()
</script>

<template>
    <UApp :toaster="{position: 'top-right'}">
        <UProgress v-if="appStore.isLoading" :value="100" :show-animation="true" :indeterminate="true" class="fixed top-0 left-0 right-0 z-50" />
        <RouterView />
    </UApp>
</template>