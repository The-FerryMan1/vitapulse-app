<script setup lang="ts">
import { computed } from 'vue';

// Define Models
const filter = defineModel<string>('filter');
const customFrom = defineModel<string>('customFrom');
const customTo = defineModel<string>('customTo');

// Constraints
const today = new Date().toISOString().split('T')[0];
const filterOptions = ['all', 'hourly', 'daily', 'weekly', 'monthly', 'custom'];

/**
 * Formats the date range to look like "Jan 1 – 5" 
 * or "Jan 30 – Feb 2" if months differ.
 */
const formattedRange = computed(() => {
    if (filter.value !== 'custom' || !customFrom.value || !customTo.value) {
        return '';
    }

    // Use 'UTC' to prevent timezone shifting issues with YYYY-MM-DD strings
    const from = new Date(customFrom.value);
    const to = new Date(customTo.value);

    const monthOptions: Intl.DateTimeFormatOptions = { month: 'short', timeZone: 'UTC' };
    const dayOptions: Intl.DateTimeFormatOptions = { day: 'numeric', timeZone: 'UTC' };

    const fromMonth = from.toLocaleDateString('en-US', monthOptions);
    const fromDay = from.toLocaleDateString('en-US', dayOptions);
    const toMonth = to.toLocaleDateString('en-US', monthOptions);
    const toDay = to.toLocaleDateString('en-US', dayOptions);

    if (fromMonth === toMonth) {
        return `${fromMonth} ${fromDay} – ${toDay}`;
    }
    return `${fromMonth} ${fromDay} – ${toMonth} ${toDay}`;
});

// Fallback logic for filter selection
const filterFilter = computed(() => {
    return filterOptions.includes(filter.value || '') ? filter.value : 'all';
});
</script>

<template>
    <div class="flex flex-col gap-3">
        <div v-if="filter === 'custom' && formattedRange" 
             class="text-sm font-bold text-blue-600 dark:text-blue-400 px-1">
            Selected Range: {{ formattedRange }}
        </div>

        <div class="flex gap-2 flex-wrap justify-between items-center">
            <div v-if="filter === 'custom'" class="flex gap-2 flex-wrap items-center">
                <div class="flex items-center gap-2">
                    <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">From</label>
                    <input 
                        type="date" 
                        v-model="customFrom" 
                        :max="today"
                        class="p-2 rounded-md shadow-sm bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                </div>

                <div class="flex items-center gap-2">
                    <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">To</label>
                    <input 
                        type="date" 
                        v-model="customTo" 
                        :max="today"
                        class="p-2 rounded-md shadow-sm bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>

            <USelect
                class="shadow-xl text-black font-semibold z-10 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600"
                icon="i-lucide-funnel" 
                v-model="filter"
                :items="filterOptions" 
            />
        </div>
    </div>
</template>