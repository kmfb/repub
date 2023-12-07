import { IServerFormData } from "../interface";
import queryString from "query-string";
import axios from "../lib/axios";
import { IFile } from "../components/FileList";
import { queryClient } from "../provider/react-query-provider";
import { getBookId } from "../utils";
import { AxiosProgressEvent } from "axios";

import progressStore from "../store/progressStore";

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
    fileSize: file.size,
    ...server,
  };
  const queryStr = queryString.stringify(query);

  return axios.get(`/book?${queryStr}`, {
    responseType: "blob",
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
      // console.log(progressEvent, "progressEvent");

      const store = progressStore;
      const state: any = store.getState();
      state.setBooks(getBookId(file, server), {
        ...progressEvent,
      });
    },
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