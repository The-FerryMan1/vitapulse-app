<script setup lang="ts">
import { computed, ref, h, resolveComponent, toRaw } from 'vue';
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { useTemplateRef } from 'vue';
import type { alerts } from '@/types/types';
import { useAxios } from '@/axios/useAxios';
import { useRouter } from 'vue-router';



const router = useRouter()
const UCheckbox = resolveComponent('UCheckbox');


const props = defineProps<{
    Data: alerts[]
}>();

const table = useTemplateRef('table');
const globalFilter = ref('')
const pagination = ref({
    pageIndex: 0,
    pageSize: 5
});

const columns = computed(() => {
    const columns: TableColumn<alerts>[] = [
          {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all'
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'aria-label': 'Select row'
      })
  },
        {
            accessorKey: 'message',
            header: 'Message',
            cell: ({ row }) => {
                const message = row.getValue('message') as string;
                const isRead = row.original.isRead;
                const isCritical = message.includes('Crisis') || message.includes('Anomaly');
                return h('div', {
                    class: `flex items-center gap-2 ${!isRead ? 'font-bold' : ''} ${isCritical ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'}`
                }, [
                    h('UIcon', {
                        name: isCritical ? 'i-lucide-alert-triangle' : 'i-lucide-info',
                        class: isCritical ? 'text-red-500' : 'text-blue-500'
                    }),
                    message
                ]);
            }
        },
        
        {
            accessorKey: 'isRead',
            header: 'Status',
            cell: ({ row }) => {
                const isRead = row.getValue('isRead') as boolean;
                return h('span', {
                    class: `px-2 py-1 rounded-full text-xs font-medium ${isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`
                }, isRead ? 'Read' : 'Unread');
            }
        },
        {
            accessorKey: 'timestamp',
            header: 'Timestamp',
            cell: ({ row }) => {
                const date = new Date(row.getValue('timestamp') as string);
                return h('span', { class: 'text-sm text-gray-500' }, date.toLocaleString());
            }
        },

    ]

    return columns
});


const alert_Datas = ref<alerts[]>(props.Data)
const deleteSelectedRow = async()=>{

    let data = [] as {id: number}[];

    table?.value?.tableApi?.getFilteredSelectedRowModel().rows.forEach(element => {
       data.push({id:toRaw(element.original.id)})
       
    });

    try {
        await  useAxios.post('/auth/alerts/delete', data)

        router.back();
    } catch (error) {
        console.error(error)
    }

}


const tableData = computed(() => {
    return alert_Datas.value
})
</script>

<template>
    <div>
        <div class="flex px-4 py-3.5  w-1/2 ">
            <UInput icon="i-lucide-search" v-model="globalFilter" class="w-full" placeholder="search..." />
        </div>  
    </div>

      <form @submit.prevent="deleteSelectedRow" class="flex justify-end items-center px-4 py-2" v-if="table?.tableApi?.getFilteredSelectedRowModel()?.rows?.length">
            
            <UButton type="submit" color="red" size="sm" icon="i-lucide-trash-2">
                Delete Selected
            </UButton>
        </form>

        
     <div class="px-4 py-3.5 border-t border-accented text-sm text-muted">
        {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
        {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
      </div>
    <UTable sticky v-model:pagination="pagination" v-model:global-filter="globalFilter" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
    }" ref="table" :data="tableData" :empty="'No data found'" :columns="columns" class="w-full">
    </UTable>
    <div class="flex justify-end items-center border-t border-default pt-4">

        <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
    </div>
</template>