// src/types/about.ts
import { Language } from "@/types/language";
import { DirectusFileMinimal } from "@/types/file";

export interface AboutTranslation {
  id: number;
  languages_code: Language["code"];
  title: string;
  content?: string | null;
  description?: string | null;
}

export interface AboutLinks {
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
  links?: AboutLinks[] | null;
  media_items?: DirectusFileMinimal[] | null;
  translations?: AboutTranslation[] | null;
}

export interface LocalizedAbout {
  id: number;
  title: string;
  content?: string | null;
  description?: string | null;
  cover_image: string | null;
  links?: AboutLinks[] | null;
  media_items?: DirectusFileMinimal[] | null;
  isTranslated: boolean;
}
