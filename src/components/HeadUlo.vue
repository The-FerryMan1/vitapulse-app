<script setup lang="ts">
import NavigationComp from './NavigationComp.vue'
import logo from '@/assets/imgs/vita-pulse.png' // Correct path
</script>

<template>
    <div class="flex items-center justify-end w-full p-2 z-50">
        <ULink to="/" class="me-auto flex items-center gap-1 sm:gap-3">
            <img :src="logo" alt="VitaPulse Logo" class="w-7.5 sm:w-12.5 object-contain" />
            <h1 class="text-sm sm:text-2xl font-bold text-red-500">VitaPulse</h1>
        </ULink>

        <NavigationComp />

    </div>
</template>
