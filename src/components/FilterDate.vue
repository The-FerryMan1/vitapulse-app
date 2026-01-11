<script setup lang="ts">

const filter = defineModel<string>('filter');
const customFrom = defineModel<string>('customFrom');
const customTo = defineModel<string>('customTo');

// Get today's date in YYYY-MM-DD format for max date constraint
const today = new Date().toISOString().split('T')[0];

</script>

<template>
    <div class="flex gap-2 flex-wrap justify-between items-center">

        <!-- Custom Date Range Filters -->
        <div v-if="filter === 'custom'" class="flex gap-2 flex-wrap justify-between items-center">
            <label for="" class="text-gray-800 dark:text-white">From:</label>
            <input type="date" v-model="customFrom" :max="today"
                class="p-2 rounded-md shadow-lg bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600" />

            <label for="" class="text-gray-800 dark:text-white">To:</label>
            <input type="date" v-model="customTo" :max="today"
                class="p-2 rounded-md shadow-lg bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600" />
        </div>

        <!-- Filter Dropdown -->
        <USelect
            class="shadow-xl text-black font-semibold z-10 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600"
            icon="i-lucide-funnel" v-model="filter"
            :items="['all', 'hourly', 'daily', 'weekly', 'monthly', 'custom']" />
    </div>
</template>
