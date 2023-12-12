import { NextRequest, NextResponse } from "next/server";
import { AuthType, createClient } from "webdav";
import queryString from "query-string";
import { getClientConfigFromUrl } from "@/app/utils";

import _ from "lodash";
import { successResponse, withErrorHandler } from "@/app/utils/api";
import { IServerFormData } from "@/app/interface";
import { readFileSync } from "fs";
import JSZip from "jszip";
let fs = require("fs");
export const dynamic = "force-dynamic"; // defaults to force-static

export interface IServerQueryObj
  extends Omit<IServerFormData, "protocol" | "host" | "port"> {
  url: string;
  path: string;
}
var blobStream = require("blob-stream");
export const GET = withErrorHandler(
  async (request: NextRequest, response: NextResponse) => {
    const { headers, url } = request;
    // JSON.parse("");
    const parsed = queryString.parseUrl(url);
    const { query } = parsed;
    const config = getClientConfigFromUrl(url);
    const client = createClient(config.url, _.omit(config, ["url"]));

    const fileStream = client.createReadStream(config.path);
    const fileSize = query.fileSize ? query.fileSize : null;
    return new Response(fileStream as any, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=download.zip",
        ...(fileSize && {
          "Content-Length": fileSize as string,
        }),
      },
    });
  }
);
