import { ContentType, HttpClient } from '../rh/apis/http-client';

const httpClient = new HttpClient();

export const doGet = async (path: string, params: Record<string, any>) => {
  return httpClient.request<any, any>({
    path,
    method: 'GET',
    query: params,
  });
};

export const doPost = (
  path: string,
  param: Record<string, any>,
  params: Record<string, any>,
) =>
  httpClient.request<any, any>({
    path,
    method: 'POST',
    body: param,
    type: ContentType.Json,
    ...params,
  });
