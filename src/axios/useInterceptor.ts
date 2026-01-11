import { useAxios } from "./useAxios";

let refresh = false;

useAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error?.response?.status === 401 && !refresh) {
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
        refresh = false;
        // Redirect to login on refresh failure
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);