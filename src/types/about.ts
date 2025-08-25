import { Language } from "@/types/language";
import { MediaItem } from "@/types/mediaItem";

export interface AboutTranslation {
  id: number;
  languages_code: Language["code"];
  title: string;
  content?: string | null;
  description?: string | null;
}

export interface AboutSource {
  id: number;
  label: string;
  link: string; // см. поле link в Directus
  sort?: number | null;
}

export interface About {
  id: number;
  title: string;
  content?: string | null;
  description?: string | null;
  cover_image: string | null;
  sources?: AboutSource[] | null; // O2M
  media_items?: MediaItem[] | null; // M2M -> существующая media_items
  translations?: AboutTranslation[] | null;
}

export interface LocalizedAbout {
  id: number;
  title: string;
  content?: string | null;
  description?: string | null;
  cover_image: string | null;
  sources?: AboutSource[] | null;
  media_items?: MediaItem[] | null;
  isTranslated: boolean;
}
