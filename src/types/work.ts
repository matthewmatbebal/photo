// src/types/work.ts
import { DirectusFileMinimal } from "@/types/file";
import { Language } from "@/types/language";

export interface WorkTranslation {
  id: number;
  languages_code: Language["code"];
  title: string;
  description?: string;
}

export interface Work {
  id: number;
  title: string;
  description?: string | null;
  slug: string;
  shoot_date: string | null;
  cover_image: string | null;
  media_items?: DirectusFileMinimal[] | null;
  translations?: WorkTranslation[] | null;
}

export interface LocalizedWork {
  id: number;
  title: string;
  description?: string | null;
  slug: string;
  shoot_date: string | null;
  cover_image: string | null;
  media_items?: DirectusFileMinimal[] | null;
  isTranslated: boolean;
}
