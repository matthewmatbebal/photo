import { Language } from "@/types/language";

export interface BookTranslation {
  id: number;
  languages_code: Language["code"];
  title: string;
  description?: string;
}

export interface Book {
  id: number;
  status: string;
  slug: string;
  title: string;
  description?: string | null;
  content?: string | null;
  cover_image: string | null;
  translations?: BookTranslation[] | null;
}

export interface LocalizedBook {
  id: number;
  status: string;
  slug: string;
  title: string;
  description?: string | null;
  content?: string | null;
  cover_image: string | null;
  isTranslated: boolean;
}
