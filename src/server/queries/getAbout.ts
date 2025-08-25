import { readSingleton } from "@directus/sdk";
import { directus } from "@/lib/directus";
import { DEFAULT_LOCALE, Locale } from "@/lib/locale";
import { About, LocalizedAbout } from "@/types/about";
import { withAboutTranslation } from "@/utils/aboutTranslations";

export async function getAbout(
  locale: Locale = DEFAULT_LOCALE,
): Promise<LocalizedAbout | null> {
  try {
    const about = await directus.request<About>(
      readSingleton("about", {
        fields: [
          "id",
          "title",
          "content",
          "description",
          "cover_image",
          { sources: ["id", "label", "link"] },
          { media_items: ["id", "caption", { file: ["id", "type"] }] },
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
    );
    if (!about) return null;
    return withAboutTranslation(about, locale);
  } catch (e) {
    console.error("Directus getAbout error:", e);
    return null;
  }
}
