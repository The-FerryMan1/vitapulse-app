<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { computed, inject, ref, toRef } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUser';
import DropdownMenu from './DropdownMenu.vue';
const { auth, userLogout } = useUserStore();
const router = useRouter();

const computedItems = computed(() => {

    console.log(auth)
    const items: DropdownMenuItem[] = [

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
    const items2: DropdownMenuItem[] = [

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
</script>

<template>
    <UDropdownMenu class="z-50" v-if="computedItems" :items="computedItems" :ui="{
        content: 'w-48'
    }">
        <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
    </UDropdownMenu>
</template>
