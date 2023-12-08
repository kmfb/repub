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

function createBufferlikeFromJSON(jsonString: string) {
  const jsonData = JSON.parse(jsonString);
  if (typeof jsonData === "string") {
    return Buffer.from(jsonData); // for strings
  } else if (Array.isArray(jsonData)) {
    return Buffer.from(jsonData); // for arrays
  } else if (typeof jsonData === "object") {
    return Buffer.from(JSON.stringify(jsonData)); // for objects
  } else {
    throw new Error("Unsupported JSON data type");
  }
}

export async function uploadJsonToWebdav(
  obj: object,
  filename: string,
  webdavClient: WebDAVClient
): Promise<void> {
  const json = JSON.stringify(obj);
  debugger;

  const file = createBufferlikeFromJSON(json);

  try {
    await webdavClient.putFileContents(`/data/${filename}`, file);

    console.log("Upload successful!");
  } catch (error) {
    console.error("Upload failed", error);
  } finally {
  }
}