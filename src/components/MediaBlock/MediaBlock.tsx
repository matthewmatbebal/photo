import { getImageUrl } from "@/utils/images";
import { DirectusFileMinimal } from "@/types/file";
import styles from "@/components/MediaSlider/MediaSlider.module.sass";
import MediaSlider from "@/components/MediaSlider/MediaSlider";

interface Props {
  items: DirectusFileMinimal[];
}

function getFileId(file?: DirectusFileMinimal | null): string | null {
  return file?.id ?? null;
}

function isVideoFile(file?: DirectusFileMinimal | null): boolean {
  const t = file?.type ?? "";
  return typeof t === "string" && t.startsWith("video/");
}

function getAltText(file?: DirectusFileMinimal | null): string {
  return file?.title ?? "";
}

function getPreviewUrl(
  file: DirectusFileMinimal,
  w: number,
  h?: number,
): string | null {
  const id = getFileId(file);
  if (!id) return null;
  const params = h
    ? `width=${w}&height=${h}&fit=cover&quality=80`
    : `width=${w}&quality=90`;
  return getImageUrl(id, params);
}

function getOriginalUrl(file: DirectusFileMinimal): string | null {
  const id = getFileId(file);
  return id ? getImageUrl(id) : null;
}

export default function MediaBlock({ items }: Props) {
  if (!items || items.length === 0) return null;

  const videoItem = items.find((f) => isVideoFile(f));
  if (videoItem) {
    const videoSrc = getOriginalUrl(videoItem) ?? undefined;
    return (
      <div className={styles.mediaSlider}>
        <div className={styles.videoContainer}>
          <video
            src={videoSrc}
            controls
            className={styles.mediaItem}
            preload="metadata"
          />
        </div>
      </div>
    );
  }

  if (items.length === 1) {
    const file = items[0];
    const src = getPreviewUrl(file, 1200) ?? undefined;
    return (
      <div className={styles.mediaSlider}>
        <div className={styles.slide}>
          <img
            src={src}
            alt={getAltText(file)}
            className={styles.mediaItem}
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return <MediaSlider items={items} />;
}
