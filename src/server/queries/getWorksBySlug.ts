// src/server/queries/getWorkBySlug.ts
import { readItems } from "@directus/sdk";
import { directus } from "@/lib/directus";
import { withTranslation } from "@/utils/workTranslation";
import { DEFAULT_LOCALE, Locale } from "@/lib/locale";
import { LocalizedWork, Work, WorkTranslation } from "@/types/work";
import {
  HasWorksMediaItemsJunction,
  normalizeWorksMediaItemsStrict,
} from "@/utils/media";

type RawWorkForSlug = Omit<Work, "media_items" | "translations"> &
  HasWorksMediaItemsJunction & {
    translations?: WorkTranslation[] | null;
  };

export async function getWorkBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<LocalizedWork | null> {
  const rows = (await directus.request(
    readItems("works", {
      limit: 1,
      filter: { slug: { _eq: slug } },
      fields: [
        "id",
        "title",
        "description",
        "slug",
        "shoot_date",
        "cover_image",
        {
          media_items: [
            {
              directus_files_id: ["id", "type", "title", "description"],
            },
          ],
        },
        { translations: ["id", "title", "description", "languages_code"] },
      ],
    }),
  )) as RawWorkForSlug[];

  const work = rows[0];
  if (!work) return null;

  const normalized: LocalizedWork = withTranslation(
    {
      ...work,
      media_items: normalizeWorksMediaItemsStrict(work),
    },
    locale,
  );

  return normalized;
}
