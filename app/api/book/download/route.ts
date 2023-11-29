import { NextRequest, NextResponse } from "next/server";
import { AuthType, createClient } from "webdav";
import queryString from "query-string";
import { getClientConfigFromUrl } from "@/app/utils";

import _ from "lodash";
import { successResponse, withErrorHandler } from "@/app/utils/api";
import { IServerFormData } from "@/app/interface";
import { readFileSync } from "fs";
let fs = require("fs");
export const dynamic = "force-dynamic"; // defaults to force-static

export interface IServerQueryObj
  extends Omit<IServerFormData, "protocol" | "host" | "port"> {
  url: string;
  path: string;
}

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { url } = request;
  // JSON.parse("");
  const config = getClientConfigFromUrl(url);
  const client = createClient(config.url, _.omit(config, ["url"]));

  const dUrl: any = client.getFileUploadLink(config.path);
  // Write stream to a file

  return successResponse(dUrl);
});
