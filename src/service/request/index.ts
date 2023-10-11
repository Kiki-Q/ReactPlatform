import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { HYRequestInterceptors, HYRequestConfig } from './types';

class HYRequest {
  instance: AxiosInstance;

  interceptors?: HYRequestInterceptors;

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }

  request(config: AxiosRequestConfig) {
    this.instance.request(config).then((res) => {
      console.log(res);
    });
  }
}

export default HYRequest;
