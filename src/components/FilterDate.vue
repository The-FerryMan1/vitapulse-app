<script setup lang="ts">

const filter = defineModel<string>('filter');
const customFrom = defineModel<any>('customFrom');
const customTo = defineModel<any>('customTo');

</script>

<template>
    <div class="flex gap-2 flex-wrap justify-between items-center">


        <div v-if="filter === 'custom'" class="flex gap-2 flex-wrap justify-between items-center">
            <label for="">From:</label>
            <input type="date" v-model="customFrom" class="p-2  rounded-md shadow-lg" />
            <label for="">To:</label>
            <input type="date" v-model="customTo" class="p-2  rounded-md shadow-lg" />
        </div>
        <USelect class="shadow-xl text-black font-semibold z-10" icon="i-lucide-funnel" v-model="filter"
            :items="['hourly', 'daily', 'weekly', 'monthly', 'custom']" />


    </div>
</template>