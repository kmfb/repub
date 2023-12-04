import { AuthType } from "webdav";
import Page from "../viewer/[bookId]/components/Reader/types/pageType";

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
  location: Page;
  serverId: string;
  content: Blob;
}