import { NextRequest, NextResponse } from "next/server";
import { AuthType, createClient } from "webdav";
import queryString from "query-string";
import { getClientConfigFromUrl } from "@/app/utils";

import _ from "lodash";
import withErrorHandler from "@/app/utils/api";
export const dynamic = "force-dynamic"; // defaults to force-static

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { url } = request;
  JSON.parse("");
  const config = getClientConfigFromUrl(url);
  const client = createClient(config.url, _.omit(config, ["url"]));

  const getDirectoryItems = async () => {
    const directoryItems = await client.getDirectoryContents("/");
    console.log(directoryItems, "directoryItems");

    return directoryItems;
  };

  const dItems = await getDirectoryItems();
  return NextResponse.json(dItems);
});
