// src/server/queries/getAbout.ts
import { readSingleton } from "@directus/sdk";
import { directus } from "@/lib/directus";
import { DEFAULT_LOCALE, Locale } from "@/lib/locale";
import { About, AboutTranslation, LocalizedAbout } from "@/types/about";
import { withAboutTranslation } from "@/utils/aboutTranslations";
import {
  HasWorksMediaItemsJunction,
  normalizeWorksMediaItemsStrict,
} from "@/utils/media";

type RawAbout = Omit<About, "media_items" | "translations"> &
  HasWorksMediaItemsJunction & {
    translations?: AboutTranslation[] | null;
  };

export async function getAbout(
  locale: Locale = DEFAULT_LOCALE,
): Promise<LocalizedAbout | null> {
  try {
    const aboutRaw = (await directus.request(
      readSingleton("about", {
        fields: [
          "id",
          "title",
          "content",
          "description",
          "cover_image",
          { links: ["id", "label", "link"] },
          {
            media_items: [
              {
                directus_files_id: ["id", "type", "title", "description"],
              },
            ],
          },
          {
            translations: [
              "id",
              "languages_code",
              "title",
              "content",
              "description",
            ],
          },
        ],
      }),
    )) as RawAbout | null;

    if (!aboutRaw) return null;

    const about: About = {
      ...aboutRaw,
      media_items: normalizeWorksMediaItemsStrict(aboutRaw),
    };

    return withAboutTranslation(about, locale);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Directus getAbout error:", e);
    return null;
  }
}
