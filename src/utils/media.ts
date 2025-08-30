// src/utils/directus/media.ts
import { DirectusFileMinimal } from "@/types/file";

export interface WorksFilesJunctionRow {
  directus_files_id?: DirectusFileMinimal | null;
  sort?: number | null;
}

export interface HasWorksMediaItemsJunction {
  media_items?: WorksFilesJunctionRow[] | null;
}

export function normalizeWorksMediaItemsStrict(
  raw: HasWorksMediaItemsJunction,
): DirectusFileMinimal[] {
  const junction = raw.media_items ?? [];
  const files = junction
    .map((j) => j.directus_files_id)
    .filter((f): f is DirectusFileMinimal => Boolean(f));
  return files;
}
