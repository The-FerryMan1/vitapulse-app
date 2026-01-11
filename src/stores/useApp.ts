import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const isLoading = ref(false);

  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  return {
    isLoading,
    setLoading,
  };
});