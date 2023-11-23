import { IServerFormData } from "../interface";

export const isHttps = (protocol: string) => {
  return protocol === "https";
};

export const getSeverId = (server: IServerFormData) => {
  return `${server.protocol}://${server.host}:${server.port}`;
};
