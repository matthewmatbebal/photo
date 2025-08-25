import { DirectusFileMinimal } from "@/types/file";

export interface MediaItem {
  id: number;
  caption?: string | null;
  file: string | DirectusFileMinimal | null;
}
