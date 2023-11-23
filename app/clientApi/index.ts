import axios from "axios";
import { IServerFormData } from "../interface";
import queryString from "query-string";

export const getDirectoryContents = async (
  path: string,
  server: IServerFormData
) => {
  const query = {
    path,
    ...server,
  };
  const queryStr = queryString.stringify(query);
  return axios.get(`/api/webdav?${queryStr}`);
};
