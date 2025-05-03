<script setup lang="ts">
import HeadUlo from '@/components/HeadUlo.vue';
</script>

<template>

    <header class="sticky top-0 z-50 backdrop-blur-sm">
        <div class="ab"></div>
        <UContainer>
            <HeadUlo />
        </UContainer>

    </header>

    <main class="h-full" id="main">
        <div class="grow overflow-y-auto h-[calc(100vh)]">
            <slot></slot>
        </div>
    </main>
</template>