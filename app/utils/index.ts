import { IServerFormData } from "../interface";
import queryString from "query-string";
export const isHttps = (protocol: string) => {
  return protocol === "https";
};

export const getSeverId = (server: IServerFormData) => {
  return `${server.protocol}://${server.host}:${server.port}`;
};
export const getClientConfigFromUrl = (url: string) => {
  const parsed = queryString.parseUrl(url);
  const { query } = parsed;
  return {
    url: getSeverId(query as any),
    username: query.username as string,
    password: query.password as string,
    authType: query.authType as any,
  };
}