/**
 * 自定义请求的接口
 * 原因：后端的结构规范总会有不兼容swagger代码生成的情况
 */

import type { RequestParams } from './http-client';
import { ContentType, HttpClient } from './http-client';
import type { BaseResultOfboolean } from './Base/data-contracts';

export class CustomApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 上传元组数据
   *
   * @tags 元组数据
   * @name TupleDataUpload
   * @summary 上传元组数据
   * @request POST:/api/protocol/tuple-data/upload
   * @response `200` `BaseResultOfboolean` OK
   */
  tupleDataUpload = (
    query: { equipmentType: string; tupleType: 'PG' | 'SP' | 'SLOT' | 'SA' },
    data: { file: any },
    params: RequestParams = {},
  ) =>
    this.request<BaseResultOfboolean, any>({
      path: `/api/protocol/tuple-data/upload`,
      method: 'POST',
      query,
      body: data,
      format: 'blob',
      type: ContentType.FormData,
      ...params,
    });
}
