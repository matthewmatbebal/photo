//src/types/directusTypes.ts

import { Work, WorkTranslation } from "@/types/work";
import { About, AboutLinks, AboutTranslation } from "@/types/about";
import { Book, BookTranslation } from "@/types/book";
import { DirectusFileMinimal } from "@/types/file";

export interface Schema {
  works: Work[];
  works_translations: WorkTranslation[];
  directus_files: DirectusFileMinimal[];
  about: About;
  about_links: AboutLinks[];
  about_translations: AboutTranslation[];
  books: Book[];
  books_translations: BookTranslation[];
}
