import { AuthType } from "webdav";

export interface IServerFormData {
  authType: AuthType;
  protocol: "http" | "https";
  host: string;
  port: number;
  username: string;
  password: string;
}
