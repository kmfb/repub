import { IServerQueryObj } from "../api/webdav/route";
import { IFile } from "../components/FileList";
import { IServerFormData } from "../interface";
import queryString from "query-string";
import { WebDAVClient } from "webdav";
const md5 = require("md5");
export const isHttps = (protocol: string) => {
  return protocol === "https";
};

export const getSeverId = (server: IServerFormData) => {
  if (!server) {
    return "";
  }
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

export const getClientConfigFromServer = (
  server: IServerFormData,
  path: string = "/"
) => {
  return {
    url: getSeverId(server),
    username: server.username,
    password: server.password,
    authType: server.authType,
    path: path,
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



export const blobToJson = (blob: any) => {
  return new Promise((resolve, reject) => {
    const reader: any = new FileReader();
    reader.onload = () => {
      resolve(JSON.parse(reader.result));
    };
    reader.onerror = reject;
    reader.readAsText(blob);
  });
};