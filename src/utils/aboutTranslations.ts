import { About, LocalizedAbout } from "@/types/about";
import { Locale } from "@/lib/locale";
import { LOCALE_MAP } from "@/utils/localeMap";

export function withAboutTranslation(
  about: About,
  locale: Locale,
): LocalizedAbout {
  const langCode = LOCALE_MAP[locale]; // 'ru-RU' | 'fr-FR'
  const t = about.translations?.find((tr) => tr.languages_code === langCode);

  return {
    id: about.id,
    title: t?.title ?? about.title,
    description: t?.description ?? about.description,
    content: t?.content ?? about.content ?? null,
    cover_image: about.cover_image ?? null,
    sources: about.sources ?? null,
    media_items: about.media_items ?? null,
    isTranslated: Boolean(t),
  };
}
