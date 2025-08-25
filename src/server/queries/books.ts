// src/server/queries/books.ts
import { readItems } from "@directus/sdk";
import { directus } from "@/lib/directus";
import { DEFAULT_LOCALE, Locale } from "@/lib/locale";
import { withTranslation } from "@/lib/translations";
import { Book, LocalizedBook } from "@/types/book";

export async function getBooks(
  locale: Locale = DEFAULT_LOCALE,
): Promise<LocalizedBook[]> {
  const rows = await directus.request(
    readItems("books", {
      fields: [
        "id",
        "status",
        "slug",
        "title",
        "description",
        "cover_image",
        {
          translations: ["id", "title", "description", "languages_code"],
        },
      ],
      filter: {
        status: { _eq: "published" },
      },
    }),
  );

  return rows.map((book: Book) => withTranslation(book, locale));
}

export async function getBookBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<LocalizedBook | null> {
  const rows = await directus.request(
    readItems("books", {
      limit: 1,
      fields: [
        "id",
        "status",
        "slug",
        "title",
        "description",
        "content",
        "cover_image",
        {
          translations: ["id", "title", "description", "languages_code"],
        },
      ],
      filter: {
        slug: { _eq: slug },
        status: { _eq: "published" },
      },
    }),
  );

  const book = rows[0];
  return book ? withTranslation(book, locale) : null;
}
