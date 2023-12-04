import { IServerQueryObj } from "../api/webdav/route";
import { IFile } from "../components/FileList";
import { IServerFormData } from "../interface";
import queryString from "query-string";
const md5 = require("md5");
export const isHttps = (protocol: string) => {
  return protocol === "https";
};

export const getSeverId = (server: IServerFormData) => {
  return `${server.protocol}://${server.host}:${server.port}`;
};
export const getClientConfigFromUrl: (url: string) => IServerQueryObj = (
  url: string
) => {
  const parsed = queryString.parseUrl(url);
  const { query } = parsed;
  return {
    url: getSeverId(query as any),
    username: query.username as string,
    password: query.password as string,
    authType: query.authType as any,
    path: query.path as string,
  };
};

export const getBookId = (file: IFile, server: IServerFormData) => {
  const id = `${getSeverId(server)}${file.filename}${file.lastmod}`;
  return md5(id);
};

export const getFileNameByPath = (path: string) => {
  const arr = path.split("/");
  return arr[arr.length - 1];
};