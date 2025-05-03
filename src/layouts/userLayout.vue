<script setup lang="ts">
import userSideBar from '../components/user/userSidebar.vue';
import HeadUlo from '@/components/HeadUlo.vue';
import SideNav from '@/components/SideNav.vue';


import { onBeforeMount, onBeforeUnmount, onMounted, provide, ref } from 'vue';

let ws: WebSocket | null = null;
const notif = ref([]);
const setUpWebSocketConnection = () => {
    ws = new WebSocket('ws://localhost:8888/api/auth/ws/notification');
    ws.onopen = (event) => {
        console.log('WebSocket connection established');
    }
    ws.onmessage = async (event) => {
        notif.value = JSON.parse(event.data);
        console.log(notif.value)
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
    <header class="sticky top-0 backdrop-blur-[4px] p-4">
        <HeadUlo />
    </header>

    <main id="main" class="sm:flex-row flex flex-col justify-between h-[calc(100vh-55px)] overflow-hidden">

        <div class="flex sm:flex-row flex-col  px-3 p-3">
            <SideNav />
        </div>

        <div class="grow overflow-y-auto  h-[calc(100vh-100px)]">
            <slot></slot>
        </div>

    </main>
</template>