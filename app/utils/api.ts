import { NextRequest, NextResponse } from "next/server";
import { logError } from "../lib/winston";

function withErrorHandler(fn: any) {
  return async function (request: NextRequest, response: NextResponse) {
    try {
      return await fn(request, response);
    } catch (error: any) {
      // Log the error to a logging system
      logError({ error, requestBody: request.json(), location: fn.name });
      // Respond with a generic 500 Internal Server Error
      return new Response("Internal Server Error", { status: 500 });
    }
  };
}

function successResponse(data: any) {
  return NextResponse.json({
    data,
    status: "success",
    ts: Date.now(),
  });
}

export { withErrorHandler, successResponse };
