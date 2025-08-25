import { Work, WorkTranslation } from "@/types/work";
import { MediaItem } from "@/types/mediaItem";
import { About, AboutSource, AboutTranslation } from "@/types/about";
import { Book, BookTranslation } from "@/types/book";
import { DirectusFileMinimal } from "@/types/file";

export interface Schema {
  works: Work[];
  media_items: MediaItem[];
  directus_files: DirectusFileMinimal[];
  works_translations: WorkTranslation[];
  about: About;
  about_sources: AboutSource[];
  about_translations: AboutTranslation[];
  books: Book[];
  books_translations: BookTranslation[];
}
