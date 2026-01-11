import { defineStore } from "pinia";
import { useAxios } from "@/axios/useAxios";
import { getErrorMessage } from "@/utils/errorHandler";

interface Readings {
  diastolic: number;
  id: number;
  status: string;
  systolic: number;
  bpStatus: string;
  pulseStatus: string;
  pulse: number;
  message: string;
  timestamp: string;
  user_id: number;
}

export const useBpStore = defineStore("bp", () => {
  const postBp = async (
    systolic: number,
    diastolic: number,
    pulse: number,
    timestamp: string
  ): Promise<boolean> => {
    try {
      const { data } = await useAxios.post("/auth/bp", {
        systolic,
        diastolic,
        pulse,
        timestamp,
      });

      if (data?.message?.includes("Same data")) return false;
      return true;
    } catch (error) {
      return false;
    }
  };

  const getBp = async (filter?: string) => {
    try {
      const filterValue = filter || "all";
      const { data } = await useAxios.get(
        `/auth/bp?filter=${encodeURIComponent(filterValue)}`
      );
      if (!data) return null;
      return data;
    } catch (error) {
      return null;
    }
  };

  const getBpCustom = async (
    from: string | undefined,
    to: string | undefined
  ) => {
    try {
      const { data } = await useAxios.get(
        `/auth/bp?filter=custom&from=${encodeURIComponent(from || '')}&to=${encodeURIComponent(to || '')}`
      );
      if (!data) return null;
      return data;
    } catch (error) {
      return null;
    }
  };

  const analyzeBpTrend = async (sampleData: Readings[]) => {
    try {
      const { data } = await useAxios.post("/auth/analyze", {
        sampleData,
      });
      if (!data) return null;
      return data;
    } catch (error) {
      return null;
    }
  };

  const getAlertsCustom = async (
    from: string | undefined,
    to: string | undefined
  ) => {
    try {
      const { data } = await useAxios.get(`/auth/alerts?from=${from}&to=${to}`);
      if (!data) return null;
      return data;
    } catch (error) {
      return null;
    }
  };

  const getAlerts = async () => {
    try {
      const { data } = await useAxios.get("/auth/alerts");
      if (!data) return null;
      return data;
    } catch (error) {
      return null;
    }
  };

  return {
    postBp,
    getBp,
    getBpCustom,
    analyzeBpTrend,
    getAlerts,
    getAlertsCustom,
  };
});
