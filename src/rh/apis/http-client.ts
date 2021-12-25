import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
} from 'axios';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { Toast } from 'native-base';
import dayjs from 'dayjs';
import { RhStorage } from 'src/lib/index';
import { getToken, saveToken, signOut } from 'src/services/auth';
import {
  baseURL,
  ERR_MESSAGE_SHOW_DURATION,
  isMockMode,
  RES_PERMISSION_DENIED_CODE,
  RES_SUCCESS_DEFAULT_CODE,
  RES_UNAUTHORIZED_CODE,
  TOKEN_KEY,
} from '../constant';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

const goLogin = () => {};
export class HttpClient<SecurityDataType = unknown> {
  private instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;
  config: AxiosRequestConfig = {};

  private cancellationToken = axios.CancelToken.source();

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL,
    });

    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;

    this.cancellationToken = axios.CancelToken.source();
    this.config.cancelToken = this.cancellationToken.token;
    this.interceptRequestConfig();
  }
  /**
   * 请求和响应拦截
   */
  private interceptRequestConfig() {
    this.instance.interceptors.request.use(
      async (config: any) => {
        const token = await RhStorage.getItem(TOKEN_KEY);
        if (token) {
          // ['X-Access-Token'] is a custom headers key
          config.headers.token = token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // response interceptor
    this.instance.interceptors.response.use(
      async (response: AxiosResponse<any>) => {
        let res: any = response.data;
        // TODO(删掉): demo 接口专门mock写法
        if (res.results) {
          return res;
        }

        if (res.code !== RES_SUCCESS_DEFAULT_CODE) {
          return this.errorHandler(res);
        }

        // 列表分页
        if (res.number && res.size) {
          return res;
        }

        return res.data;
      },
      error => {
        Toast.show({
          title: '提示',
          status: 'error',
          description: error.desc || error.message,
          duration: ERR_MESSAGE_SHOW_DURATION,
        });

        return Promise.reject(error);
      },
    );
  }

  private logout() {
    signOut();
    setTimeout(() => {
      goLogin();
    }, 1500);
  }

  private mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private errorHandler(res: any) {
    // 如果接口返回不是成功编码
    if (res.code === RES_UNAUTHORIZED_CODE) {
      Toast.show({
        title: '提示',
        status: 'info',
        description: '您已经登出，您可以取消以停留在此页面，或再次登录',
        duration: ERR_MESSAGE_SHOW_DURATION,
      });
      this.logout();
    } else if (res.code === RES_PERMISSION_DENIED_CODE) {
      // token不存在,请重新登录账户
      this.logout();
    }
    Toast.show({
      title: '提示',
      status: 'error',
      description: res.desc || res.message,
      duration: ERR_MESSAGE_SHOW_DURATION,
    });

    return Promise.reject(res.desc || res.message || 'Error');
  }

  public cancelRequests() {
    this.cancellationToken.cancel('RequestCancellation');
    return new HttpClient();
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  /**
   * 请求入口
   * @param
   * @returns Promise<T>
   */
  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<any> => {
    // 校验token
    const token = await getToken();
    const { accessToken = '', refreshToken, tokenExpireTime } = token;

    if (!isMockMode) {
      if (isEmpty(token)) {
        return this.logout();
      }
      // 判断当前日期是否晚于tokenExpireTime，如果是表示token已经过期，需要用refreshToken去换一个新的token
      if (dayjs().isAfter(dayjs(tokenExpireTime))) {
        const result = await fetch(
          `${baseURL}/auth/token/refresh?refreshToken=${refreshToken}`,
        ).then(response => response.json());
        const { data } = result;
        saveToken(data);
      }
    }

    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || void 0;

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
        ...(requestParams.headers || {}),
        token: accessToken,
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}
