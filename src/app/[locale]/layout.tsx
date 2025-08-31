// src/app/[locale]/layout.tsx
import "../globals.css";
import Providers from "../providers";
import { LocaleProvider } from "@/context/LocaleContext";
import { LOCALES, Locale } from "@/lib/locale";
import type { ReactNode } from "react";

export function mapLocaleToHtmlLang(locale: Locale): string {
  return locale;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const htmlLang = mapLocaleToHtmlLang(locale);

  return (
    <html lang={htmlLang} className="page">
      <body>
        <Providers>
          <LocaleProvider locale={locale}>{children}</LocaleProvider>
        </Providers>
      </body>
    </html>
  );
}
