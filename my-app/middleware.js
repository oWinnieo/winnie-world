import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-next-url", url.pathname); // 把 pathname 传给 Server Component

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}