<script setup lang="ts">
import { ref } from 'vue';



const model = defineModel<string | undefined | number>()
const show = ref(false)     
const {disable = false} = defineProps<{
    label: string,
    name: string,
    required: boolean,
    type: string,
    icon : string,                  
    placeholder: string,
    disable?: boolean
}>()
</script>

<template>
    <UFormField :label="label" :name="name" :required="required" class=" w-full">
        <UInput :type="type === 'password' ? (show ? 'text' : 'password') : type"
        :ui="{ trailing: 'pe-1' }" :disabled="disable" :icon="icon" :placeholder="placeholder" v-model="model" size="xl"
            class="w-full">
        
            <template #trailing>
            <UButton v-if="type === 'password'"
                color="neutral"
                variant="link"
                size="sm"
                :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="show ? 'Hide password' : 'Show password'"
                :aria-pressed="show"
                aria-controls="password"
                @click="show = !show"
      />
    </template>
        </UInput>
    </UFormField>
</template>

<style>
    /* Hide the password reveal button in Edge */
    ::-ms-reveal {
        display: none;
    }
    </style>