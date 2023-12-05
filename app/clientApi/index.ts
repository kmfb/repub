import { IServerFormData } from "../interface";
import queryString from "query-string";
import axios from "../lib/axios";
import { IFile } from "../components/FileList";

export const getDirectoryContents = async (
  path: string,
  server: IServerFormData
) => {
  const query = {
    path,
    ...server,
  };
  const queryStr = queryString.stringify(query);
  return axios.get(`/webdav?${queryStr}`);
};

export const getFile = async (file: IFile, server: IServerFormData) => {
  const query = {
    path: file.filename,
    ...server,
  };
  const queryStr = queryString.stringify(query);
  return axios.get(`/book?${queryStr}`, {
    responseType: "blob",
  });
};

export const getFileDownloadUrl = (file: IFile, server: IServerFormData) => {
  const query = {
    path: file.filename,
    ...server,
  };
  const queryStr = queryString.stringify(query);
  return axios.get(`/book/download?${queryStr}`);
};

export const uploadFile = (json: any, server: IServerFormData) => {
  const query = {
    path: "/",
    ...server,
  };
  const queryStr = queryString.stringify(query);
  return axios.post(`/webdav/putFileContents?${queryStr}`, json);
};