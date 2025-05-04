import { useAxios } from '@/axios/useAxios';
import { useUserStore } from '@/stores/useUser';
import type { TableDate} from '@/types/types';
const { activiyLogs } = useUserStore();
export const exportCsv = async (filter:string, userid: number | string, ) => {

    try {
        const { data: res } = await useAxios.get(`/auth/bp/summary/${userid}?filter=${filter}`) 
        const data:TableDate[] = res
        const headers = Object.keys(data[0]).join(",") + "\n";

        const rows = data.map(row =>
            Object.values(row).join(",")
        ).join("\n");


        const csvContent = headers + rows;

        // Create a Blob from the CSV
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        // Create a temporary link to trigger download
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `table-${userid}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        await activiyLogs('Export data as CSV')
        return true
    } catch (error) {
        console.log(error)
        return false
    }

    
}
