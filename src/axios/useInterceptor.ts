import { useAxios } from "./useAxios";

let refresh = false;

useAxios.interceptors.response.use(
  (res) => {
    console.log("Interceptor passed response with status:", res.status);
    return res;
  },
  async (error) => {
    console.log("Interceptor caught an error:", error?.response?.status);
    if (error?.response?.status === 401 && !refresh) {
      console.log("Access token expired, attempting to refresh...");
      refresh = true;
      try {
        const { status } = await useAxios.post(
          "/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        if (status === 200) {
          refresh = false;
          return useAxios(error.config);
        }
      } catch (refreshError) {
      
        return Promise.reject(refreshError);
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);