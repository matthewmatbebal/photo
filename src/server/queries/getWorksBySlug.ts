// src/server/queries/getWorkBySlug.ts
import { readItems } from "@directus/sdk";
import { directus } from "@/lib/directus";
import { withTranslation } from "@/utils/workTranslation";
import { DEFAULT_LOCALE, Locale } from "@/lib/locale";
import { LocalizedWork } from "@/types/work";

export async function getWorkBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<LocalizedWork | null> {
  const rows = await directus.request(
    readItems("works", {
      limit: 1,
      fields: [
        "id",
        "title",
        "description",
        "slug",
        "shoot_date",
        "cover_image",
        {
          media_items: ["id", "caption", { file: ["id", "type"] }],
        },
        {
          translations: ["id", "title", "description", "languages_code"],
        },
      ],
      filter: {
        slug: { _eq: slug },
      },
    }),
  );

  const work = rows[0];
  return work ? withTranslation(work, locale) : null;
}
