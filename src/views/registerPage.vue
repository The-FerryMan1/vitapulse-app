<script setup lang="ts">
import userLayout from '@/layouts/userLayout.vue';
import FormGroupComp from '@/components/FormGroupComp.vue';
import errorMessage from '@/components/errorMessage.vue';
import { useAxios } from '@/axios/useAxios.ts';
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import { reactive, ref, watch } from 'vue';
import defaultLayout from '@/layouts/defaultLayout.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const schema = z.object({
    deviceId: z.string().min(1),
    name: z.string().min(6).max(255),
    email: z.string().email(),
    birthday: z.string().date(),
    sex: z.string(),
    contact: z.string().min(11).max(12),
    password: z.string().min(8),
    confirm: z.string().min(8),
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
    deviceId: undefined,
    name: undefined,
    email: undefined,
    birthday: undefined,
    sex: undefined,
    contact: undefined,
    password: undefined,
    confirm: undefined,
})

watch(() => state.email, () => {
    errorMess.value = null

})

const toast = useToast()

const Submit = async (event: FormSubmitEvent<Schema>) => {
    try {
        isLoading.value = true

        await useAxios.post('/register', state, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        toast.add({ title: 'Success', description: 'Registration completed!', color: 'success' },)

        router.push({ name: 'login' })
        return

    } catch (error) {
        errorMess.value = (error as errorType)?.response?.data?.message
        console.log(error)
    } finally {
        isLoading.value = false
        state.password = undefined
        state.confirm = undefined
    }


}
</script>

<template>
    <defaultLayout>
        <div class="flex justify-between items-center h-full w-full">
            <UForm :schema="schema" :state="state" @submit="Submit"
                class="sm:w-2/5 w-full sm:mx-30 justify-self-center h-[80%] overflow-y-auto p-3  flex flex-col gap-3 ">
                <div class="self-start text-3xl font-semibold gap-2 flex flex-col">
                    <h1 class="">Register.</h1>
                    <small class="text-lg font-light">Fill out the form.</small>
                </div>
                <errorMessage v-if="errorMess" :message="errorMess" />
                <FormGroupComp label="Device Id" name="deviceId" required type="text" icon="i-lucide-monitor-smartphone"
                    placeholder="Enter your Name" v-model="state.deviceId" />

                <FormGroupComp label="Name" name="name" required type="text" icon="i-lucide-circle-user"
                    placeholder="Enter your Name" v-model="state.name" />

                <FormGroupComp label="Email" name="email" required type="email" icon="i-lucide-mail"
                    placeholder="Enter your valid email" v-model="state.email" />

                <FormGroupComp label="Birthday" name="birthday" required type="date" icon="i-lucide-calendar"
                    placeholder="Enter your Age" v-model="state.birthday" min="1" max="150" />

                <div class="w-full">
                    <label for="" class="text-semibold">Sex <span class="text-red-500">*</span></label>
                    <USelect icon="i-lucide-venus-and-mars" class="w-full" v-model="state.sex"
                        :items="['Male', 'Female']" />
                </div>


                <FormGroupComp label="Contact" name="contact" required type="text" icon="i-lucide-contact"
                    placeholder="Enter your contact number" v-model="state.contact" />


                <FormGroupComp label="Password" name="password" required type="password" icon="i-lucide-lock"
                    placeholder="Enter your password" v-model="state.password" />

                <FormGroupComp label="Confirm Password" name="confirm" required type="password"
                    icon="i-lucide-lock-keyhole" placeholder="Confirm your password" v-model="state.confirm" />

                <div class="flex items-center self-start gap-3 justify-end w-full">
                    <div class="self-end">
                        <UButton loading-icon="i-lucide-loader-circle" :disabled="isLoading" :loading="isLoading"
                            type="submit" icon="i-lucide-log-in"
                            class="self-end md:text-base text-sm bg-red-500  w-full">
                            Submit</UButton>
                    </div>
                </div>
                <div>
                    <a href="/register" class="underline text-blue-500">already have an account?</a>
                </div>


            </UForm>

            <div class="h-full relative sm:flex hidden">

                <div class="absolute w-full h-full flex flex-col justify-start items-center p-5">
                    <h1 class="font-bold text-5xl p-5  drop-shadow-2xl  text-white">"Check your pressure before it
                        checks you."</h1>
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