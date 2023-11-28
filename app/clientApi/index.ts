import { IServerFormData } from "../interface";
import queryString from "query-string";
import axios from "../lib/axios";

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
