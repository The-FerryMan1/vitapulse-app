import axios from "axios";
import { useAxios } from "@/axios/useAxios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { getErrorMessage } from "@/utils/errorHandler";

interface User {
  id: number;
  role: string;
  email: string;
  age: number;
  isVerified: boolean;
}

export const useUserStore = defineStore("user", () => {
  const auth = ref<User | null>(null);
  const isVerified = ref<boolean>(false);

  const getUser = async () => {
    try {
      const { data } = await useAxios.get("/auth/user", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      // Error is handled silently - user might not be authenticated
      return null;
    }
  };

  const verify = async () => {
    if (isVerified.value) return;
    try {
      const response = await useAxios.get(`${import.meta.env.VITE_DOMAIN_NAME}/verify`, {
        withCredentials: true,
      });
      if (response.status === 401) throw new Error("unauthorized");
      isVerified.value = true;
      auth.value = response.data;

      return isVerified.value;
    } catch (error) {
      isVerified.value = false;
      auth.value = null;
      return isVerified.value;
    }
  };

  const refresh = async () => {
    if (isVerified.value) return;
    try {
      const { status, data } = await useAxios.get("/refresh", {
        withCredentials: true,
      });
      if (status === 401) throw new Error("Unauthorized");
      isVerified.value = true;
      auth.value = data;

      return isVerified.value;
    } catch (error) {
      isVerified.value = false;
      auth.value = null;
      return isVerified.value;
    }
  };

  const userLogout = async () => {
    try {
      await useAxios.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      isVerified.value = false;
      auth.value = null;
      return true;
    } catch (error) {
      // Even if logout fails, clear local state
      isVerified.value = false;
      auth.value = null;
      return false;
    }
  };

  const sendVerificationCode = async (email: string) => {
    if (!email) throw new Error("Email is required");
    try {
      await useAxios.post(
        "/email-verification",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return true;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const verifyToken = async (token: string | string[]) => {
    if (!token) throw new Error("Token is required");
    try {
      const { status } = await useAxios.get(`/email-verification/${token}`);

      if (status !== 200) throw new Error("Token verification failed");

      return true;
    } catch (error) {
      return false;
    }
  };

  const sendResetCode = async (email: string) => {
    if (!email) throw new Error("Email is required");
    try {
      await useAxios.post(
        "/password-reset",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return true;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const activiyLogs = async (activity: string) => {
    try {
      await useAxios.post(
        "/auth/user/logs",
        { activity },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return true;
    } catch (error) {
      // Activity logs are non-critical, fail silently
      return false;
    }
  };

  const getActivityLogs = async () => {
    try {
      const { data } = await useAxios.get("/auth/user/logs");
      return data;
    } catch (error) {
      return null;
    }
  };

  return {
    sendResetCode,
    getActivityLogs,
    activiyLogs,
    isVerified,
    verifyToken,
    auth,
    verify,
    userLogout,
    getUser,
    sendVerificationCode,
    refresh,
  };
});