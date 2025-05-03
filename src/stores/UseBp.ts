import {defineStore} from "pinia";
import { useAxios } from "@/axios/useAxios";

interface Readings {
    diastolic: number,
    id: number,
    status: string,
    systolic: number,
    bpStatus: string,
    pulseStatus: string,
    pulse: number,
    message: string,
    timestamp: string,
    user_id: number
};

export const useBpStore = defineStore('bp', ()=>{

    const postBp = async(systolic:number, diastolic:number, pulse:number, timeStamp:string)=>{
        try{
            const {data} = await useAxios.post('/auth/bp', 
                {
                    systolic,
                    diastolic,
                    pulse,
                    timeStamp,
                }
            );
            console.log(data);
            return
        }catch(error){
            console.log(error);
            return;
            
        }

    };

    const getBp = async(filter?:string)=>{
        try {
            const {data} = await useAxios.get(`/auth/bp?filter=${filter? filter: 'daily'}`);
            if(!data) throw new Error('No data found');
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    };

    const getBpCustom = async(from:string|undefined, to:string|undefined)=>{
        try {
            const { data } = await useAxios.get(`/auth/bp?from=${from}&to${to}`);
            if(!data) throw new Error('No data found');
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    };

    const analyzeBpTrend = async (sampleData: Readings[])=>{
        try {
            const { data } = await useAxios.post('/auth/analyze', { sampleData:sampleData });
             if(!data) throw new Error('No data to analyze');
             
             return data
        } catch (error) {
            console.log(error)
            return
        }
    };

    const getAlertsCustom = async (from: string | undefined, to: string | undefined) => {
        try {
            const { data } = await useAxios.get(`/auth/alerts?from=${from}&to${to}`);
            if (!data) throw new Error('No data found');
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    };

    const getAlerts = async (filter?: string)=>{
        try {
            const { data } = await useAxios.get(`/auth/alerts`);
            if (!data) throw new Error('No data found');
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    return {
        postBp,
        getBp,
        getBpCustom,
        analyzeBpTrend,
        getAlerts,
        getAlertsCustom
    };
})