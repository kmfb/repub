import { AuthType } from "webdav";
import { ILocation } from "../viewer/[bookId]/types";

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
  location?: string;
  serverId: string;
  content: any;
}