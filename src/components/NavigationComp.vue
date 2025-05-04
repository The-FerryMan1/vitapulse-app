<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { computed, inject, ref, toRef } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUser';
import DropdownMenu from './DropdownMenu.vue';
const { auth, userLogout } = useUserStore();
const router = useRouter();

const computedItems = computed(() => {

    console.log(auth)
    const items: NavigationMenuItem[] = [

        [

            {
                label: 'Sign up',
                icon: 'i-heroicons-outline:user-add',
                to: 'register',
                class: 'sm:text-base text-sm'
            },
            {
                label: 'Sign in',
                icon: 'i-heroicons-outline:user-circle',
                to: '/login',
                class: 'sm:text-base text-sm'
            },
        ]

    ]
    const items2: NavigationMenuItem[] = [

        [
            {
                label: auth?.role === 'admin' ? 'admin' : 'dashboard',
                icon: 'i-lucide-layout-dashboard',
                to: { name: auth?.role === 'admin' ? 'admin' : 'dashboard' },
                class: 'sm:text-base text-sm'

            },
            
            {
                label: 'Settings',
                icon: 'i-lucide-settings',
                children: [
                    {
                        label: 'Profile',
                        icon: 'i-lucide-user-pen',
                        onSelect: async () => {
                            router.push({ name: 'settings' })
                        },
                    },
                    {
                        label: 'logout',
                        icon: 'i-lucide-log-out',
                        onSelect: async () => {
                            confirm('are you sure you want to log out?')

                            if (confirm()) {
                                await userLogout();
                                router.push({ name: 'login' })


                            }
                        },
                    }


                ]
            },
        ]

    ]
    return auth ? items2 : items
})

const isOpen = ref(false);

const notif: any = inject('notif');
</script>

<template>

    <UNavigationMenu arrow orientation="horizontal" variant="link" content-orientation="vertical" color="error"
        :items="computedItems" class="ms-auto sm:flex hidden">
    </UNavigationMenu>

    <UPopover v-if="auth" arrow mode="hover">
        <UButton icon="i-lucide-bell" label="" color="neutral" variant="link" />

        <template #content>

            <div class="p-4 z-[99999]">
                <div class="flex justify-between items-center">
                    <h1 class="font-semibold">Latest alert</h1>
                </div>


                <ul v-if="notif" class="mt-3 h-1/5 overflow-y-auto flex flex-col gap-2">
                    <li v-for="item, i in notif" :key="i"
                        class="flex flex-col gap-1 rounded-md p-2 w-[90%] bg-red-500 text-white">
                        <div class="flex justify-between items-center">
                            <h1 class="font-semibold text-wrap">{{ item?.message }}</h1>
                        </div>

                        <p class="text-light text-sm">{{ new Date(item.timestamp).toDateString() }}</p>
                    </li>


                </ul>
            </div>


        </template>
    </UPopover>
    <DropdownMenu class="sm:hidden flex z-[99999999] ms-1" />
</template>