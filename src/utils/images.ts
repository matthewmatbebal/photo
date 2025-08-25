export function getImageUrl(fileId: string, transform?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_DIRECTUS_URL is not set");
  return transform
    ? `${baseUrl}/assets/${fileId}?${transform}`
    : `${baseUrl}/assets/${fileId}`;
}
