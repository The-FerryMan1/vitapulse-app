<script setup lang="ts">
import HeadUlo from '@/components/HeadUlo.vue';
import SideNav from '@/components/SideNav.vue';
import type {alerts} from '@/types/types';

import { onBeforeUnmount, onMounted, provide, ref } from 'vue';

let ws: WebSocket | null = null;
const notif = ref<alerts[] | null>(null);
const setUpWebSocketConnection = () => {
    ws = new WebSocket('wss://vitapulse-api.onrender.com/api/auth/ws/notification');
    // ws = new WebSocket('ws://localhost:8888/api/auth/ws/notification');
    // ws = new WebSocket('ws://localhost:8888/api/auth/ws/notification');
    ws.onopen = (event) => {
        console.log('WebSocket connection established');
    }
    ws.onmessage = async (event) => {
        notif.value = JSON.parse(event.data);
    }

    ws.onclose = () => {
        console.log('Websocket connection has been closed')
    }
    ws.onerror = (error) => {
        console.log(error)
    }

    return ws
};

onMounted(async () => {
    setUpWebSocketConnection()
});

onBeforeUnmount(() => {
    ws?.close();
    ws = null;
});


provide('notif', notif)
</script>   

<template>
    <!-- Header with backdrop blur -->
    <header
        class="sticky top-0 backdrop-blur-[4px] bg-white/90 dark:bg-gray-800/80 p-4 transition-colors duration-300 z-50">
        <HeadUlo />
    </header>

    <!-- Main content with side navigation -->
    <main id="main" class="sm:flex-row flex flex-col justify-between h-[calc(100dvh-120px)] overflow-hidden">
        <!-- Sidebar Section -->
        <div
            class="flex sm:flex-row flex-col sm:w-[250px] w-full px-3 py-4 bg-white dark:bg-gray-800 transition-colors duration-300">
            <SideNav />
        </div>

        <!-- Main Content Section -->
        <div
            class="grow overflow-y-auto h-[calc(100dvh-120px)] bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <slot />
        </div>
    </main>
</template>
