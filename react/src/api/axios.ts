import axios from "axios";

/**
 * 二次封装 axios
 * 
 * @param axiosConfig 配置项
 * @returns axios 实例
 */
export function myAxios(axiosConfig: any) {
  const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000
  });
  return service(axiosConfig);
}
