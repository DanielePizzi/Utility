import http from "http";

export type TProxyRequestEvent = {
  method: string | undefined;
  path: string | undefined;
  headers: http.RequestOptions | undefined;
};
