<script setup lang="ts">
import {
  onMounted,
  ref,
  defineAsyncComponent,
  computed,
  watch,
} from "vue";
import SkeletonLoader from "@/components/SkeletonLoader..vue";
import ErrorComp from "@/components/ErrorComp.vue";
import userLayout from "@/layouts/userLayout.vue";
import DataAssurance from "@/components/DataAssurance.vue";
import { useUserStore } from "@/stores/useUser";
import { useBpStore } from "@/stores/UseBp";
import { getBpAndPulseByAge } from "@/utils/BpByAge";
import type { User, bpPulse } from "@/types/types";
import { getTheAge } from "@/utils/getTheAge";
import { useToast } from "@nuxt/ui/runtime/composables/useToast.js";
import { useRealtimeStore } from "@/stores/useRealtime";

const toast = useToast();
const { getUser } = useUserStore();
const { postBp } = useBpStore();
const realtimeStore = useRealtimeStore();

const AsyncCardComp = defineAsyncComponent({
  loader: () => import("@/components/CardComp.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});
const AsyncPulseRateCard = defineAsyncComponent({
  loader: () => import("@/components/PulseRateCard.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});
const AsyncInforList = defineAsyncComponent({
  loader: () => import("@/components/InforList.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});

const AsyncPage = defineAsyncComponent({
  loader: () => import("@/views/auth/user/historicalData.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});

let lastSaved = Date.now();

const user = ref<User | null>(null);

onMounted(async () => {
  user.value = await getUser();
});

watch(
  () => realtimeStore.bpData,
  async (newData) => {
    if (newData && newData.diastolic !== 254 && newData.systolic !== 254 && newData.pulseRate !== 254) {
      const now = Date.now();
      if (now - lastSaved >= 3000) {
        const issaved = await postBp(
          newData.systolic,
          newData.diastolic,
          newData.pulseRate,
          newData.date,
        );
        if (issaved) {
          toast.add({
            title: "Saved",
            description: "Readings saved",
            color: "success",
          });
          lastSaved = now;
        } else {
          toast.add({
            title: "Skipped",
            description: "Data is already saved",
            color: "info",
          });
        }
      }
    }
  },
  { immediate: false }
);
</script>

<template>
  <userLayout>
    <UContainer class="py-4 px-2 w-full mt-4">
      <div v-if="user">
        <AsyncInforList :auth="user" />
      </div>

      <h1 class="text-3xl my-10 font-bold self-start">Real-time monitor</h1>
      <DataAssurance class="mb-4" />
      <div
        v-if="realtimeStore.isLoading && !realtimeStore.bpData"
        class="my-5 flex lg:flex-nowrap flex-wrap w-full gap-4"
      >
        <div class="w-full lg:w-1/2">
          <SkeletonLoader />
        </div>
        <div class="w-full lg:w-1/2">
          <SkeletonLoader />
        </div>
      </div>
      <div
        v-if="
          realtimeStore.bpData?.diastolic && realtimeStore.bpData?.systolic && realtimeStore.bpData?.pulseRate && user?.birthday
        "
        class="my-5 flex lg:flex-nowrap flex-wrap w-full gap-4"
      >
        <AsyncCardComp
          :bpAndPulse="{
            systolic: realtimeStore.bpData?.systolic,
            diastolic: realtimeStore.bpData?.diastolic,
            age: Number(getTheAge(String(user?.birthday))),
            pulse: realtimeStore.bpData?.pulseRate,
          }"
        />
        <AsyncPulseRateCard
          :PulseRate="{
            pulse_rate: realtimeStore.bpData.pulseRate,
            age: Number(getTheAge(String(user?.birthday))),
          }"
        />
      </div>
      <div
        v-else-if="!realtimeStore.isLoading"
        class="p-3 my-2 bg-amber-500 text-black rounded-sm shadow-sm flex items-center gap-5"
      >
        <div class="flex flex-col">
          <p class="text-lg font-semibold flex gap-3 items-center">
            <UIcon name="i-lucide-unplug" class="size-5" />Real-time connection
            lost
          </p>
          <ul class="list-item list-disc ms-15">
            <li class="">Check your internet connection</li>
            <li>Check your device</li>
          </ul>
        </div>

        <UButton
          @click="realtimeStore.reconnect"
          class="bg-amber-300 ms-auto text-black"
          icon="i-lucide-plug-zap"
          >Reconnect
        </UButton>
      </div>
    </UContainer>

    <UContainer>
      <AsyncPage />
    </UContainer>
  </userLayout>
</template>
