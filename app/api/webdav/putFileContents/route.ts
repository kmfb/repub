import { NextRequest, NextResponse } from "next/server";
import { AuthType, createClient } from "webdav";
import queryString from "query-string";
import { getClientConfigFromUrl, getConfigPath } from "@/app/utils";

import _ from "lodash";
import { successResponse, withErrorHandler } from "@/app/utils/api";
import { IServerFormData } from "@/app/interface";
export const dynamic = "force-dynamic"; // defaults to force-static

export interface IServerQueryObj
  extends Omit<IServerFormData, "protocol" | "host" | "port"> {
  url: string;
  path: string;
}

export const POST = withErrorHandler(async (request: NextRequest) => {
  const { url } = request;
  // JSON.parse("");
  const body = await request.json();
  const config = getClientConfigFromUrl(url);
  const client = createClient(config.url, _.omit(config, ["url"]));

  const upload = async () => {
    const json = JSON.stringify(body);

    const buffer = Buffer.from(json);
    const configFilePath = getConfigPath(config as any, "index-storage.json");
    const isSuccess = await client.putFileContents(configFilePath, buffer);

    return isSuccess;
  };

  const isSuccess = await upload();
  return successResponse({
    isSuccess,
  });
});
