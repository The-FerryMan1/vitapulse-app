<script setup lang="ts" generic="T">
import { computed, ref} from 'vue';
import type { TableColumn } from '@nuxt/ui';
import { getPaginationRowModel } from '@tanstack/vue-table';
import { useTemplateRef } from 'vue';
const props = defineProps<{
    data: T[],
    columnConfig: TableColumn<T>[]
}>()

const table = useTemplateRef('table');

const globalFilter = ref('')
const pagination = ref({
    pageIndex: 0,
    pageSize: 7
});

const columns = computed((): TableColumn<T>[] => {
    return props.columnConfig
});




const tableData = computed(() => {
    return props?.data;
})
</script>

<template>
    <div>
        <div class="flex py-3.5 -z-10 ">
            <UInput icon="i-lucide-search" v-model="globalFilter" class="w-full" placeholder="search..." />
        </div>
    </div>
    <UTable sticky v-model:pagination="pagination" v-model:global-filter="globalFilter" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
    }" ref="table" :data="tableData" :empty="'No data found'" :columns="columns"
        class="w-full bg-white  rounded-t-md shadow-md">
    </UTable>
    <div class="flex justify-end items-center border-t border-(--ui-border) pt-4">

        <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
    </div>
</template>