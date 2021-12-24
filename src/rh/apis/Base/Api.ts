import type {
  BaseResultOfboolean,
  BaseResultOfUserResp,
} from './data-contracts';
import type { RequestParams } from '../http-client';
import { ContentType, HttpClient } from '../http-client';

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 用户管理
   * @name UserGetUserInfo
   * @summary getCharacters
   * @request GET:/character
   * @response `200` `BaseResultOfUserResp` OK
   */
  getCharacters = (params: RequestParams = {}) =>
    this.request<BaseResultOfUserResp, any>({
      path: `/character`,
      method: 'GET',
      ...params,
    });
  /**
   * @description password字段要经过rsa加密, 再进行base64编码，公钥为：MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCW3fQpZiXmj7+OnwtvtxYA353AEqW9LA2TvCqWNNdMRtaEIgbmV6qYQE+Osy/M0J+tdRwazA4DWKt8qPkcKUKPynMiTWIGePMHj8J6DCnqP2zmOo5QRQN2YMVLC0cA2bOiZt84Loc+sYctTZAdWKukf1+SzZe+aYS/Snw73mxA7QIDAQAB
   *
   * @tags 用户管理
   * @name UserLogin
   * @summary 登录
   * @request POST:/api/base/user/login
   * @response `200` `any` OK
   */
  userLogin = (param: any, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/base/user/login`,
      method: 'POST',
      body: param,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 用户管理
   * @name UserLogout
   * @summary 登出
   * @request GET:/api/base/user/logout
   * @response `200` `BaseResultOfboolean` OK
   */
  userLogout = (params: RequestParams = {}) =>
    this.request<BaseResultOfboolean, any>({
      path: `/api/base/user/logout`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 用户管理
   * @name UserRefreshToken
   * @summary 刷新token
   * @request GET:/api/base/user/refreshToken
   * @response `200` `any` OK
   */
  userRefreshToken = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/base/user/refreshToken`,
      method: 'GET',
      ...params,
    });
}
