import { AuthType } from "webdav";

export interface IServerFormData {
  id?: string;
  authType: AuthType;
  protocol: "http" | "https";
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface IBook {
  id: string;
  name: string;
  progress: number;
  serverId: string;
  content: Blob;
}