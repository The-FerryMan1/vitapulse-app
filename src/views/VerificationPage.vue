<script setup lang="ts">
import defaultLayout from '@/layouts/defaultLayout.vue';
import { useUserStore } from '@/stores/useUser';
import { ref } from 'vue';
import { useToast } from '@nuxt/ui/runtime/composables/useToast';
import { getErrorMessage } from '@/utils/errorHandler';

const { auth, sendVerificationCode, getUser } = useUserStore();
const toast = useToast();
const isSent = ref(false);
const isLoading = ref(false);

const verify = async () => {
  try {
    isLoading.value = true;
    const data = await getUser();

    if (data?.email) {
      await sendVerificationCode(data.email);
      isSent.value = true;
      toast.add({
        title: 'Success',
        description: 'Verification code sent to your email',
        color: 'success'
      });
    }
  } catch (error) {
    toast.add({
      title: 'Error',
      description: getErrorMessage(error),
      color: 'error'
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
    <defaultLayout>
        <!-- Verification Sent Message -->
        <div v-if="isSent" class="p-4 mb-4 bg-green-500 text-white text-center rounded-lg shadow-md">
            <p class="font-semibold">Verification Code Sent!</p>
        </div>

        <!-- Message displaying email to send the code to -->
        <div v-if="auth" class="mb-6 text-center">
            <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
                Send a verification code to <span class="text-blue-500">{{ auth?.email }}</span>
            </p>
        </div>

        <!-- Button to trigger the verification -->
        <div v-if="auth" class="flex justify-center">
            <UButton @click="verify" size="lg" color="primary"
                class="text-white bg-blue-500 hover:bg-blue-600 transition duration-200 rounded-lg p-3">
                Click to Verify
            </UButton>
        </div>
    </defaultLayout>
</template>