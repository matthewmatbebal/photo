// src/server/queries/getWorks.ts
import { readItems } from "@directus/sdk";
import { directus } from "@/lib/directus";
import { Work } from "@/types/work";

export async function getWorks(limit = 10, offset = 0): Promise<Work[]> {
  const rows = await directus.request(
    readItems("works", {
      limit,
      offset,
      fields: ["id", "title", "slug", "shoot_date", "cover_image"] as const,
    }),
  );
  return rows;
}
