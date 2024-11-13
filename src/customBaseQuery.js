// src/customBaseQuery.js
import axiosInstance from "./lib/axios/AxiosConfig";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, notification }) => {
    try {
      // Выполняем запрос с использованием настроенного axiosInstance
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        notification, // Пропускаем notification для обработки в интерцепторе
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;