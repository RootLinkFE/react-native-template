import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
} from 'axios';
import axios from 'axios';
import { Toast } from 'native-base';
import Config from 'react-native-config';
import { RhStorage } from 'src/lib/index';

const baseURL = Config['BASE_URL'];

export const USER_INFO_KEY = '_rh_userAuthInfo';
export const TOKEN_KEY = '_rh_token';

// request
export const REQ_RESEND_MAX_COUNT = 1;
export const REQ_RESEND_COUNT_EXCEED_CODE = 4000001;
export const REQ_RESEND_COUNT_EXCEED_MSG = '重发次数超出上限';
export const REQ_OVERTIME_DURATION = 10 * 1000;
export const RES_SUCCESS_DEFAULT_CODE = 2000; // 处理成功
export const RES_NOT_FOUND_CODE = 3000; // 处理失败
export const RES_UNAUTHORIZED_CODE = 4010; // token过期
export const RES_PERMISSION_DENIED_CODE = 4100; // 权限不足
export const RES_INVALID_PARAMS_CODE = 4000; // 参数错误
export const RES_SECRET_INCORRECT_CODE = 4200; // 秘钥错误
export const RES_SERVER_EXCEPTION_CODE = 5000; // 服务器异常
export const ERR_MESSAGE_SHOW_DURATION = 3000;

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

export interface IUserAuthInfo {
  expiredIn?: number;
  firstLogin?: boolean;
  token?: string;
}

export const setUserAuthInfo = (token: IUserAuthInfo) => {
  let tokenStr = '';
  try {
    tokenStr = JSON.stringify(token);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  RhStorage.setItem(USER_INFO_KEY, tokenStr);
  return token;
};

export const getUserAuthInfo = async (): Promise<IUserAuthInfo> => {
  const authInfoStr = await RhStorage.getItem(USER_INFO_KEY);
  let authInfo: IUserAuthInfo = {};

  if (!authInfoStr) return authInfo;

  try {
    authInfo = JSON.parse(authInfoStr);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return authInfo;
};

const HOURS = 60 * 60 * 1000;
const DAY = 24 * HOURS;
const WEEK = 7 * DAY;
const RefreshTokenUrl = '/api/base/user/refreshToken';

const goLogin = () => {
  /*  if (window.location.pathname !== '/user/login') {
    window.location.replace('/user/login');
  } */
};

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

    // request interceptor
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

        // 设置responseType='blob'后，后端就算是返回json也会被当成blob
        if (response.data instanceof Blob) {
          // 有这个header代表是真正的blob流
          if (response.headers['content-disposition']) {
            // downloadBlob(response);
            return response.data;
          }

          // 尝试解析JSON
          // RN 这里没必要
          try {
            const reader = new FileReader();
            reader.readAsText(response.data, 'utf-8');
            const data = await new Promise((resolve, reject) => {
              reader.onload = () => {
                try {
                  resolve(JSON.parse(reader.result as string));
                } catch (error) {
                  reject(error);
                }
              };
            });

            res = data;
          } catch (error) {
            Toast.show({
              title: '数据解析异常',
              status: 'error',
              duration: ERR_MESSAGE_SHOW_DURATION,
            });
            return Promise.reject();
          }
        }

        // if the custom code is not 2000, it is judged as an error.
        if (res.code !== RES_SUCCESS_DEFAULT_CODE) {
          if (res.code === RES_UNAUTHORIZED_CODE) {
            Toast.show({
              title: '提示',
              status: 'info',
              description: '您已经登出，您可以取消以停留在此页面，或再次登录',
              duration: ERR_MESSAGE_SHOW_DURATION,
            });
            setTimeout(() => {
              this.logout();
            }, 2000);
          } else if (res.code === RES_PERMISSION_DENIED_CODE) {
            // token不存在,请重新登录账户
            setTimeout(() => {
              this.logout();
            }, 1500);
          }
          Toast.show({
            title: '提示',
            status: 'error',
            description: res.desc || res.message,
            duration: ERR_MESSAGE_SHOW_DURATION,
          });
          // return new Error(res.desc || res.message || 'Error');
          return Promise.reject(res.desc || res.message || 'Error');
        }
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
    setUserAuthInfo({});
    goLogin();
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

  private refreshToken = () => {
    return this.instance.request({
      url: RefreshTokenUrl,
      method: 'GET',
    });
  };

  public cancelRequests() {
    this.cancellationToken.cancel('RequestCancellation');
    return new HttpClient();
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    // check token
    const authInfo: any = getUserAuthInfo();
    const expireTime = authInfo?.expiredIn || 0;
    const timeGap = new Date().getTime() - expireTime;
    if (timeGap >= WEEK) {
      this.logout();
    } else if (timeGap > 6 * DAY) {
      try {
        const info = (await this.refreshToken()) as IUserAuthInfo;
        setUserAuthInfo(info);
      } catch (e) {
        this.logout();
      }
    }

    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || void 0;

    const token: string = await RhStorage.getItem(TOKEN_KEY);

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
        ...(requestParams.headers || {}),
        token,
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}
