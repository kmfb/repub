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

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { url } = request;
  // JSON.parse("");
  const config = getClientConfigFromUrl(url);
  const client = createClient(config.url, _.omit(config, ["url"]));

  const buffer: any = await client.getFileContents(config.path);
  // const zip = new JSZip();
  // zip.file("file.epub", buffer); // add file buffer to zip
  // const blob = await zip.generateAsync({ type: "blob" });
  const blob = new Blob([buffer]);

  return new Response(blob, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=download.zip",
    },
  });
});
