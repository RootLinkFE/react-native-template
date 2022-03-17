/**
 * @author giscafer
 * @homepage http://giscafer.com
 * @created 2022-03-17 15:37:24
 * @description RN Http Adapter 实现类，解耦
 */

import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { Toast } from 'native-base';
import { BASE_URL, isMockMode } from 'src/config/constant';
import { getToken, saveToken, signOut, Token } from 'src/services/auth';
import { HttpAdapter } from './http-adapter';
import {
  ERR_MESSAGE_SHOW_DURATION,
  RES_PERMISSION_DENIED_CODE,
  RES_SUCCESS_DEFAULT_CODE,
  RES_UNAUTHORIZED_CODE,
} from './http-code';

export class RNHttpAdapterImp implements HttpAdapter {
  baseURL: string;
  constructor() {
    this.baseURL = BASE_URL;
  }

  async getToken<T = Token>(): Promise<T> {
    const token = await getToken();
    return token as T;
  }

  /**
   * 拦截器
   */
  interceptRequestConfig(instance: AxiosInstance) {
    instance.interceptors.request.use(
      async (config: any) => {
        const token = await this.getToken();
        if (token) {
          // ['X-Access-Token'] is a custom headers key
          config.headers.token = token;
        }
        config.headers['Content-Type'] = 'application/json';

        return config;
      },
      error => {
        this.handleErrorResponse(error);
      },
    );

    // response interceptor
    instance.interceptors.response.use(
      async (response: AxiosResponse<any>) => {
        return this.handleResponse(response);
      },
      error => {
        this.handleErrorResponse(error);
      },
    );
  }

  /**
   * 刷新token
   * @returns Promise<string>
   */
  async refreshToken(): Promise<string> {
    // 校验token
    const token = await this.getToken();

    let { accessToken = '', refreshToken, tokenExpireTime } = token;
    if (!isMockMode) {
      if (!token || !token?.accessToken) {
        this.handleLogout();
        return '';
      }
      // 判断当前日期是否晚于tokenExpireTime，如果是表示token已经过期，需要用refreshToken去换一个新的token
      if (dayjs().isAfter(dayjs(tokenExpireTime))) {
        const result = await fetch(
          `${this.baseURL}/auth/token/refresh?refreshToken=${refreshToken}`,
        ).then(response => response.json());
        const { data } = result;
        accessToken = data.accessToken;
        saveToken(data);
      }
    } else {
      // mock模式，造个token
      accessToken = 'fakeToken-xxxxx';
    }

    return accessToken;
  }

  handleLogout() {
    signOut();
  }

  handleResponse(response: AxiosResponse<any>) {
    const res = response.data || {};

    if (res.code === RES_SUCCESS_DEFAULT_CODE) {
      // 成功
      return res;
    } else if (res.code === RES_UNAUTHORIZED_CODE) {
      Toast.show({
        title: '提示',
        status: 'info',
        description: '您已经登出，您可以取消以停留在此页面，或再次登录',
        duration: ERR_MESSAGE_SHOW_DURATION,
      });
      this.handleLogout();
    } else if (res.code === RES_PERMISSION_DENIED_CODE) {
      // token不存在,请重新登录账户
      this.handleLogout();
    }

    this.handleErrorResponse(res);

    return Promise.reject(res.desc || res.message || 'Error');
  }

  handleErrorResponse(error: AxiosError & { desc: string }) {
    Toast.show({
      title: '提示',
      status: 'error',
      description: error.desc || error.message,
      duration: ERR_MESSAGE_SHOW_DURATION,
    });
    return Promise.reject(error);
  }
}
