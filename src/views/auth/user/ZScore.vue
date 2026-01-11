<script setup lang="ts">
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import userLayout from '@/layouts/userLayout.vue';
import ErrorComp from '@/components/ErrorComp.vue';
import { defineAsyncComponent, onMounted, ref, shallowRef, watch } from 'vue';
import { useBpStore } from '@/stores/UseBp';
import { useUserStore } from '@/stores/useUser';
import { useRouter, useRoute } from 'vue-router';
import ExportToCsv from '@/components/ExportToCsv.vue';
import type { TableDate } from '@/types/types';

const router = useRouter();
const route = useRoute();




const auth = useUserStore().auth;

const { getBp, getBpCustom, analyzeBpTrend } = useBpStore();

const AsyncTableChart = defineAsyncComponent({
    loader: () => import('@/components/user/zscoreChart.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});
const AsyncTableComp = defineAsyncComponent({
    loader: () => import('@/components/user/zscoreTable.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});
const AsyncFilterComp = defineAsyncComponent({
    loader: () => import('@/components/FilterDate.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});



const dateFilter = ref<string | undefined>(route?.query?.filter?.toString() || 'daily');

const date = new Date();
const customTo = ref<string>(date.toISOString().split('T')[0]);
const customFrom = ref<string>(date.toISOString().split('T')[0]);

watch(dateFilter, async () => {
    if (dateFilter?.value !== 'custom') {
        router.replace({ query: { filter: dateFilter.value } })

    }

})




const data = ref<TableDate[] | null>(null);
onMounted(async () => {
  if (dateFilter.value !== 'custom') {
    data.value = await getBp(dateFilter.value);
  }
});


const submitFilter = async () => {
  if (dateFilter.value !== 'custom') {
    data.value = await getBp(dateFilter.value);
    router.replace({ query: { filter: dateFilter.value } });
    return;
  }

  if (dateFilter.value === 'custom') {
    if (customFrom.value && customTo.value) {
      // Convert date strings (YYYY-MM-DD) to ISO strings with time
      const fromDate = new Date(customFrom.value + 'T00:00:00.000Z');
      const toDate = new Date(customTo.value + 'T23:59:59.999Z');
      
      const fromISO = fromDate.toISOString();
      const toISO = toDate.toISOString();
      
      router.replace({
        query: {
          filter: 'custom',
          from: fromISO,
          to: toISO
        }
      });
      
      data.value = await getBpCustom(fromISO, toISO);
      return;
    }
  }
};
</script>

<template>
    <userLayout>
        <h1 class="text-2xl mx-2 my-10 font-bold self-start">Anomaly detection using z-score</h1>
        <div class="flex gap-4 mt-3 px-3 items-end justify-start w-full">
            <ExportToCsv class="self-start me-auto" v-if="data?.length !== undefined && data?.length > 0 && auth"
                :Data="data" :name="auth?.id" />
            <AsyncFilterComp v-model:filter="dateFilter" v-model:custom-from="customFrom" v-model:custom-to="customTo"
                class="self-end " />
            <UButton class="shadow-xl dark:text-white" label="Apply Filter" @click="submitFilter" />
        </div>
        <div class="w-full p-2">
            <AsyncTableChart v-if="data?.length !== undefined && data?.length > 0" :Data="data" />
            <div v-else>
                <p class="text-center">No data found</p>
            </div>
        </div>
        <div class="w-full p-2">
            <AsyncTableComp v-if="data?.length !== undefined && data?.length > 0" :Data="data" />
        </div>
    </userLayout>
</template>