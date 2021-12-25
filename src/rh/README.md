# 生成 swagger 接口代码

TypeScript 的 API 生成通过自研 `@roothub/cli` 来生成，生成的文件夹在 `src/rh/**` 之下。

安装工具包 `npm i @roothub/cli -g`

- `http-client.ts` 封装 Axios 请求拦截，生成 api 时不要覆盖，rh api 命令后边加 `-n` 默认不覆盖。

## 举例

```bash
rh api http://protocol-model-server.nc-qa.leekhub.com/frame-pmt/v2/api-docs?group=PROTOCOL%20SERVER%20protocol%20API -n

```
