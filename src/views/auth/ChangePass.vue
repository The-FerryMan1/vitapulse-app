<script setup lang="ts">
import FormGroupComp from '@/components/FormGroupComp.vue';
import errorMessage from '@/components/errorMessage.vue';
import { useAxios } from '@/axios/useAxios.ts';
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import {reactive, ref} from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();



const schema = z.object({
   Currentpassword: z.string().min(8),
   password: z.string().min(8),
   confirm: z.string().min(8)
}).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
}); 

interface errorType {
    response: {
        data: {
            message: string
        }
    }
}

type Schema = z.infer<typeof schema>

const isLoading = ref<boolean>(false)
const errorMess = ref<string | null>(null);
const state = reactive<Partial<Schema>>({
    Currentpassword: undefined,
    password: undefined,
    confirm: undefined
})


const toast = useToast()

const Submit = async (event: FormSubmitEvent<Schema>) => {
    try {
        isLoading.value = true

        const {status} = await useAxios.patch('/auth/user', state, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(status !== 200) throw new Error('Password do not match');
        toast.add({ title: 'Success', description: 'Password changed', color: 'success' })

        router.push({ name: 'settings' })
        return

    } catch (error) {
        toast.add({ title: 'Warning', description: 'Password do not match', color: 'warning' })
        errorMess.value = (error as errorType)?.response?.data?.message
        console.log(error)
    } finally {
        isLoading.value = false
        state.Currentpassword = undefined
        state.password = undefined
        state.confirm = undefined
    }


}
</script>

<template>
    <UContainer class="flex justify-start items-start  w-full">
        <UForm :schema="schema" :state="state" @submit="Submit"
            class="md:w-full flex flex-col mt-10  w-full overflow-y-auto justify-center items-center space-y-6 p-10 dark:bg-slate-800 bg-white shadow-2xl  rounded-[8px] dark:border dark:border-gray-500">
            <div class="self-start text-4xl font-semibold gap-2 flex flex-col">
                <h1 class="">Change password.</h1>
            </div>
            <errorMessage v-if="errorMess" :message="errorMess" />

            <FormGroupComp label="Current password" name="Currentpassword" required type="password" icon="i-lucide-lock"
                placeholder="************" v-model="state.Currentpassword" />

            <FormGroupComp label="Password" name="password" required type="password" icon="i-lucide-lock"
                placeholder="************" v-model="state.password" />

            <FormGroupComp label="Confirm Password" name="confirm" required type="password" icon="i-lucide-lock-keyhole"
                placeholder="************" v-model="state.confirm" />

            <div class="flex items-center self-start gap-3 justify-end w-full">
                <div class="self-end">
                    <UButton loading-icon="i-lucide-loader-circle" :disabled="isLoading" :loading="isLoading"
                        type="submit" class="self-end md:text-base text-sm bg-red-500  w-full">
                        Change password</UButton>
                </div>
            </div>


        </UForm>
    </UContainer>
</template>