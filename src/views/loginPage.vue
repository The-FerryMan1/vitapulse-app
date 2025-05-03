<script setup lang="ts">
import userLayout from '@/layouts/userLayout.vue';
import FormGroupComp from '@/components/FormGroupComp.vue';
import errorMessage from '@/components/errorMessage.vue';
import {useAxios} from '@/axios/useAxios.ts';
import defaultLayout from '@/layouts/defaultLayout.vue'
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import { reactive, ref, watch } from 'vue';
import { useUserStore } from '@/stores/useUser';
import { useRouter } from 'vue-router';

const {verify} = useUserStore();
const router = useRouter();

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

interface errorType{
    response: {
        data:{
            message: string
        }
    }
} 

type Schema = z.infer<typeof schema>

const isLoading = ref<boolean>(false)
const errorMess = ref<string | null>(null);
const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined
})

watch(()=>state.email,  ()=>{
    errorMess.value = null
   
})

const toast = useToast()

const Submit = async(event:FormSubmitEvent<Schema>)=>{
    try {
        isLoading.value = true
        
       const {status} =  await useAxios.post('/login', {email:event.data.email, password:event.data.password}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(status !== 200) throw new Error('invalid credentials');
        toast.add({ title: 'Success', description: 'Welcome back!', color: 'success' })
           
        await verify();
        router.push({ name: 'dashboard' })
    
       
        return 
       
    } catch (error) {
        errorMess.value = (error as errorType)?.response?.data?.message
        toast.add({ title: 'Warining', description: 'Invalid credentials', color: 'warning' })
        console.log(error)
    }finally{
        isLoading.value = false
        state.password = undefined
    }
   
    
}
</script>

<template>
    <defaultLayout>
        <div class="flex justify-between items-center h-full w-full">
            <UForm :schema="schema" :state="state" @submit="Submit"
                class="sm:w-2/5 w-full sm:mx-30 justify-self-center flex flex-col justify-center items-center space-y-6 p-10 dark:bg-slate-800 bg-white   rounded-[8px] dark:border dark:border-gray-500">
                <div class="self-start text-3xl font-semibold gap-2 flex flex-col">
                    <h1>Login.</h1>
                    <small class="text-lg font-light">Welcome back!</small>
                </div>
                <errorMessage v-if="errorMess" :message="errorMess" />
                <FormGroupComp label="Email" name="email" required type="email" icon="i-lucide-mail"
                    placeholder="Enter your email" v-model="state.email" />
                <FormGroupComp label="Password" name="password" required type="password" icon="i-lucide-key-round"
                    placeholder="*******" v-model="state.password" />
                <div class="flex items-center self-start gap-3 justify-between w-full">
                    <div class="flex items-center self-start gap-3 justify-center">
                        <label for="" class="text-slate-400 md:text-base text-sm">Remember me</label>
                        <UCheckbox />
                    </div>

                    <div class="self-end">
                        <UButton loading-icon="i-lucide-loader-circle" :disabled="isLoading" :loading="isLoading"
                            type="submit" icon="i-lucide-log-in"
                            class="self-end md:text-base text-sm bg-red-500  w-full">
                            Sign in</UButton>
                    </div>
                </div>
                <div>
                    <a href="/register" class="underline text-blue-500">Create Account?</a>
                </div>


            </UForm>

            <div class="h-full relative sm:flex hidden">

                <div class="absolute w-full h-full flex flex-col justify-start items-center p-5">
                    <h1 class="font-bold text-5xl p-5  drop-shadow-2xl  text-white">"Check your pressure before it checks you."</h1>
                    <h1 class="font-bold text-3xl p-5 mt-60 justify-self-center text-white">VitaPulse</h1>
                    <h1 class="font-bold text-2xl px-5 text-center justify-self-center text-white">Your health companion
                        system — track your well-being</h1>
                </div>

                <img src="../assets/imgs/loginWallpaper.jpg" alt=""
                    class="h-[90%] w-full object-cover rounded-md aspect-square">
            </div>
        </div>
    </defaultLayout>
</template>