//src/utils/localeMap.ts
import { Language } from "@/types/language";

export type UiLocale = "en" | "ru" | "fr";

export const LOCALE_MAP: Record<UiLocale, Language["code"]> = {
  en: "en-US",
  ru: "ru-RU",
  fr: "fr-FR",
};
