import Config from 'react-native-config';

export const isMockMode = Config['isMock'];

export const baseURL = Config['BASE_URL'];

export const USER_INFO_KEY = '_rh_userAuthInfo';
export const TOKEN_KEY = '_rh_token';

// 业务 code，根据自己业务后端规范情况修改
export const REQ_RESEND_MAX_COUNT = 1;
export const REQ_RESEND_COUNT_EXCEED_CODE = 4000001;
export const REQ_RESEND_COUNT_EXCEED_MSG = '重发次数超出上限';
export const REQ_OVERTIME_DURATION = 10 * 1000;
export const RES_SUCCESS_DEFAULT_CODE = 200; // 处理成功
export const RES_NOT_FOUND_CODE = 3000; // 处理失败
export const RES_UNAUTHORIZED_CODE = 4010; // token过期
export const RES_PERMISSION_DENIED_CODE = 4100; // 权限不足
export const RES_INVALID_PARAMS_CODE = 4000; // 参数错误
export const RES_SECRET_INCORRECT_CODE = 4200; // 秘钥错误
export const RES_SERVER_EXCEPTION_CODE = 5000; // 服务器异常
export const ERR_MESSAGE_SHOW_DURATION = 3000; // 毫秒

// http code
export const codeMessage: Record<number, string> = {
  400: '请求参数错误，请检查',
  401: '您没有权限',
  403: '您访问的资源被禁止',
  404: '请求地址不存在',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};
