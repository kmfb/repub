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
