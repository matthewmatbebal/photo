import React from "react";
import Link from "next/link";
import { LOCALES, Locale } from "@/lib/locale";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ru" || value === "fr";
}

export function getCurrentLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return isLocale(seg) ? seg : "en";
}

export function swapLocaleInPath(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  if (isLocale(segments[1])) {
    segments[1] = target;
    const next = segments.join("/");
    return next || `/${target}`;
  }
  const rest = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${target}${rest === "/" ? "" : rest}`;
}

export function buildLocaleHref(locale: Locale, subpath?: string): string {
  const clean = (subpath ?? "").replace(/^\/+/, "");
  return `/${locale}${clean ? `/${clean}` : ""}`;
}

export function renderLocaleSwitcher(
  pathname: string,
  onLinkClick?: () => void,
): React.ReactNode {
  return LOCALES.map((l, i) => (
    <React.Fragment key={`locale-${l}`}>
      <Link href={swapLocaleInPath(pathname, l)} onClick={onLinkClick}>
        {l.toUpperCase()}
      </Link>
      {i < LOCALES.length - 1 ? <span aria-hidden="true">/</span> : null}
    </React.Fragment>
  ));
}
