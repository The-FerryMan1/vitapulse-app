<script setup lang="ts">
import type {User} from '@/types/types';

defineProps<{auth: User}>()
</script>

<template>
    <ul class="flex gap-5 flex-wrap">
        <li class="bg-white p-5 rounded-2xl shadow-md flex items-center gap-3">
            <UIcon name="i-lucide-circle-user" class="size-5" mode="svg" />
            <p>Name:</p>
            {{ auth.name }}
        </li>
        <li class="bg-white p-5 rounded-2xl shadow-md flex items-center gap-3">
            <UIcon name="i-lucide-monitor-smartphone" class="size-5" mode="svg" />
            <p>Device ID:</p>
            {{ auth.deviceId }}
        </li>
        <li class="bg-white p-5 rounded-2xl shadow-md flex items-center gap-3">
            <UIcon name="i-lucide-venus-and-mars" class="size-5" mode="svg" />
            <p>Sex:</p>
            {{ auth.sex }}
        </li>
        <li class="bg-white p-5 rounded-2xl shadow-md flex items-center gap-3">
            <UIcon name="i-lucide-calendar" class="size-5" mode="svg" />
            <p>Birthday:</p>
            {{ auth.birthday }}
        </li>
        <li class="bg-white p-5 rounded-2xl shadow-md flex items-center gap-3">
            <UIcon name="i-lucide-phone" class="size-5" mode="svg" />
            <p>Contact:</p>
            {{ auth.contact }}
        </li>
    </ul>
</template>