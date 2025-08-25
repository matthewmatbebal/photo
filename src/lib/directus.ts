import { createDirectus, rest, readItems, readSingleton } from "@directus/sdk";
import type { Schema } from "@/types/directusTypes";

const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ||
  process.env.DIRECTUS_URL ||
  "http://localhost:8055";

export const directus = createDirectus<Schema>(directusUrl).with(rest());

export { readItems, readSingleton };
