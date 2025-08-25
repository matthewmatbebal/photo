//src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, Locale } from "@/lib/locale";

function getPreferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const candidate = header.split(",")[0]?.split("-")[0]?.toLowerCase();

  if (candidate === "ru") return "ru";
  if (candidate === "fr") return "fr";
  if (candidate === "en") return "en";

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // если путь уже начинается с локали — пропускаем
  if (
    LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  ) {
    return;
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
