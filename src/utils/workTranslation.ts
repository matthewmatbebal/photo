//src/utils/workTranslation.ts

import { Locale, DEFAULT_LOCALE, DIRECTUS_LOCALE_MAP } from "@/lib/locale";
import { LocalizedWork, Work } from "@/types/work";

export function withTranslation(
  work: Work,
  locale: Locale = DEFAULT_LOCALE,
): LocalizedWork {
  // Если английский язык, используем базовые поля
  if (locale === DEFAULT_LOCALE) {
    return {
      ...work,
      isTranslated: true,
    };
  }

  const directusCode = DIRECTUS_LOCALE_MAP[locale];
  const translation = work.translations?.find(
    (t) => t.languages_code === directusCode,
  );

  if (translation) {
    return {
      ...work,
      title: translation.title,
      description: translation.description || work.description,
      isTranslated: true,
    };
  }

  return {
    ...work,
    isTranslated: false,
  };
}
