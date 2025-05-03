<script setup lang="ts">
import defaultLayout from '@/layouts/defaultLayout.vue';
import { useUserStore } from '@/stores/useUser';
import { ref } from 'vue';

const {auth, sendVerificationCode, getUser} = useUserStore();
const isSent = ref(false);
const verify  = async()=>{
    let data = null
    try {
        data = await getUser()
    } catch (error) {
        console.log(error)
    }

    if (data){
        await sendVerificationCode(data?.email)
    }
     
}
</script>

<template>
    <defaultLayout>
        <small v-if="isSent">Verification code Sent</small>
        <div v-if="auth">Send verification code to {{ auth?.email }}</div>
        <UButton v-if="auth" @click="verify">Click to verify</UButton>
    </defaultLayout>
</template>