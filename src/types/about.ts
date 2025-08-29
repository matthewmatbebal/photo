//src/types/about.ts

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
  link: string;
  sort?: number | null;
}

export interface About {
  id: number;
  title: string;
  content?: string | null;
  description?: string | null;
  cover_image: string | null;
  sources?: AboutSource[] | null;
  media_items?: MediaItem[] | null;
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
