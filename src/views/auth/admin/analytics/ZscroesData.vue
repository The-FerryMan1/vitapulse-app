<script setup lang="ts">
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import adminLayout from '@/layouts/adminLayout.vue';
import ErrorComp from '@/components/ErrorComp.vue';
import { defineAsyncComponent, onMounted, ref, shallowRef, watch } from 'vue';
import { useBpStore } from '@/stores/UseBp';
import { useUserStore } from '@/stores/useUser';
import { useRouter, useRoute } from 'vue-router';
import ExportToCsv from '@/components/ExportToCsv.vue';
import type { TableDate, User } from '@/types/types';
import { useAxios } from '@/axios/useAxios';
import SelectMenu from '@/components/SelectMenu.vue';

const router = useRouter();
const route = useRoute();




const auth = useUserStore().auth;

const { getBp, getBpCustom } = useBpStore();

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
const customTo = ref<Date>(date);
const customFrom = ref<Date>(date);

watch(dateFilter, async () => {
    if (dateFilter?.value !== 'custom') {
        router.replace({ query: { filter: dateFilter.value } })

    }
})




const users = ref<User[] | null>(null);
const data = ref<TableDate[] | null>(null);
const selectedUser = ref<number>(0);

watch(selectedUser, () => {
    data.value = null
})

onMounted(async () => {
  router.replace({ query: { filter: 'daily' } });
  dateFilter.value = 'daily';
  
  if (dateFilter.value !== 'custom' && selectedUser.value !== 0) {
    try {
      const { data: bpPulsedata } = await useAxios.get(
        `/auth/admin/readings/z-scores/${selectedUser.value}?filter=${dateFilter.value}`
      );
      data.value = bpPulsedata;
    } catch (error) {
      data.value = null;
    }
  }

  if (users.value === null || users.value.length === 0) {
    try {
      const { data: user } = await useAxios.get('/auth/admin/users');
      users.value = user;
    } catch (error) {
      users.value = null;
    }
  }
});

const submitFilter = async () => {
  if (selectedUser.value === 0) return;

  if (dateFilter.value !== 'custom') {
    router.replace({ query: { filter: dateFilter.value } });
    try {
      const { data: bpPulsedata } = await useAxios.get(
        `/auth/admin/readings/z-scores/${selectedUser.value}?filter=${dateFilter.value}`
      );
      data.value = bpPulsedata;
    } catch (error) {
      data.value = null;
    }
    return;
  }

  if (dateFilter.value === 'custom') {
    if (customFrom.value && customTo.value) {
      const fromISO = new Date(customFrom.value).toISOString();
      const toISO = new Date(customTo.value).toISOString();
      
      router.replace({
        query: {
          filter: 'custom',
          from: fromISO,
          to: toISO
        }
      });
      
      try {
        const { data: bpPulsedata } = await useAxios.get(
          `/auth/admin/readings/z-scores/${selectedUser.value}?filter=custom&from=${fromISO}&to=${toISO}`
        );
        data.value = bpPulsedata;
      } catch (error) {
        data.value = null;
      }
      return;
    }
  }
};
</script>

<template>
    <adminLayout>
        <h1 class="text-2xl mx-2 my-10 font-bold self-start">Z-score</h1>
        <div class="flex gap-2 items-center">
            <label class="text-sm font-semibold p-2" for="">View z-scores:</label>
            <SelectMenu v-if="users" :data="users" v-model="selectedUser" />
        </div>

        <div v-if="selectedUser !== 0" class="flex gap-4 mt-3 px-3 items-end justify-start w-full">

            <!-- <ExportToCsv class="self-start me-auto"
                v-if="data?.length !== undefined && data?.length > 0 && auth && selectedUser !== 0" :Data="data"
                :name="auth?.id" /> -->
            <AsyncFilterComp v-model:filter="dateFilter" v-model:custom-from="customFrom" v-model:custom-to="customTo"
                class="self-end ms-auto " />
            <UButton class="shadow-xl" label="Apply Filter" @click="submitFilter" />
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
    </adminLayout>
</template>