//src/lib/locale.ts

export const LOCALES = ["en", "ru", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const DIRECTUS_LOCALE_MAP = {
  en: "en-US",
  ru: "ru-RU",
  fr: "fr-FR",
} as const;
