import { defineStore } from "pinia";
import { ref } from "vue";
import type { bpPulse } from "@/types/types";
import { setUpWebSocketConnection as wb } from "@/composables/websockets";

export const useRealtimeStore = defineStore("realtime", () => {
  const bpData = ref<bpPulse | null>(null);
  const isLoading = ref(true);
  let ws: WebSocket | null = null;

  const connect = () => {
    if (ws) return; // Already connected
    ws = wb("bp");
    ws.onopen = () => {
      console.log("BP WebSocket connected");
    };
    ws.onmessage = (event) => {
      try {
        const readings = JSON.parse(event.data);
        bpData.value = readings;
        isLoading.value = false;
      } catch (error) {
        console.error("WS parse error", error);
      }
    };
    ws.onclose = () => {
      console.log("BP WebSocket closed");
      ws = null;
    };
    ws.onerror = () => {
      console.error("BP WebSocket error");
    };
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
      ws = null;
    }
    bpData.value = null;
    isLoading.value = true;
  };

  const reconnect = () => {
    disconnect();
    connect();
  };

  return {
    bpData,
    isLoading,
    connect,
    disconnect,
    reconnect,
  };
});